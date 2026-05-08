"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { trips as seededTrips, type TripItem, type TripStatus } from "@/features/trips/data";
import { tripsRepository } from "@/lib/firestore";
import type { Trip } from "@/features/trips/types";

const statusStyles: Record<TripStatus, string> = {
  active: "bg-cyan-100 text-cyan-800",
  confirmed: "bg-amber-100 text-amber-800",
  drafting: "bg-slate-200 text-slate-700",
  completed: "bg-emerald-100 text-emerald-800",
};

function IconCalendar() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18" />
    </svg>
  );
}

function mapTripStatus(status: Trip["status"]): TripStatus {
  if (status === "completed" || status === "archived") return "completed";
  if (status === "in-progress") return "active";
  return "drafting";
}

function toTripItem(trip: Trip): TripItem {
  const destination =
    typeof trip.destination === "string"
      ? trip.destination
      : `${trip.destination.name}, ${trip.destination.country}`;

  const dates =
    typeof trip.dates === "string"
      ? trip.dates
      : `${trip.dates.startDate} - ${trip.dates.endDate}`;

  const budgetUsed = trip.budgetUsed ?? 0;
  const totalBudget = trip.totalBudget ?? 0;
  const progress =
    totalBudget > 0
      ? Math.min(100, Math.round((budgetUsed / totalBudget) * 100))
      : 0;

  return {
    id: trip.id,
    title: trip.title,
    dates,
    progress,
    status: mapTripStatus(trip.status),
    theme: trip.theme
      ? "from-cyan-700 via-sky-800 to-slate-900"
      : "from-sky-500 via-cyan-700 to-blue-900",
    footer: trip.status === "completed" || trip.status === "archived" ? "Memories saved" : undefined,
    destination,
    budgetUsed,
    totalBudget,
    stops: trip.itinerary?.length ?? 0,
    reservations: trip.bookings?.length ?? 0,
  };
}

export function TripsGrid() {
  const [firestoreTrips, setFirestoreTrips] = useState<TripItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadTrips = async () => {
      try {
        const rows = await tripsRepository.list();
        if (!mounted) return;

        if (rows.length > 0) {
          setFirestoreTrips(rows.map(toTripItem));
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    void loadTrips();

    return () => {
      mounted = false;
    };
  }, []);

  const trips = useMemo(() => {
    if (firestoreTrips.length > 0) return firestoreTrips;
    return seededTrips;
  }, [firestoreTrips]);

  return (
    <>
      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        <Link
          href="/trips/new"
          className="flex min-h-80 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#c8d5dc] bg-white/70 p-8 text-center transition hover:border-[#8cb3c5] hover:bg-white"
        >
          <span className="mb-6 inline-flex size-12 items-center justify-center rounded-full bg-[#edf4f8] text-3xl text-[#4a6778]">
            +
          </span>
          <h2 className="text-3xl font-semibold tracking-[-0.01em] text-[#1d2e39]">Create New Trip</h2>
          <p className="mt-3 max-w-[18ch] text-sm leading-6 text-[#6f8794]">
            Start designing your next curator-approved journey.
          </p>
        </Link>

        {trips.map((trip) => (
          <Link
            key={trip.id}
            href={`/trips/${trip.id}/dashboard`}
            className="overflow-hidden rounded-2xl border border-[#d2dde4] bg-white shadow-[0_16px_45px_rgba(23,43,56,0.08)]"
          >
            <div className={`relative h-44 bg-linear-to-br ${trip.theme}`}>
              <span
                className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.11em] ${statusStyles[trip.status]}`}
              >
                {trip.status}
              </span>
            </div>

            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <h2 className="max-w-[14ch] text-[34px] font-semibold leading-9 tracking-[-0.02em] text-[#1a2832]">
                  {trip.title}
                </h2>
                <span className="mt-1 text-2xl leading-none text-[#4f6875]">⋮</span>
              </div>

              <p className="mt-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.03em] text-[#7a909c]">
                <IconCalendar />
                {trip.dates}
              </p>

              {trip.status !== "completed" ? (
                <>
                  <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.16em] text-[#627a87]">
                    Itinerary Progress
                  </p>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#d5e2e9]">
                      <div className="h-full rounded-full bg-[#0e607f]" style={{ width: `${trip.progress}%` }} />
                    </div>
                    <span className="text-xs font-bold text-[#3a5563]">{trip.progress}%</span>
                  </div>
                </>
              ) : (
                <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-[#4c9a87]">
                  {trip.footer}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>

      {isLoading && (
        <p className="mt-4 text-sm text-[#5c7481]">Loading trips...</p>
      )}

      <div className="mt-12 flex justify-center">
        <button
          type="button"
          className="rounded-full bg-[#e7edf1] px-7 py-3 text-sm font-semibold text-[#445d6b] transition hover:bg-[#d9e3e9]"
        >
          Load Archive
        </button>
      </div>
    </>
  );
}
