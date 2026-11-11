import Link from "next/link";

export default function AddBookPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <div className="rounded-3xl border border-[#E9E3D8] bg-[#FAF8F3] p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[4px] text-[#B28A4B]">Dashboard</p>
        <h1 className="mt-3 font-serif text-4xl font-bold text-[#172B3A]">Add a New Book</h1>
        <p className="mt-3 text-gray-600">Share a title with the community and build your library shelf.</p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-[#E9E3D8] bg-white p-4">
            <p className="text-sm text-gray-500">Title</p>
            <p className="mt-2 font-medium text-[#172B3A]">The Hidden Library</p>
          </div>
          <div className="rounded-2xl border border-[#E9E3D8] bg-white p-4">
            <p className="text-sm text-gray-500">Author</p>
            <p className="mt-2 font-medium text-[#172B3A]">Leah Ross</p>
          </div>
        </div>

        <div className="mt-8 flex justify-between gap-3">
          <Link href="/" className="text-sm font-semibold text-[#B28A4B]">
            Back to home
          </Link>
          <button className="rounded-full bg-[#172B3A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#B28A4B]">
            Save Book
          </button>
        </div>
      </div>
    </main>
  );
}
