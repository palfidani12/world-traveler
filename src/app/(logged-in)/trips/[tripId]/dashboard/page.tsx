import { notFound } from "next/navigation";
import { getTripById } from "@/features/trips/data";

export default async function TripDashboardPage({
  params,
}: Readonly<{
  params: Promise<{ tripId: string }>;
}>) {
  const { tripId } = await params;
  const trip = getTripById(tripId);

  if (!trip) {
    notFound();
  }

  const budgetPercent = Math.min(100, Math.round((trip.budgetUsed / trip.totalBudget) * 100));

  return (
    <>
      <h2 className="text-3xl font-bold text-[#20323e]">Trip Dashboard</h2>
      <p className="mt-2 text-[#607582]">A quick operational snapshot of your selected trip.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Progress" value={`${trip.progress}%`} helper="planning complete" />
        <MetricCard label="Reservations" value={`${trip.reservations}`} helper="bookings tracked" />
        <MetricCard label="Stops" value={`${trip.stops}`} helper="planned experiences" />
        <MetricCard label="Budget Used" value={`${budgetPercent}%`} helper={`$${trip.budgetUsed} of $${trip.totalBudget}`} />
      </div>
    </>
  );
}

function MetricCard({
  label,
  value,
  helper,
}: Readonly<{
  label: string;
  value: string;
  helper: string;
}>) {
  return (
    <article className="rounded-2xl border border-[#e4ebef] bg-[#fbfdfe] p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#708692]">{label}</p>
      <p className="mt-2 text-3xl font-bold tracking-[-0.02em] text-[#1f313d]">{value}</p>
      <p className="mt-1 text-sm text-[#6d818e]">{helper}</p>
    </article>
  );
}
