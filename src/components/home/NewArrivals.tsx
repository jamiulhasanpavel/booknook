
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

import BookCard from "./BookCard";
import { getLatestBooks } from "@/lib/api";
import type { Book } from "@/lib/types/book";

export default function NewArrivals() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadBooks() {
      try {
        const data = await getLatestBooks();

        if (active) {
          setBooks(data.slice(0, 6));
          setError(false);
        }
      } catch {
        if (active) {
          setError(true);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadBooks();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="bg-[#FAF8F3] px-6 py-24">
      <div className="mx-auto max-w-[1280px]">

        {/* Heading */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[4px] text-[#B28A4B]">
              Fresh From Our Library
            </p>

            <h2 className="font-serif text-4xl font-bold text-[#172B3A] md:text-5xl">
              New Arrivals
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-gray-500">
              Discover the latest additions to our collection
              and find something wonderful to read.
            </p>
          </div>

          <Link
            href="/books"
            className="inline-flex items-center gap-2 font-semibold text-[#172B3A] transition hover:text-[#B28A4B]"
          >
            See All Books
            <ArrowRight size={19} />
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="space-y-4 rounded-2xl bg-white p-4">
                <Skeleton className="h-[280px] w-full rounded-xl" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-[#E9E3D8] bg-white px-6 py-16 text-center">
            <BookOpen className="mx-auto mb-4 text-[#B28A4B]" size={42} />
            <h3 className="font-serif text-2xl font-bold text-[#172B3A]">
              Books are temporarily unavailable
            </h3>
            <p className="mt-3 text-sm text-gray-500">
              Please try again when the library server is available.
            </p>
          </div>
        )}

        {/* Book Grid */}
        {!loading && !error && books.length > 0 && (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && books.length === 0 && (
          <div className="rounded-2xl border border-dashed border-[#D8CCB9] bg-white px-6 py-16 text-center">
            <BookOpen size={45} className="mx-auto text-[#B28A4B]" />

            <h3 className="mt-5 font-serif text-2xl font-bold text-[#172B3A]">
              No Books Added Yet
            </h3>

            <p className="mt-3 text-sm text-gray-500">
              Our newest collection will appear here soon.
            </p>
          </div>
        )}

        {/* Bottom Button */}
        <div className="mt-12 text-center">
          <Link
            href="/books"
            className="inline-flex items-center gap-3 rounded-full border border-[#172B3A] px-8 py-4 text-sm font-bold text-[#172B3A] transition hover:bg-[#172B3A] hover:text-white"
          >
            Explore All Books
            <ArrowRight size={18} />
          </Link>
        </div>

      </div>
    </section>
  );
}
