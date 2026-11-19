import { headers } from "next/headers";
import { MongoClient, ObjectId } from "mongodb";
import { auth } from "@/lib/auth";

const client = new MongoClient(process.env.MONGODB_URI as string);

async function getSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!ObjectId.isValid(id)) {
    return Response.json({ message: "Invalid book" }, { status: 400 });
  }

  await client.connect();
  const book = await client
    .db("booknook")
    .collection("books")
    .findOne({ _id: new ObjectId(id) });

  if (!book) {
    return Response.json({ message: "Book not found" }, { status: 404 });
  }

  return Response.json({
    book: {
      ...book,
      _id: (book._id as ObjectId).toString(),
      createdAt: book.createdAt instanceof Date ? book.createdAt.toISOString() : book.createdAt,
    },
  });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return Response.json({ message: "Please login first" }, { status: 401 });
  }

  const { id } = await params;
  if (!ObjectId.isValid(id)) {
    return Response.json({ message: "Invalid book" }, { status: 400 });
  }

  const body = await request.json();
  await client.connect();
  const collection = client.db("booknook").collection("books");
  const book = await collection.findOne({ _id: new ObjectId(id) });

  if (!book) {
    return Response.json({ message: "Book not found" }, { status: 404 });
  }
  if (book.addedBy.email !== session.user.email) {
    return Response.json({ message: "You cannot edit this book" }, { status: 403 });
  }

  const allowed = ["title", "author", "category", "image", "description", "readingContent", "totalCopies"];
  const updates: Record<string, unknown> = {};
  for (const key of allowed) {
    if (body[key] !== undefined) updates[key] = body[key];
  }

  if (typeof updates.title === "string") updates.title = updates.title.trim();
  if (typeof updates.author === "string") updates.author = updates.author.trim();
  if (typeof updates.description === "string") updates.description = updates.description.trim();
  if (typeof updates.readingContent === "string") updates.readingContent = updates.readingContent.trim();
  if (typeof updates.image === "string") updates.image = updates.image.trim();
  if (updates.totalCopies !== undefined) {
    const totalCopies = Number(updates.totalCopies);
    if (!Number.isInteger(totalCopies) || totalCopies < 1) {
      return Response.json({ message: "Total copies must be at least 1" }, { status: 400 });
    }
    updates.totalCopies = totalCopies;
    updates.availableCopies = totalCopies;
  }

  await collection.updateOne({ _id: new ObjectId(id) }, { $set: updates });
  return Response.json({ message: "Book updated successfully" });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return Response.json({ message: "Please login first" }, { status: 401 });
  }

  const { id } = await params;
  if (!ObjectId.isValid(id)) {
    return Response.json({ message: "Invalid book" }, { status: 400 });
  }

  await client.connect();
  const collection = client.db("booknook").collection("books");
  const book = await collection.findOne({ _id: new ObjectId(id) });

  if (!book) {
    return Response.json({ message: "Book not found" }, { status: 404 });
  }
  if (book.addedBy.email !== session.user.email) {
    return Response.json({ message: "You cannot delete this book" }, { status: 403 });
  }

  await collection.deleteOne({ _id: new ObjectId(id) });
  await client.db("booknook").collection("borrows").deleteMany({ bookId: id });
  return Response.json({ message: "Book deleted successfully" });
}
