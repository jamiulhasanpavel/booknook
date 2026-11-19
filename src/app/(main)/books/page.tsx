"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Book } from "@/lib/types/book";

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/books")
      .then(async (response) => {
        if (!response.ok) throw new Error();
        const data = await response.json();
        setBooks(data.books ?? []);
      })
      .catch(() => setBooks([]))
      .finally(() => setLoading(false));
  }, []);

  async function borrowBook(book: Book) {
    const response = await fetch("/api/borrows", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookId: book._id }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      toast.error(data?.message ?? "Unable to borrow book");
      return;
    }

    setBooks((current) =>
      current.map((item) =>
        item._id === book._id
          ? { ...item, availableCopies: Math.max(0, item.availableCopies - 1) }
          : item
      )
    );
    toast.success("Book borrowed successfully");
  }

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[4px] text-[#B28A4B]">
            Discover
          </p>
          <h1 className="mt-3 font-serif text-4xl font-bold text-[#172B3A] md:text-5xl">
            Explore Our Book Collection
          </h1>
        </div>

        <Link
          href="/"
          className="inline-flex items-center rounded-full border border-[#172B3A] px-5 py-2.5 text-sm font-semibold text-[#172B3A] transition hover:bg-[#172B3A] hover:text-white"
        >
          Back Home
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Loading books...</p>
      ) : (
      <div className="grid gap-6 md:grid-cols-3">
        {books.map((book) => (
          <article
            key={book.title}
            className="rounded-2xl border border-[#E9E3D8] bg-[#FAF8F3] p-6 shadow-sm"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#172B3A] text-lg font-bold text-[#D9B779]">
              {book.title.slice(0, 1)}
            </div>

            <p className="text-xs font-semibold uppercase tracking-[3px] text-[#B28A4B]">
              {book.category}
            </p>
            <h2 className="mt-3 font-serif text-2xl font-bold text-[#172B3A]">
              {book.title}
            </h2>
            <p className="mt-2 text-sm text-gray-600">by {book.author}</p>
            <button
              type="button"
              onClick={() => void borrowBook(book)}
              disabled={book.availableCopies < 1}
              className="mt-5 w-full rounded-full bg-[#172B3A] px-4 py-3 text-sm font-semibold text-white hover:bg-[#B28A4B] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {book.availableCopies < 1 ? "Unavailable" : "Borrow"}
            </button>
            {book.readingUrl && (
              <a
                href={book.readingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block w-full rounded-full border border-[#172B3A] px-4 py-3 text-center text-sm font-semibold text-[#172B3A] hover:bg-[#F0EDE6]"
              >
                Read online{book.readingSource ? ` · ${book.readingSource}` : ""}
              </a>
            )}
          </article>
        ))}
      </div>
      )}
    </section>
  );
}
