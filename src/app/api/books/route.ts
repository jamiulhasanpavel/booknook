import { headers } from "next/headers";
import { MongoClient, ObjectId } from "mongodb";
import { auth } from "@/lib/auth";

const client = new MongoClient(process.env.MONGODB_URI as string);

async function getSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mine = searchParams.get("mine") === "1";
  const limit = Math.min(Number(searchParams.get("limit") ?? 50) || 50, 100);

  await client.connect();
  const collection = client.db("booknook").collection("books");
  let books;

  if (mine) {
    const session = await getSession();

    if (!session) {
      return Response.json({ message: "Please login first" }, { status: 401 });
    }

    books = await collection
      .find({ "addedBy.email": session.user.email })
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();
  } else {
    books = await collection
      .find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();
  }

  return Response.json({
    books: books.map((book) => ({
      ...book,
      _id: (book._id as ObjectId).toString(),
      createdAt: book.createdAt instanceof Date ? book.createdAt.toISOString() : book.createdAt,
    })),
  });
}

export async function POST(request: Request) {
  const session = await getSession();

  if (!session) {
    return Response.json({ message: "Please login first" }, { status: 401 });
  }

  const body = await request.json();
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const author = typeof body.author === "string" ? body.author.trim() : "";
  const description =
    typeof body.description === "string" ? body.description.trim() : "";
  const readingContent =
    typeof body.readingContent === "string" ? body.readingContent.trim() : "";
  const image = typeof body.image === "string" ? body.image.trim() : "";
  const category = body.category as string;
  const totalCopies = Number(body.totalCopies);

  const categories = ["Fiction", "Science", "History", "Kids", "Others"];

  if (!title || !author || !description || !categories.includes(category)) {
    return Response.json(
      { message: "Please complete all required fields" },
      { status: 400 }
    );
  }

  if (!Number.isInteger(totalCopies) || totalCopies < 1) {
    return Response.json(
      { message: "Total copies must be at least 1" },
      { status: 400 }
    );
  }

  await client.connect();
  const result = await client.db("booknook").collection("books").insertOne({
    title,
    author,
    category,
    image,
    description,
    readingContent,
    totalCopies,
    availableCopies: totalCopies,
    addedBy: {
      name: session.user.name,
      email: session.user.email,
    },
    createdAt: new Date(),
  });

  const book = await client
    .db("booknook")
    .collection("books")
    .findOne({ _id: result.insertedId });

  if (!book) {
    return Response.json({ message: "Book could not be saved" }, { status: 500 });
  }

  return Response.json(
    {
      book: {
        ...book,
        _id: (book._id as ObjectId).toString(),
      },
    },
    { status: 201 }
  );
}
