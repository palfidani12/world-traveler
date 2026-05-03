import { redirect } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { verifyServerSession } from "@/lib/auth/session";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sessionUser = await verifyServerSession();

  if (sessionUser) {
    redirect("/dashboard");
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
