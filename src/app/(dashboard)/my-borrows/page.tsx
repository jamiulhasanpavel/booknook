import Link from "next/link";

const borrows = [
  { title: "The Last Orchard", due: "Due in 5 days" },
  { title: "Letters to Tomorrow", due: "Due in 12 days" },
];

export default function MyBorrowsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <div className="rounded-3xl border border-[#E9E3D8] bg-[#FAF8F3] p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[4px] text-[#B28A4B]">Reading list</p>
        <h1 className="mt-3 font-serif text-4xl font-bold text-[#172B3A]">My Borrows</h1>

        <div className="mt-8 space-y-4">
          {borrows.map((borrow) => (
            <div key={borrow.title} className="flex items-center justify-between rounded-2xl border border-[#E9E3D8] bg-white p-4">
              <div>
                <p className="font-medium text-[#172B3A]">{borrow.title}</p>
                <p className="mt-1 text-sm text-gray-500">{borrow.due}</p>
              </div>
              <Link href="/books" className="text-sm font-semibold text-[#B28A4B]">
                Read now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
