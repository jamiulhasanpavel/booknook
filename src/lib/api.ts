
import type { Book } from "./types/book";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function getLatestBooks(): Promise<Book[]> {
  let response: Response;

  try {
    response = await fetch(
      `${API_URL}/books?sort=latest&limit=6`,
      { cache: "no-store" }
    );
  } catch {
    response = await fetch("/api/books?limit=6", { cache: "no-store" });
  }

  if (!response.ok) {
    response = await fetch("/api/books?limit=6", { cache: "no-store" });
  }

  if (!response.ok) {
    throw new Error("Unable to load books");
  }

  const data = await response.json();
  return Array.isArray(data) ? data : data.books ?? [];
}

export type CreateBookInput = {
  title: string;
  author: string;
  category: Book["category"];
  image: string;
  description: string;
  readingContent: string;
  totalCopies: number;
};

export async function createBook(input: CreateBookInput): Promise<Book> {
  const response = await fetch("/api/books", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.message ?? "Unable to add book");
  }

  const data = await response.json();
  return data.book as Book;
}
