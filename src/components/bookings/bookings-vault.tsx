"use client";

import { useState } from "react";
import { getFlightBookings, getHotelBookings, getTrainBookings } from "@/features/bookings/data";
import { FlightCard } from "./flight-card";
import { HotelCard } from "./hotel-card";
import { TrainCard } from "./train-card";

type TabType = "ALL" | "FLIGHTS" | "HOTELS" | "TRAINS" | "ACTIVITIES";

const tabs: { label: string; value: TabType }[] = [
  { label: "All Items", value: "ALL" },
  { label: "Flights", value: "FLIGHTS" },
  { label: "Hotels", value: "HOTELS" },
  { label: "Trains", value: "TRAINS" },
  { label: "Activities", value: "ACTIVITIES" },
];

export function BookingsVault() {
  const [activeTab, setActiveTab] = useState<TabType>("ALL");

  const flights = getFlightBookings();
  const hotels = getHotelBookings();
  const trains = getTrainBookings();

  const showFlights =
    activeTab === "ALL" || activeTab === "FLIGHTS";
  const showHotels =
    activeTab === "ALL" || activeTab === "HOTELS";
  const showTrains =
    activeTab === "ALL" || activeTab === "TRAINS";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-[#1a3949]">Bookings Vault</h1>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              activeTab === tab.value
                ? "bg-[#07394f] text-white"
                : "bg-[#e8eef3] text-[#1a3949] hover:bg-[#dce4ec]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Flights Section */}
      {showFlights && flights.length > 0 && (
        <section>
          <div className="mb-4 flex items-center gap-2">
            <span className="text-lg">✈️</span>
            <h2 className="text-2xl font-bold text-[#1a3949]">Upcoming Flights</h2>
          </div>
          <div className="space-y-4">
            {flights.map((flight) => (
              <FlightCard key={flight.id} flight={flight} />
            ))}
          </div>
        </section>
      )}

      {/* Hotels Section */}
      {showHotels && hotels.length > 0 && (
        <section>
          <div className="mb-4 flex items-center gap-2">
            <span className="text-lg">🏨</span>
            <h2 className="text-2xl font-bold text-[#1a3949]">Accommodations</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {hotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        </section>
      )}

      {/* Trains Section */}
      {showTrains && trains.length > 0 && (
        <section>
          <div className="mb-4 flex items-center gap-2">
            <span className="text-lg">🚆</span>
            <h2 className="text-2xl font-bold text-[#1a3949]">Rail & Transit</h2>
          </div>
          <div className="space-y-3">
            {trains.map((train) => (
              <TrainCard key={train.id} train={train} />
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {((activeTab === "FLIGHTS" && flights.length === 0) ||
        (activeTab === "HOTELS" && hotels.length === 0) ||
        (activeTab === "TRAINS" && trains.length === 0) ||
        (activeTab === "ACTIVITIES")) && (
        <div className="rounded-lg border border-dashed border-[#cad8e1] bg-[#f8fbfd] p-12 text-center text-[#5f7481]">
          <p className="text-lg font-semibold">No bookings found</p>
          <p className="mt-2">Add your first booking to get started</p>
        </div>
      )}
    </div>
  );
}
