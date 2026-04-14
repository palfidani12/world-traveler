import { destinations } from "@/features/destinations/types";

export function DestinationsOverview() {
  return (
    <section className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {destinations.map((destination) => (
        <article
          key={destination.id}
          className="rounded-2xl border border-panel-border bg-panel p-5 shadow-[0_12px_30px_rgba(21,32,30,0.04)]"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-muted">
            {destination.region}
          </p>
          <h2 className="mt-2 text-lg font-semibold text-text">
            {destination.name}
          </h2>
          <p className="mt-3 text-sm leading-6 text-text-muted">
            {destination.summary}
          </p>
        </article>
      ))}
    </section>
  );
}
