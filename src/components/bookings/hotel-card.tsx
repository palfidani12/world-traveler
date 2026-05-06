"use client";

import { HotelBooking } from "@/features/bookings/types";

interface HotelCardProps {
  hotel: HotelBooking;
}

export function HotelCard({ hotel }: HotelCardProps) {
  const statusColor =
    hotel.status === "ACTIVE"
      ? "bg-green-100 text-green-700"
      : hotel.status === "PENDING"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-gray-100 text-gray-700";

  return (
    <div className="rounded-lg border border-[#e2eaef] bg-white overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-32 bg-linear-to-br from-blue-400 via-blue-600 to-blue-800" />
      
      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-[#1a3949]">{hotel.name}</h3>
            <p className="mt-1 text-sm text-[#666]">
              {hotel.startDate} - {hotel.endDate} • {hotel.nights} Nights
            </p>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap ${statusColor}`}>
            {hotel.status}
          </span>
        </div>

        <div className="mt-4 flex gap-3">
          <a href="#" className="text-xs font-semibold text-[#0066cc] uppercase tracking-wide hover:underline">
            View Details
          </a>
          <a href="#" className="text-xs font-semibold text-[#0066cc] uppercase tracking-wide hover:underline">
            Get Directions
          </a>
        </div>
      </div>
    </div>
  );
}
