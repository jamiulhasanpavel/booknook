import Link from "next/link";

const books = [
  {
    title: "The Silent Horizon",
    author: "Amina Rahman",
    category: "Fiction",
  },
  {
    title: "Worlds in Ink",
    author: "Nathan Cole",
    category: "History",
  },
  {
    title: "Curious Minds",
    author: "Sara Ali",
    category: "Science",
  },
];

export default function BooksPage() {
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
          </article>
        ))}
      </div>
    </section>
  );
}
