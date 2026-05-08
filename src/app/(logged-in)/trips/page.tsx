import type { Metadata } from "next";
import { TripsGrid } from "@/components/trips/trips-grid";

export const metadata: Metadata = {
  title: "My Trips",
  description: "Curated escapes and planned expeditions.",
};

export default function TripsPage() {
  return (
    <>
      <div className="mt-8">
        <p className="inline-flex rounded-full bg-[#fee1c8] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#ab6220]">
          Your archive
        </p>
        <h1 className="mt-4 text-5xl font-black tracking-[-0.02em] text-[#12202a]">My Trips</h1>
        <p className="mt-3 max-w-xl text-lg leading-8 text-[#5c7481]">
          Curated escapes and planned expeditions. Manage your upcoming itineraries and relive past wanderlust.
        </p>
      </div>

      <TripsGrid />
    </>
  );
}
