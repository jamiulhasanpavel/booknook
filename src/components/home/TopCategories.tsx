
import Link from "next/link";
import {
  BookOpen,
  FlaskConical,
  Landmark,
  Baby,
  Library,
  ArrowUpRight,
} from "lucide-react";

const categories = [
  {
    name: "Fiction",
    description: "Stories that inspire imagination.",
    icon: BookOpen,
    number: "01",
  },
  {
    name: "Science",
    description: "Discover the wonders of science.",
    icon: FlaskConical,
    number: "02",
  },
  {
    name: "History",
    description: "Explore the stories of our past.",
    icon: Landmark,
    number: "03",
  },
  {
    name: "Kids",
    description: "Wonderful adventures for young readers.",
    icon: Baby,
    number: "04",
  },
  {
    name: "Others",
    description: "Explore something completely new.",
    icon: Library,
    number: "05",
  },
];

export default function TopCategories() {
  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto max-w-[1280px]">

        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[4px] text-[#B28A4B]">
            Explore Our Collection
          </p>

          <h2 className="font-serif text-4xl font-bold text-[#172B3A] md:text-5xl">
            Browse By Category
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-500">
            From fascinating fiction to inspiring science,
            find books that match your curiosity.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                href={`/books?category=${category.name}`}
                key={category.name}
                className="group rounded-2xl border border-[#E9E3D8] bg-[#FAF8F3] p-7 transition duration-300 hover:-translate-y-2 hover:border-[#D9B779] hover:bg-[#172B3A]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold tracking-widest text-[#B28A4B]">
                    {category.number}
                  </span>

                  <ArrowUpRight
                    size={20}
                    className="text-[#B28A4B] transition group-hover:rotate-45"
                  />
                </div>

                <div className="my-8 flex h-14 w-14 items-center justify-center rounded-xl bg-[#172B3A] text-[#D9B779] transition group-hover:bg-[#D9B779] group-hover:text-[#172B3A]">
                  <Icon size={28} />
                </div>

                <h3 className="font-serif text-xl font-bold text-[#172B3A] transition group-hover:text-white">
                  {category.name}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-500 transition group-hover:text-gray-300">
                  {category.description}
                </p>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
