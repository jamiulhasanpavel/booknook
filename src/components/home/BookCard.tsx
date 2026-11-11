
import Link from "next/link";
import { ArrowUpRight, BookOpen, UserRound } from "lucide-react";
import type { Book } from "@/lib/types/book";

export default function BookCard({ book }: { book: Book }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E9E3D8] bg-white transition duration-300 hover:-translate-y-2 hover:shadow-xl">

      {/* Book Image */}
      <div className="relative h-[280px] overflow-hidden bg-[#F0EDE6]">
        {book.image ? (
          <img
            src={book.image}
            alt={book.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[#B28A4B]">
            <BookOpen size={60} />
          </div>
        )}

        <span className="absolute left-4 top-4 rounded-full bg-[#172B3A] px-4 py-2 text-xs font-semibold text-white">
          {book.category}
        </span>
      </div>

      {/* Book Information */}
      <div className="flex flex-1 flex-col p-5">

        <h3 className="line-clamp-2 font-serif text-xl font-bold text-[#172B3A] transition group-hover:text-[#B28A4B]">
          {book.title}
        </h3>

        <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
          <UserRound size={16} />
          <span>{book.author}</span>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-[#EEE9E0] pt-4">
          <span className="text-xs text-gray-500">
            Available: {book.availableCopies ?? book.totalCopies}
          </span>

          <Link
            href={`/books/${book._id}`}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#172B3A] transition hover:text-[#B28A4B]"
          >
            View Details
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </article>
  );
}
