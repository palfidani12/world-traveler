"use client";

import { FlightBooking } from "@/features/bookings/types";

interface FlightCardProps {
  flight: FlightBooking;
}

export function FlightCard({ flight }: FlightCardProps) {
  return (
    <div className="rounded-lg border border-[#e2eaef] bg-white p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase text-[#666] tracking-[0.14em]">
              {flight.confirmationCode}
            </span>
            <span className="text-xs font-semibold text-[#999]">
              {flight.airline} • {flight.cabin}
            </span>
          </div>

          <div className="mt-4 flex items-end gap-6">
            <div>
              <p className="text-3xl font-bold text-[#1a3949]">{flight.departure.code}</p>
              <p className="text-sm text-[#666]">{flight.departure.city}, {flight.departure.country}</p>
              <p className="mt-2 text-xs text-[#999]">Departure: {flight.departure.date} • {flight.departure.time}</p>
            </div>

            <div className="text-center text-xs text-[#999] pb-2">
              <p>{flight.duration}</p>
            </div>

            <div>
              <p className="text-3xl font-bold text-[#1a3949]">{flight.arrival.code}</p>
              <p className="text-sm text-[#666]">{flight.arrival.city}, {flight.arrival.country}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button className="rounded-full bg-[#07394f] px-6 py-2 text-sm font-semibold text-white hover:bg-[#053a50]">
            View Ticket
          </button>
          <a href="#" className="text-right text-xs font-semibold text-[#0066cc] hover:underline">
            Download PDF
          </a>
        </div>
      </div>
    </div>
  );
}
