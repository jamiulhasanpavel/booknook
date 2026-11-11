
import type { Book } from "./types/book";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function getLatestBooks(): Promise<Book[]> {
  const response = await fetch(
    `${API_URL}/books?sort=latest&limit=6`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Unable to load books");
  }

  const data = await response.json();

  return Array.isArray(data) ? data : data.books ?? [];
}
