import { verifyServerSession } from "@/lib/auth/session";

export default async function DashboardPage() {
  const sessionUser = await verifyServerSession();

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
        Dashboard
      </p>
      <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">Secure Server Dashboard</h1>
      <p className="text-lg text-text-muted">Welcome, your Firebase User ID is: {sessionUser?.uid}</p>
      <p className="text-lg text-text-muted">Your email is: {sessionUser?.email}</p>
    </div>
  );
}
