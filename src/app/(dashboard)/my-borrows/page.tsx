"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Borrow = {
  _id: string;
  bookId: string;
  title: string;
  author: string;
  borrowedAt: string;
  readingUrl?: string;
  readingSource?: string;
};

export default function MyBorrowsPage() {
  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/borrows")
      .then(async (response) => {
        if (!response.ok) throw new Error();
        const data = await response.json();
        setBorrows(data.borrows ?? []);
      })
      .catch(() => setBorrows([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <div className="rounded-3xl border border-[#E9E3D8] bg-[#FAF8F3] p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[4px] text-[#B28A4B]">Reading list</p>
        <h1 className="mt-3 font-serif text-4xl font-bold text-[#172B3A]">My Borrows</h1>

        {loading ? (
          <p className="mt-8 text-sm text-gray-500">Loading borrows...</p>
        ) : borrows.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-[#D8CCB9] bg-white p-8 text-center">
            <p className="font-medium text-[#172B3A]">No borrowed books yet</p>
            <Link href="/books" className="mt-3 inline-block text-sm font-semibold text-[#B28A4B]">Explore books</Link>
          </div>
        ) : (
        <div className="mt-8 space-y-4">
          {borrows.map((borrow) => (
            <div key={borrow._id} className="flex items-center justify-between rounded-2xl border border-[#E9E3D8] bg-white p-4">
              <div>
                <p className="font-medium text-[#172B3A]">{borrow.title}</p>
                <p className="mt-1 text-sm text-gray-500">by {borrow.author}</p>
              </div>
              <Link
                href={borrow.readingUrl ?? `/books/${borrow.bookId}`}
                className="text-sm font-semibold text-[#B28A4B]"
              >
                {borrow.readingUrl ? `Read online${borrow.readingSource ? ` · ${borrow.readingSource}` : ""}` : "Read now"}
              </Link>
            </div>
          ))}
        </div>
        )}
      </div>
    </main>
  );
}
