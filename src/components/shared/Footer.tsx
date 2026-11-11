
import Link from "next/link";
import { BookOpen, Mail, Phone, MapPin } from "lucide-react";

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com", glyph: "f" },
  { label: "Instagram", href: "https://instagram.com", glyph: "◎" },
  { label: "LinkedIn", href: "https://linkedin.com", glyph: "in" },
];

export default function Footer() {
  return (
    <footer className="bg-[#172B3A] text-white">

      <div className="mx-auto grid max-w-[1280px] gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-4">

        {/* Brand */}
        <div className="lg:col-span-2">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#D9B779] text-[#172B3A]">
              <BookOpen size={27} />
            </div>

            <div>
              <h2 className="font-serif text-3xl font-bold">
                BookNook
              </h2>
              <p className="text-[10px] uppercase tracking-[3px] text-[#D9B779]">
                A Small Online Library
              </p>
            </div>
          </Link>

          <p className="mt-6 max-w-sm text-sm leading-7 text-gray-300">
            Discover wonderful stories, explore new ideas,
            and enjoy reading. BookNook brings your next
            favorite book closer to you.
          </p>

          {/* Social Links */}
          <div className="mt-6 flex gap-3">
            {socialLinks.map(({ label, href, glyph }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${label}`}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-sm font-bold transition hover:border-[#D9B779] hover:bg-[#D9B779] hover:text-[#172B3A]"
              >
                {glyph}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-6 font-serif text-xl font-semibold text-[#D9B779]">
            Quick Links
          </h3>

          <ul className="space-y-4 text-sm text-gray-300">
            <li>
              <Link href="/" className="transition hover:text-[#D9B779]">
                Home
              </Link>
            </li>
            <li>
              <Link href="/books" className="transition hover:text-[#D9B779]">
                Explore Books
              </Link>
            </li>
            <li>
              <Link href="/login" className="transition hover:text-[#D9B779]">
                Login
              </Link>
            </li>
            <li>
              <Link href="/register" className="transition hover:text-[#D9B779]">
                Register
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-6 font-serif text-xl font-semibold text-[#D9B779]">
            Get In Touch
          </h3>

          <ul className="space-y-5 text-sm text-gray-300">
            <li className="flex items-start gap-3">
              <Mail size={18} className="mt-0.5 shrink-0 text-[#D9B779]" />
              <span>support@booknook.com</span>
            </li>

            <li className="flex items-start gap-3">
              <Phone size={18} className="mt-0.5 shrink-0 text-[#D9B779]" />
              <span>+880 1700-000000</span>
            </li>

            <li className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-[#D9B779]" />
              <span>Bangladesh</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-3 px-6 py-6 text-center text-xs text-gray-400 md:flex-row">
          <p>
            © 2026 BookNook. All rights reserved.
          </p>

          <p>
            Made with care for every book lover.
          </p>
        </div>
      </div>
    </footer>
  );
}
