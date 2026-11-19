"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { createBook } from "@/lib/api";

export default function AddBookPage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);

    const form = new FormData(event.currentTarget);

    try {
      await createBook({
        title: String(form.get("title") ?? ""),
        author: String(form.get("author") ?? ""),
        category: String(form.get("category") ?? "Others") as
          | "Fiction"
          | "Science"
          | "History"
          | "Kids"
          | "Others",
        image: String(form.get("image") ?? ""),
        description: String(form.get("description") ?? ""),
        readingContent: String(form.get("readingContent") ?? ""),
        totalCopies: Number(form.get("totalCopies") ?? 1),
      });

      toast.success("Book added successfully");
      router.push("/my-books");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to add book");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <main className="mx-auto max-w-3xl py-4">
      <div className="rounded-3xl border border-[#E9E3D8] bg-[#FAF8F3] p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[4px] text-[#B28A4B]">Dashboard</p>
        <h1 className="mt-3 font-serif text-4xl font-bold text-[#172B3A]">Add a New Book</h1>
        <p className="mt-3 text-gray-600">Share a title with the community and build your library shelf.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="rounded-2xl border border-[#E9E3D8] bg-white p-4">
              <span className="text-sm text-gray-500">Title</span>
              <input name="title" required className="mt-2 w-full outline-none" placeholder="The Hidden Library" />
            </label>
            <label className="rounded-2xl border border-[#E9E3D8] bg-white p-4">
              <span className="text-sm text-gray-500">Author</span>
              <input name="author" required className="mt-2 w-full outline-none" placeholder="Leah Ross" />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="rounded-2xl border border-[#E9E3D8] bg-white p-4">
              <span className="text-sm text-gray-500">Category</span>
              <select name="category" required defaultValue="Fiction" className="mt-2 w-full bg-transparent outline-none">
                <option>Fiction</option>
                <option>Science</option>
                <option>History</option>
                <option>Kids</option>
                <option>Others</option>
              </select>
            </label>
            <label className="rounded-2xl border border-[#E9E3D8] bg-white p-4">
              <span className="text-sm text-gray-500">Total Copies</span>
              <input name="totalCopies" type="number" min="1" defaultValue="1" required className="mt-2 w-full outline-none" />
            </label>
          </div>

          <label className="block rounded-2xl border border-[#E9E3D8] bg-white p-4">
            <span className="text-sm text-gray-500">Image URL</span>
            <input name="image" type="url" className="mt-2 w-full outline-none" placeholder="https://example.com/book.jpg" />
          </label>

          <label className="block rounded-2xl border border-[#E9E3D8] bg-white p-4">
            <span className="text-sm text-gray-500">Description</span>
            <textarea name="description" required rows={4} className="mt-2 w-full resize-none outline-none" placeholder="Write a short description..." />
          </label>

          <label className="block rounded-2xl border border-[#E9E3D8] bg-white p-4">
            <span className="text-sm text-gray-500">Reading text</span>
            <textarea name="readingContent" rows={8} className="mt-2 w-full resize-y outline-none" placeholder="Add the text readers can read after borrowing this book..." />
          </label>

          <div className="flex justify-between gap-3 pt-4">
            <Link href="/" className="text-sm font-semibold text-[#B28A4B]">
              Back to home
            </Link>
            <button type="submit" disabled={isSaving} className="rounded-full bg-[#172B3A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#B28A4B] disabled:cursor-not-allowed disabled:opacity-60">
              {isSaving ? "Saving..." : "Save Book"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
