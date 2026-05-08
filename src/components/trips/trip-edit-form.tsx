"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import type { Trip } from "@/features/trips/types";
import { tripsRepository } from "@/lib/firestore";

type TripEditFormProps = {
  tripId: string;
  fallbackTrip: {
    title: string;
    destination: string;
    dates: string;
    totalBudget: number;
  };
};

export function TripEditForm({ tripId, fallbackTrip }: TripEditFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(fallbackTrip.title);
  const [destination, setDestination] = useState(fallbackTrip.destination);
  const [dates, setDates] = useState(fallbackTrip.dates);
  const [totalBudget, setTotalBudget] = useState(String(fallbackTrip.totalBudget));
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadTrip = async () => {
      try {
        const firestoreTrip = await tripsRepository.getById(tripId);
        if (!mounted || !firestoreTrip) return;

        setTitle(firestoreTrip.title);
        setDestination(
          typeof firestoreTrip.destination === "string"
            ? firestoreTrip.destination
            : firestoreTrip.destination.name,
        );
        setDates(typeof firestoreTrip.dates === "string" ? firestoreTrip.dates : `${firestoreTrip.dates.startDate} - ${firestoreTrip.dates.endDate}`);
        setTotalBudget(String(firestoreTrip.totalBudget));
      } catch (error) {
        console.error(error);
      }
    };

    void loadTrip();

    return () => {
      mounted = false;
    };
  }, [tripId]);

  const handleSave = async () => {
    if (!title.trim() || !destination.trim() || !dates.trim()) {
      setStatusMessage("Please complete all fields.");
      return;
    }

    setIsSaving(true);
    setStatusMessage(null);

    try {
      const now = new Date().toISOString();
      const existing = await tripsRepository.getById(tripId);

      if (existing) {
        await tripsRepository.update(tripId, {
          title: title.trim(),
          destination: destination.trim(),
          dates: dates.trim(),
          totalBudget: Number(totalBudget || "0"),
          updatedAt: now,
        });
      } else {
        const newTrip: Trip = {
          id: tripId,
          title: title.trim(),
          description: "",
          destination: destination.trim(),
          dates: dates.trim(),
          status: "planned",
          visibility: "private",
          totalBudget: Number(totalBudget || "0"),
          budgetUsed: 0,
          currency: "USD",
          createdBy: "user-1",
          participants: ["user-1"],
          createdAt: now,
          updatedAt: now,
        };

        await tripsRepository.upsert(newTrip);
      }

      setStatusMessage("Trip saved successfully.");
      router.refresh();
    } catch (error) {
      console.error(error);
      setStatusMessage("Failed to save trip.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={(event) => event.preventDefault()}>
        <label className="block">
          <span className="text-sm font-semibold text-[#546974]">Trip name</span>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="mt-2 h-11 w-full rounded-xl border border-[#dfe7ec] bg-[#fafcfd] px-4 text-[#29404f] outline-none"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-[#546974]">Destination</span>
          <input
            type="text"
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
            className="mt-2 h-11 w-full rounded-xl border border-[#dfe7ec] bg-[#fafcfd] px-4 text-[#29404f] outline-none"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-[#546974]">Travel dates</span>
          <input
            type="text"
            value={dates}
            onChange={(event) => setDates(event.target.value)}
            className="mt-2 h-11 w-full rounded-xl border border-[#dfe7ec] bg-[#fafcfd] px-4 text-[#29404f] outline-none"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-[#546974]">Budget ceiling</span>
          <input
            type="number"
            value={totalBudget}
            onChange={(event) => setTotalBudget(event.target.value)}
            className="mt-2 h-11 w-full rounded-xl border border-[#dfe7ec] bg-[#fafcfd] px-4 text-[#29404f] outline-none"
          />
        </label>

        <div className="sm:col-span-2 mt-3 flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="rounded-full bg-[#075f7d] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#064f68]"
          >
            {isSaving ? "Saving..." : "Save Trip Basics"}
          </button>
        </div>
      </form>

      {statusMessage && <p className="mt-3 text-sm text-[#546974]">{statusMessage}</p>}
    </>
  );
}
