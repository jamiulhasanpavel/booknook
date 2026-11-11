import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="mx-auto flex min-h-[65vh] max-w-xl items-center justify-center px-6 py-20">
      <div className="w-full rounded-3xl border border-[#E9E3D8] bg-[#FAF8F3] p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[4px] text-[#B28A4B]">
          New reader
        </p>
        <h1 className="mt-3 font-serif text-4xl font-bold text-[#172B3A]">Create your account</h1>
        <p className="mt-3 text-gray-600">Join BookNook and start building your reading journey.</p>

        <div className="mt-8 space-y-4">
          <div className="rounded-xl border border-[#E9E3D8] bg-white p-4">
            <p className="text-sm text-gray-500">Name</p>
            <p className="mt-2 font-medium text-[#172B3A]">Your Name</p>
          </div>
          <div className="rounded-xl border border-[#E9E3D8] bg-white p-4">
            <p className="text-sm text-gray-500">Email</p>
            <p className="mt-2 font-medium text-[#172B3A]">you@example.com</p>
          </div>
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
