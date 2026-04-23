import { DestinationsOverview } from "@/features/destinations/destinations-overview";

export const metadata = {
  title: "Destinations",
  description: "Sample destination data and a typed overview page.",
};

export default function DestinationsPage() {
  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">Example route</p>
      <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl">Destinations</h1>
      <p className="mt-5 max-w-2xl text-lg text-text-muted">
        A typed feature module with sample places, regional labels, and reusable data.
      </p>
      <DestinationsOverview />
    </>
  );
}
