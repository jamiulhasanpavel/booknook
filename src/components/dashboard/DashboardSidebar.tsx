"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  PlusCircle,
  Bookmark,
  LayoutList,
} from "lucide-react";

type DashboardSidebarProps = {
  name: string;
};

const links = [
  { name: "Add Book", href: "/add-book", icon: PlusCircle },
  { name: "My Books", href: "/my-books", icon: BookOpen },
  { name: "My Borrows", href: "/my-borrows", icon: Bookmark },
];

export default function DashboardSidebar({ name }: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-full lg:w-64 lg:shrink-0">
      <div className="border-b border-[#E9E3D8] bg-[#FAF8F3] px-5 py-5 lg:sticky lg:top-24 lg:rounded-3xl lg:border lg:p-5 lg:shadow-sm">
        <div className="mb-4 hidden items-center gap-3 lg:flex">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#172B3A] text-[#D9B779]">
            <LayoutList size={21} />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[2px] text-[#B28A4B]">
              Dashboard
            </p>
            <p className="truncate text-sm font-bold text-[#172B3A]">{name}</p>
          </div>
        </div>

        <nav className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-1" aria-label="Dashboard navigation">
          {links.map(({ name: label, href, icon: Icon }) => {
            const active = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                  active
                    ? "bg-[#172B3A] text-white"
                    : "text-[#52606A] hover:bg-white hover:text-[#B28A4B]"
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
