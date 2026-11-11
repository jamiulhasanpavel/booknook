import type { ReactNode } from "react";

export default function BooksLayout({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-[1280px] px-6 py-12">{children}</div>;
}
