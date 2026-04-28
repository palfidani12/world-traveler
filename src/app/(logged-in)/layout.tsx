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
    <main className="min-h-screen bg-[radial-gradient(circle_at_0%_0%,#ffffff_0%,#f4f7f8_38%,#edf2f4_100%)]">
      <div className="mx-auto flex w-full max-w-7xl flex-col rounded-3xl border border-[#d6dee3] bg-[#f8fbfd] shadow-[0_32px_90px_rgba(20,44,59,0.08)] lg:min-h-screen lg:flex-row">
        <AppSidebar />
        <section className="flex-1">
          <LoggedInNavbar />
          {children}
        </section>
      </div>
    </main>
  );
}
