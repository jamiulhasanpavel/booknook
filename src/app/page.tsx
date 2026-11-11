
import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <section className="flex min-h-[65vh] items-center justify-center px-6 py-20">
      <div className="max-w-2xl text-center">

        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#172B3A] text-[#D9B779]">
          <BookOpen size={34} />
        </div>

        <p className="mb-4 text-sm font-semibold uppercase tracking-[4px] text-[#B28A4B]">
          Welcome to BookNook
        </p>

        <h1 className="font-serif text-4xl font-bold leading-tight text-[#172B3A] md:text-6xl">
          Every Book Opens a New World.
        </h1>

        <p className="mx-auto mt-6 max-w-lg text-base leading-8 text-gray-600">
          Explore fascinating stories, discover new knowledge,
          and find your next favorite book in our little library.
        </p>

        <Link
          href="/books"
          className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#172B3A] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#B28A4B]"
        >
          Explore Books
          <ArrowRight size={18} />
        </Link>

      </div>
    </section>
  );
}
