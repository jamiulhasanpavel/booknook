import Link from "next/link";

const books = ["The City of Lanterns", "Quiet Chapters", "Moonlit Stories"];

export default function MyBooksPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <div className="rounded-3xl border border-[#E9E3D8] bg-[#FAF8F3] p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[4px] text-[#B28A4B]">Your collection</p>
        <h1 className="mt-3 font-serif text-4xl font-bold text-[#172B3A]">My Books</h1>

        <div className="mt-8 space-y-4">
          {books.map((book) => (
            <div key={book} className="flex items-center justify-between rounded-2xl border border-[#E9E3D8] bg-white p-4">
              <span className="font-medium text-[#172B3A]">{book}</span>
              <Link href="/books" className="text-sm font-semibold text-[#B28A4B]">
                View details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
