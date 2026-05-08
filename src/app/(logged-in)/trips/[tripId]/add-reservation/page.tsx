import { redirect } from "next/navigation";
import { ReservationForm } from "@/components/reservations/reservation-form";
import { resolveTripById } from "@/lib/trips/resolve-trip";

interface AddReservationPageProps {
  params: Promise<{ tripId: string }>;
}

export async function generateMetadata({
  params,
}: AddReservationPageProps) {
  const { tripId } = await params;
  const trip = await resolveTripById(tripId);
  return {
    title: trip ? `Add Reservation - ${trip.title}` : "Add Reservation",
  };
}

export default async function AddReservationPage({
  params,
}: AddReservationPageProps) {
  const { tripId } = await params;
  const trip = await resolveTripById(tripId);

  if (!trip) {
    redirect("/trips");
  }

  return (
    <ReservationForm
      tripId={tripId}
      cancelUrl={`/trips/${tripId}/reservations`}
    />
  );
}
