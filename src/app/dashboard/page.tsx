import { redirect } from "next/navigation";
import { verifyServerSession } from "@/lib/auth/session";

export default async function DashboardPage() {
  const sessionUser = await verifyServerSession();

  if (!sessionUser) {
    redirect("/");
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Secure Server Dashboard</h1>
      <p>Welcome, your Firebase User ID is: {sessionUser.uid}</p>
      <p>Your email is: {sessionUser.email}</p>
    </div>
  );
}
