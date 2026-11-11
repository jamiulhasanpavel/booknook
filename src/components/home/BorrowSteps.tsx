
import Link from "next/link";
import {
  Search,
  BookMarked,
  RotateCcw,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discover a Book",
    description:
      "Explore our library collection and find the perfect book for your next reading adventure.",
    icon: Search,
  },
  {
    number: "02",
    title: "Borrow Your Book",
    description:
      "Choose your favorite book and confirm your borrowing request with just a few clicks.",
    icon: BookMarked,
  },
  {
    number: "03",
    title: "Return & Repeat",
    description:
      "Enjoy your reading journey, return the book on time and discover another great story.",
    icon: RotateCcw,
  },
];

export default function BorrowSteps() {
  return (
    <section className="bg-[#F0EDE6] px-6 py-24">
      <div className="mx-auto max-w-[1280px]">

        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[4px] text-[#B28A4B]">
            Simple & Convenient
          </p>

          <h2 className="font-serif text-4xl font-bold text-[#172B3A] md:text-5xl">
            How Borrowing Works
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-500">
            Getting your next favorite book is easier than ever.
            Follow three simple steps.
          </p>
        </div>

        <div className="grid gap-7 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="relative rounded-2xl border border-[#E2DACA] bg-[#FAF8F3] p-8 transition duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-4xl font-bold text-[#D9B779]">
                    {step.number}
                  </span>

                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#172B3A] text-[#D9B779]">
                    <Icon size={27} />
                  </div>
                </div>

                <h3 className="mt-8 font-serif text-2xl font-bold text-[#172B3A]">
                  {step.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-gray-500">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/books"
            className="inline-flex items-center gap-3 rounded-full bg-[#172B3A] px-8 py-4 text-sm font-bold text-white transition hover:bg-[#B28A4B]"
          >
            Start Exploring
            <ArrowRight size={18} />
          </Link>
        </div>

      </div>
    </section>
  );
}
