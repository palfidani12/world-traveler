import { redirect } from "next/navigation";
import { ReservationForm } from "@/components/reservations/reservation-form";
import { getTripById } from "@/features/trips/data";

interface AddReservationPageProps {
  params: Promise<{ tripId: string }>;
}

export async function generateMetadata({
  params,
}: AddReservationPageProps) {
  const { tripId } = await params;
  const trip = getTripById(tripId);
  return {
    title: trip ? `Add Reservation - ${trip.title}` : "Add Reservation",
  };
}

export default async function AddReservationPage({
  params,
}: AddReservationPageProps) {
  const { tripId } = await params;
  const trip = getTripById(tripId);

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
