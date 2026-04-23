import { verifyServerSession } from "@/lib/auth/session";
import Link from "next/link";
import { trips } from "@/features/trips/data";

export default async function DashboardPage() {
  const sessionUser = await verifyServerSession();

  return (
    <section className="mt-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
        Overview
      </p>
      <h1 className="mt-3 text-5xl font-black tracking-[-0.02em] text-[#13232d]">Trip Command Center</h1>
      <p className="mt-3 max-w-2xl text-lg text-[#617785]">
        Welcome back, {sessionUser?.email}. Pick up where you left off or launch a new curated journey.
      </p>

      <div className="mt-7 flex flex-wrap gap-3">
        <Link
          href="/trips"
          className="rounded-full bg-[#075f7d] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#064f68]"
        >
          Open My Trips
        </Link>
        <Link
          href="/trips/new"
          className="rounded-full border border-[#c8d9e3] bg-white px-5 py-2.5 text-sm font-semibold text-[#335262] transition hover:border-[#9eb8c6]"
        >
          Create New Trip
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {trips.slice(0, 3).map((trip) => (
          <Link
            key={trip.id}
            href={`/trips/${trip.id}/dashboard`}
            className="rounded-2xl border border-[#dbe6ec] bg-white p-5 shadow-[0_8px_24px_rgba(28,50,65,0.08)] transition hover:border-[#aac4d1]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6b828f]">Continue trip</p>
            <h2 className="mt-2 text-2xl font-bold tracking-[-0.01em] text-[#1d2f3a]">{trip.title}</h2>
            <p className="mt-2 text-sm text-[#5f7380]">{trip.destination}</p>
            <p className="mt-3 text-sm font-semibold text-[#24566d]">Open Workspace →</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
