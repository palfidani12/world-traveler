import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { LoggedInNavbar } from "@/components/layout/logged-in-navbar";
import { verifyServerSession } from "@/lib/auth/session";

export default async function LoggedInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sessionUser = await verifyServerSession();

  if (!sessionUser) {
    redirect("/login");
  }

  return (
    <main className="bg-[radial-gradient(circle_at_0%_0%,#ffffff_0%,#f4f7f8_38%,#edf2f4_100%)]">
      <LoggedInNavbar />
      <div className="mx-auto w-full flex-row mt-8 flex min-h-[calc(100vh-96px)] gap-6 px-4 lg:flex">
        <AppSidebar />
        <section className="flex-1">{children}</section>
      </div>
    </main>
  );
}
