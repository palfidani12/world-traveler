import { getTripById as getSeedTrip } from "@/features/trips/data";
import type { Trip as FirestoreTrip } from "@/features/trips/types";
import { tripsRepository } from "@/lib/firestore";

export type ResolvedTrip = {
  id: string;
  title: string;
  destination: string;
  dates: string;
  totalBudget: number;
  budgetUsed: number;
};

function normalizeDates(dates: FirestoreTrip["dates"]): string {
  if (typeof dates === "string") return dates;
  return `${dates.startDate} - ${dates.endDate}`;
}

function normalizeDestination(destination: FirestoreTrip["destination"]): string {
  if (typeof destination === "string") return destination;
  return `${destination.name}, ${destination.country}`;
}

function mapFirestoreTrip(trip: FirestoreTrip): ResolvedTrip {
  return {
    id: trip.id,
    title: trip.title,
    destination: normalizeDestination(trip.destination),
    dates: normalizeDates(trip.dates),
    totalBudget: trip.totalBudget ?? 0,
    budgetUsed: trip.budgetUsed ?? 0,
  };
}

export async function resolveTripById(tripId: string): Promise<ResolvedTrip | null> {
  const seed = getSeedTrip(tripId);
  if (seed) {
    return {
      id: seed.id,
      title: seed.title,
      destination: seed.destination,
      dates: seed.dates,
      totalBudget: seed.totalBudget,
      budgetUsed: seed.budgetUsed,
    };
  }

  try {
    const firestoreTrip = await tripsRepository.getById(tripId);
    if (!firestoreTrip) return null;
    return mapFirestoreTrip(firestoreTrip);
  } catch (error) {
    console.error(error);
    return null;
  }
}
