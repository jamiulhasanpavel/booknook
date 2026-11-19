"use client";

import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="mx-auto flex min-h-[65vh] max-w-xl items-center justify-center px-6 py-20">
      <div className="w-full rounded-3xl border border-[#E9E3D8] bg-[#FAF8F3] p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[4px] text-[#B28A4B]">
          New reader
        </p>
        <h1 className="mt-3 font-serif text-4xl font-bold text-[#172B3A]">Create your account</h1>
        <p className="mt-3 text-gray-600">Join BookNook and start building your reading journey.</p>

        <div className="mt-8 space-y-4">
          <label className="block rounded-xl border border-[#E9E3D8] bg-white p-4">
            <span className="text-sm text-gray-500">Name</span>
            <input
              type="text"
              defaultValue="Your Name"
              className="mt-2 w-full bg-transparent text-base font-medium text-[#172B3A] outline-none"
            />
          </label>

          <label className="block rounded-xl border border-[#E9E3D8] bg-white p-4">
            <span className="text-sm text-gray-500">Email</span>
            <input
              type="email"
              defaultValue="you@example.com"
              className="mt-2 w-full bg-transparent text-base font-medium text-[#172B3A] outline-none"
            />
          </label>

          <label className="relative block rounded-xl border border-[#E9E3D8] bg-white p-4">
            <span className="text-sm text-gray-500">Password</span>
            <div className="mt-2 flex items-center gap-2">
              <input
                type={showPassword ? "text" : "password"}
                defaultValue="secretpass"
                className="w-full bg-transparent pr-10 text-base font-medium text-[#172B3A] outline-none"
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#172B3A] transition hover:text-[#B28A4B]"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>
        </div>

        <div className="mt-8 flex items-center justify-between gap-3">
          <Link href="/login" className="text-sm font-semibold text-[#B28A4B]">
            Already have an account?
          </Link>
          <Link
            href="/"
            className="rounded-full bg-[#172B3A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#B28A4B]"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  );
}
