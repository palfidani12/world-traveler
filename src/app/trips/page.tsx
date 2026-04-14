import { TripsOverview } from "@/features/trips/trips-overview";

export const metadata = {
  title: "Trips",
  description: "Sample trip planning data and a typed overview page.",
};

export default function TripsPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-20 sm:px-10">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
        Example route
      </p>
      <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl">
        Trips
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-text-muted">
        A typed feature module with sample travel plans, status labels, and a reusable card layout.
      </p>
      <TripsOverview />
    </main>
  );
}
