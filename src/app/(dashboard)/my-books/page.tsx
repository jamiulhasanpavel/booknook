"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Book } from "@/lib/types/book";

export default function MyBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/books?mine=1")
      .then(async (response) => {
        if (!response.ok) throw new Error("Unable to load books");
        const data = await response.json();
        setBooks(data.books ?? []);
      })
      .catch(() => setBooks([]))
      .finally(() => setLoading(false));
  }, []);

  async function editBook(book: Book) {
    const title = window.prompt("Book title", book.title);
    if (title === null) return;

    const author = window.prompt("Author", book.author);
    if (author === null) return;

    const response = await fetch(`/api/books/${book._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title.trim(),
        author: author.trim(),
        category: book.category,
        description: book.description,
        image: book.image,
        totalCopies: book.totalCopies,
      }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      toast.error(data?.message ?? "Unable to edit book");
      return;
    }

    setBooks((current) =>
      current.map((item) =>
        item._id === book._id
          ? { ...item, title: title.trim(), author: author.trim() }
          : item
      )
    );
    toast.success("Book updated successfully");
  }

  async function deleteBook(book: Book) {
    if (!window.confirm(`Delete "${book.title}"?`)) return;

    const response = await fetch(`/api/books/${book._id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const data = await response.json().catch(() => null);
      toast.error(data?.message ?? "Unable to delete book");
      return;
    }

    setBooks((current) => current.filter((item) => item._id !== book._id));
    toast.success("Book deleted successfully");
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <div className="rounded-3xl border border-[#E9E3D8] bg-[#FAF8F3] p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[4px] text-[#B28A4B]">Your collection</p>
        <h1 className="mt-3 font-serif text-4xl font-bold text-[#172B3A]">My Books</h1>

        {loading ? (
          <p className="mt-8 text-sm text-gray-500">Loading your books...</p>
        ) : books.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-[#D8CCB9] bg-white p-8 text-center">
            <p className="font-medium text-[#172B3A]">No books added yet</p>
            <Link href="/add-book" className="mt-3 inline-block text-sm font-semibold text-[#B28A4B]">
              Add your first book
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {books.map((book) => (
            <div key={book._id} className="flex flex-col gap-3 rounded-2xl border border-[#E9E3D8] bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="font-medium text-[#172B3A]">{book.title}</span>
              <div className="flex gap-2">
                <button type="button" onClick={() => void editBook(book)} className="rounded-full border border-[#D8CCB9] px-4 py-2 text-sm font-semibold text-[#172B3A] hover:bg-[#FAF8F3]">
                  Edit
                </button>
                <button type="button" onClick={() => void deleteBook(book)} className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50">
                  Delete
                </button>
              </div>
            </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
