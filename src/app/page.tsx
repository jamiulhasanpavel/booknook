
import Link from "next/link";
import { ArrowRight, BookOpen, Library, Sparkles, TimerReset } from "lucide-react";

import NewArrivals from "@/components/home/NewArrivals";

const features = [
  {
    icon: BookOpen,
    title: "Curated Collection",
    description: "Handpicked titles across fiction, science, and history.",
  },
  {
    icon: Library,
    title: "Small Library, Big Ideas",
    description: "Find books that spark curiosity and imagination.",
  },
  {
    icon: Sparkles,
    title: "Easy Discoveries",
    description: "Browse favorite reads and discover new favorites fast.",
  },
  {
    icon: TimerReset,
    title: "Read Your Way",
    description: "Borrow what fits your pace and keep the reading journey going.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="bg-[#FAF8F3] px-6 py-20">
        <div className="mx-auto grid max-w-[1280px] items-center gap-12 md:grid-cols-2">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[4px] text-[#B28A4B]">
              Welcome to BookNook
            </p>
            <h1 className="font-serif text-5xl font-bold leading-tight text-[#172B3A] md:text-6xl">
              Every Book Opens a New World.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-gray-600">
              Explore fascinating stories, discover new knowledge, and find your next favorite book in our little library.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/books"
                className="inline-flex items-center gap-3 rounded-full bg-[#172B3A] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#B28A4B]"
              >
                Explore Books
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/login"
                className="inline-flex items-center gap-3 rounded-full border border-[#172B3A] px-8 py-4 text-sm font-semibold text-[#172B3A] transition hover:bg-[#172B3A] hover:text-white"
              >
                Login
              </Link>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-3xl bg-[#172B3A] p-6 text-white shadow-xl">
              <BookOpen className="mb-4 text-[#D9B779]" size={28} />
              <p className="text-4xl font-bold">1200+</p>
              <p className="mt-2 text-sm text-gray-300">books available</p>
            </div>
            <div className="rounded-3xl border border-[#E9E3D8] bg-white p-6 shadow-sm">
              <Library className="mb-4 text-[#B28A4B]" size={28} />
              <p className="text-4xl font-bold text-[#172B3A]">48</p>
              <p className="mt-2 text-sm text-gray-600">reading categories</p>
            </div>
            <div className="rounded-3xl border border-[#E9E3D8] bg-white p-6 shadow-sm sm:col-span-2">
              <p className="text-sm font-semibold uppercase tracking-[4px] text-[#B28A4B]">
                Most loved by readers
              </p>
              <h2 className="mt-4 font-serif text-3xl font-bold text-[#172B3A]">
                Discover stories that stay with you.
              </h2>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-10 text-center">
            <p className="text-xs font-bold uppercase tracking-[4px] text-[#B28A4B]">
              Why readers love BookNook
            </p>
            <h2 className="mt-4 font-serif text-4xl font-bold text-[#172B3A] md:text-5xl">
              A cozy place to explore great books
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-2xl border border-[#E9E3D8] bg-[#FAF8F3] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#172B3A] text-[#D9B779]">
                  <Icon size={22} />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#172B3A]">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-gray-600">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#172B3A] px-6 py-20 text-white">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[4px] text-[#D9B779]">
              Ready to read?
            </p>
            <h2 className="mt-4 font-serif text-4xl font-bold md:text-5xl">
              Start your next chapter today
            </h2>
          </div>

          <Link
            href="/books"
            className="inline-flex items-center gap-3 rounded-full bg-[#D9B779] px-8 py-4 text-sm font-bold text-[#172B3A] transition hover:bg-white"
          >
            Explore the library
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <NewArrivals />
    </>
  );
}
