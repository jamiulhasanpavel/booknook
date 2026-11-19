"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, BookOpen } from "lucide-react";
import type { Book } from "@/lib/types/book";

export default function BookReader({ id }: { id: string }) {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    fetch(`/api/books/${id}`)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message ?? "Unable to load this book");
        }
        if (active) setBook(data.book);
      })
      .catch((requestError: unknown) => {
        if (active) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : "Unable to load this book"
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return <p className="py-16 text-center text-gray-500">Opening your book...</p>;
  }

  if (error || !book) {
    return (
      <div className="py-16 text-center">
        <p className="text-gray-600">{error || "Book not found"}</p>
        <Link href="/my-borrows" className="mt-4 inline-block font-semibold text-[#B28A4B]">
          Back to My Borrows
        </Link>
      </div>
    );
  }

  const paragraphs = book.readingContent
    ?.split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <article className="mx-auto max-w-3xl py-4">
      <Link
        href="/my-borrows"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#B28A4B] hover:text-[#172B3A]"
      >
        <ArrowLeft size={17} />
        Back to My Borrows
      </Link>

      <div className="mt-6 rounded-3xl border border-[#E9E3D8] bg-[#FAF8F3] p-7 shadow-sm sm:p-10">
        <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-xl bg-[#172B3A] text-[#D9B779]">
          <BookOpen size={24} />
        </div>
        <p className="text-xs font-bold uppercase tracking-[3px] text-[#B28A4B]">
          {book.category}
        </p>
        <h1 className="mt-3 font-serif text-4xl font-bold text-[#172B3A] sm:text-5xl">
          {book.title}
        </h1>
        <p className="mt-3 text-gray-600">by {book.author}</p>
        <p className="mt-6 border-b border-[#E9E3D8] pb-6 leading-7 text-gray-600">
          {book.description}
        </p>

        {book.readingUrl && (
          <div className="mt-7 rounded-2xl border border-[#E9E3D8] bg-white p-5">
            <p className="text-sm text-gray-600">
              সম্পূর্ণ বইটি অনলাইনে পড়ুন
              {book.readingSource ? ` — ${book.readingSource}` : ""}
            </p>
            <a
              href={book.readingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex rounded-full bg-[#172B3A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#B28A4B]"
            >
              Read full book online
            </a>
          </div>
        )}

        {paragraphs?.length ? (
          <div className="mt-8 space-y-6 font-serif text-lg leading-9 text-[#263746]">
            {paragraphs.map((paragraph, index) => (
              <p key={`${index}-${paragraph.slice(0, 20)}`}>{paragraph}</p>
            ))}
          </div>
        ) : (
          <p className="mt-8 rounded-2xl bg-white p-5 leading-7 text-gray-600">
            The book description is shown above. The full reading text has not
            been added yet.
          </p>
        )}
      </div>
    </article>
  );
}
