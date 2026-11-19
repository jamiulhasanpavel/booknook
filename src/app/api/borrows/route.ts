import { headers } from "next/headers";
import { MongoClient, ObjectId } from "mongodb";
import { auth } from "@/lib/auth";

const client = new MongoClient(process.env.MONGODB_URI as string);

async function getSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

export async function GET() {
  const session = await getSession();
  if (!session) {
    return Response.json({ message: "Please login first" }, { status: 401 });
  }

  await client.connect();
  const db = client.db("booknook");
  const borrows = await db
    .collection("borrows")
    .find({ "borrowedBy.email": session.user.email })
    .sort({ borrowedAt: -1 })
    .toArray();

  const bookIds = borrows
    .map((borrow) => borrow.bookId)
    .filter((bookId): bookId is string => typeof bookId === "string" && ObjectId.isValid(bookId))
    .map((bookId) => new ObjectId(bookId));
  const books = await db
    .collection("books")
    .find({ _id: { $in: bookIds } })
    .project({ readingUrl: 1, readingSource: 1 })
    .toArray();
  const booksById = new Map(
    books.map((book) => [(book._id as ObjectId).toString(), book])
  );

  return Response.json({
    borrows: borrows.map((borrow) => ({
      ...borrow,
      _id: (borrow._id as ObjectId).toString(),
      readingUrl: booksById.get(borrow.bookId)?.readingUrl,
      readingSource: booksById.get(borrow.bookId)?.readingSource,
    })),
  });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return Response.json({ message: "Please login first" }, { status: 401 });
  }

  const body = await request.json();
  const bookId = String(body.bookId ?? "");
  if (!ObjectId.isValid(bookId)) {
    return Response.json({ message: "Invalid book" }, { status: 400 });
  }

  await client.connect();
  const db = client.db("booknook");
  const book = await db.collection("books").findOne({ _id: new ObjectId(bookId) });
  if (!book) {
    return Response.json({ message: "Book not found" }, { status: 404 });
  }
  if ((book.availableCopies ?? 0) < 1) {
    return Response.json({ message: "No copies available" }, { status: 400 });
  }

  const existing = await db.collection("borrows").findOne({
    bookId,
    "borrowedBy.email": session.user.email,
    returnedAt: { $exists: false },
  });
  if (existing) {
    return Response.json({ message: "You already borrowed this book" }, { status: 409 });
  }

  await db.collection("borrows").insertOne({
    bookId,
    title: book.title,
    author: book.author,
    borrowedBy: { name: session.user.name, email: session.user.email },
    borrowedAt: new Date(),
  });
  await db.collection("books").updateOne(
    { _id: new ObjectId(bookId) },
    { $inc: { availableCopies: -1 } }
  );

  return Response.json({ message: "Book borrowed successfully" }, { status: 201 });
}
