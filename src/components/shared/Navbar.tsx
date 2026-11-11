
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Menu,
  X,
  ChevronDown,
  UserRound,
  LogOut,
  Library,
  Bookmark,
} from "lucide-react";

type NavbarUser = {
  name: string;
  email: string;
  image?: string;
};

type NavbarProps = {
  user?: NavbarUser | null;
  onLogout?: () => void;
};

export default function Navbar({
  user = null,
  onLogout,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const pathname = usePathname();

  const publicLinks = [
    { name: "Home", href: "/" },
    { name: "All Books", href: "/books" },
  ];

  const privateLinks = [
    { name: "Add Book", href: "/add-book" },
    { name: "My Books", href: "/my-books" },
    { name: "My Borrows", href: "/my-borrows" },
  ];

  const links = user
    ? [...publicLinks, ...privateLinks]
    : publicLinks;

  return (
    <header className="sticky top-0 z-50 border-b border-[#E9E3D8] bg-[#FAF8F3]/95 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-5 md:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#172B3A] text-[#D9B779]">
            <BookOpen size={25} />
          </div>

          <div>
            <h1 className="font-serif text-2xl font-bold tracking-tight text-[#172B3A]">
              BookNook
            </h1>
            <p className="text-[9px] font-semibold uppercase tracking-[2.5px] text-[#A18A68]">
              A Small Online Library
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-7 lg:flex">
          {links.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== "/" &&
                pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-2 text-sm font-medium transition-colors ${
                  active
                    ? "text-[#B28A4B]"
                    : "text-[#52606A] hover:text-[#B28A4B]"
                }`}
              >
                {link.name}

                {active && (
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-[#B28A4B]" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop Auth */}
        <div className="hidden items-center gap-4 lg:flex">
          {!user ? (
            <>
              <Link
                href="/login"
                className="text-sm font-semibold text-[#172B3A] transition hover:text-[#B28A4B]"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-full bg-[#172B3A] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#B28A4B]"
              >
                Get Started
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 rounded-full border border-[#E9E3D8] p-1.5 pr-3"
              >
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#172B3A] text-white">
                    <UserRound size={18} />
                  </div>
                )}

                <span className="text-sm font-semibold text-[#172B3A]">
                  {user.name}
                </span>

                <ChevronDown size={16} />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-14 w-56 rounded-xl border border-[#E9E3D8] bg-white p-2 shadow-xl">
                  <p className="px-3 py-2 text-xs text-gray-500">
                    {user.email}
                  </p>

                  <Link
                    href="/profile"
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-[#F5F1E9]"
                    onClick={() => setProfileOpen(false)}
                  >
                    <UserRound size={17} />
                    My Profile
                  </Link>

                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      onLogout?.();
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={17} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-[#172B3A] hover:bg-[#F0EDE6] lg:hidden"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="border-t border-[#E9E3D8] bg-[#FAF8F3] px-5 py-5 lg:hidden">
          <div className="mx-auto flex max-w-[1280px] flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg px-4 py-3 text-sm font-medium ${
                  pathname === link.href
                    ? "bg-[#172B3A] text-white"
                    : "text-[#52606A] hover:bg-[#F0EDE6]"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {!user ? (
              <div className="mt-3 grid grid-cols-2 gap-3">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full border border-[#172B3A] py-3 text-center text-sm font-semibold text-[#172B3A]"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full bg-[#172B3A] py-3 text-center text-sm font-semibold text-white"
                >
                  Register
                </Link>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileOpen(false);
                  onLogout?.();
                }}
                className="mt-3 flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut size={18} />
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
