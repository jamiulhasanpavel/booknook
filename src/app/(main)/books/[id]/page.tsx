import BookReader from "@/components/books/BookReader";

export const instant = false;

export default async function ReadBookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <BookReader id={id} />;
}
