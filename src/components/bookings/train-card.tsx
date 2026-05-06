"use client";

import { TrainBooking } from "@/features/bookings/types";

interface TrainCardProps {
  train: TrainBooking;
}

export function TrainCard({ train }: TrainCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-lg border-l-4 border-l-[#07394f] bg-white p-4">
      <div className="text-2xl">🚆</div>
      
      <div className="flex-1">
        <p className="text-xs font-semibold uppercase text-[#666] tracking-[0.12em]">
          {train.confirmationCode}
        </p>
        <p className="mt-1 font-semibold text-[#1a3949]">{train.name}</p>
        <p className="mt-1 text-sm text-[#666]">
          {train.departure.city} → {train.arrival.city}
        </p>
      </div>

      <div className="text-right">
        <p className="text-xs text-[#999]">{train.date}</p>
        <p className="mt-1 font-semibold text-[#1a3949]">{train.seat}</p>
      </div>

      <button className="ml-4 text-2xl text-[#ccc] hover:text-[#666]">↓</button>
    </div>
  );
}
