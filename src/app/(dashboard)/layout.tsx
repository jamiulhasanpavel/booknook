import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export const instant = false;

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-5 py-8 lg:flex-row lg:px-8">
      <DashboardSidebar name={session.user.name} />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
