"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

import { getFlightBookings, getHotelBookings, getTrainBookings } from "@/features/bookings/data";
import { bookingsRepository } from "@/lib/firestore";
import type { ActivityBooking, Booking, FlightBooking, HotelBooking, TrainBooking } from "@/features/bookings/types";
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
  const params = useParams<{ tripId?: string }>();
  const tripId = params?.tripId;
  const [activeTab, setActiveTab] = useState<TabType>("ALL");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const run = async () => {
      try {
        const firestoreBookings = tripId
          ? await bookingsRepository.listByTripId(tripId)
          : await bookingsRepository.list();

        if (isMounted && firestoreBookings.length > 0) {
          setBookings(firestoreBookings);
          setIsLoading(false);
          return;
        }
      } catch (error) {
        console.error(error);
      }

      if (isMounted) {
        const fallback = [...getFlightBookings(), ...getHotelBookings(), ...getTrainBookings()];
        setBookings(tripId ? fallback.filter((item) => item.tripId === tripId) : fallback);
        setIsLoading(false);
      }
    };

    void run();

    return () => {
      isMounted = false;
    };
  }, [tripId]);

  const flights = useMemo(
    () => bookings.filter((item): item is FlightBooking => item.type === "FLIGHT"),
    [bookings],
  );
  const hotels = useMemo(
    () => bookings.filter((item): item is HotelBooking => item.type === "HOTEL"),
    [bookings],
  );
  const trains = useMemo(
    () => bookings.filter((item): item is TrainBooking => item.type === "TRAIN"),
    [bookings],
  );
  const activities = useMemo(
    () => bookings.filter((item): item is ActivityBooking => item.type === "ACTIVITY"),
    [bookings],
  );

  const showFlights =
    activeTab === "ALL" || activeTab === "FLIGHTS";
  const showHotels =
    activeTab === "ALL" || activeTab === "HOTELS";
  const showTrains =
    activeTab === "ALL" || activeTab === "TRAINS";

  return (
    <div className="space-y-6">
      {isLoading && (
        <div className="rounded-lg border border-[#e2eaef] bg-white p-4 text-sm text-[#5f7481]">
          Loading bookings...
        </div>
      )}

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

      {(activeTab === "ALL" || activeTab === "ACTIVITIES") && activities.length > 0 && (
        <section>
          <div className="mb-4 flex items-center gap-2">
            <span className="text-lg">🎟️</span>
            <h2 className="text-2xl font-bold text-[#1a3949]">Activities</h2>
          </div>
          <div className="space-y-3">
            {activities.map((activity) => (
              <div key={activity.id} className="rounded-lg border border-[#e2eaef] bg-white p-4">
                <p className="font-semibold text-[#1a3949]">{activity.name}</p>
                <p className="mt-1 text-sm text-[#666]">
                  {activity.date} • {activity.startTime} • {activity.location.city}
                </p>
              </div>
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
