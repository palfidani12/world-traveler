import { notFound } from "next/navigation";
import { resolveTripById } from "@/lib/trips/resolve-trip";
import { TripEditForm } from "@/components/trips/trip-edit-form";

export default async function TripEditPage({
  params,
}: Readonly<{
  params: Promise<{ tripId: string }>;
}>) {
  const { tripId } = await params;
  const trip = await resolveTripById(tripId);

  if (!trip) {
    notFound();
  }

  return (
    <>
      <h2 className="text-3xl font-bold text-[#20323e]">Edit Trip Basics</h2>
      <p className="mt-2 text-[#607582]">Update destination, dates, and budget assumptions for this trip.</p>

      <TripEditForm
        tripId={tripId}
        fallbackTrip={{
          title: trip.title,
          destination: trip.destination,
          dates: trip.dates,
          totalBudget: trip.totalBudget,
        }}
      />
    </>
  );
}
