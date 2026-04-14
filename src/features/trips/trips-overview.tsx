import { trips } from "@/features/trips/types";

const statusStyles: Record<(typeof trips)[number]["status"], string> = {
  planned: "bg-amber-100 text-amber-900",
  "in-progress": "bg-sky-100 text-sky-900",
  completed: "bg-emerald-100 text-emerald-900",
};

export function TripsOverview() {
  return (
    <section className="mt-10 grid gap-4">
      {trips.map((trip) => (
        <article
          key={trip.id}
          className="rounded-2xl border border-panel-border bg-panel p-5 shadow-[0_12px_30px_rgba(21,32,30,0.04)]"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-muted">
                {trip.season}
              </p>
              <h2 className="mt-2 text-xl font-semibold text-text">
                {trip.destination}
              </h2>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${statusStyles[trip.status]}`}
            >
              {trip.status}
            </span>
          </div>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-text-muted">
            {trip.description}
          </p>
        </article>
      ))}
    </section>
  );
}
