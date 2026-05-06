"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ReservationType = "flight" | "hotel" | "activity";

interface ReservationFormProps {
  tripId: string;
  cancelUrl?: string;
  onSave?: (data: unknown) => void;
}

export function ReservationForm({
  tripId,
  cancelUrl,
  onSave,
}: ReservationFormProps) {
  const router = useRouter();
  const [reservationType, setReservationType] =
    useState<ReservationType>("hotel");

  // Common fields
  const [totalAmount, setTotalAmount] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("paid_in_full");
  const [documentation, setDocumentation] = useState<File | null>(null);

  // Hotel fields
  const [hotelName, setHotelName] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [roomType, setRoomType] = useState("");
  const [confirmationNumber, setConfirmationNumber] = useState("");
  const [hotelAmenities, setHotelAmenities] = useState("");

  // Flight fields
  const [airline, setAirline] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [seatNumber, setSeatNumber] = useState("");
  const [boardingPass, setBoardingPass] = useState<File | null>(null);

  // Activity fields
  const [activityName, setActivityName] = useState("");
  const [activityDate, setActivityDate] = useState("");
  const [activityTime, setActivityTime] = useState("");
  const [location, setLocation] = useState("");
  const [activityType, setActivityType] = useState("");
  const [activityConfirmation, setActivityConfirmation] = useState("");
  const [activityNotes, setActivityNotes] = useState("");

  const handleSave = () => {
    const baseData = {
      tripId,
      type: reservationType,
      totalAmount,
      paymentStatus,
      documentation,
    };

    let typeSpecificData = {};
    if (reservationType === "hotel") {
      typeSpecificData = {
        hotelName,
        checkIn,
        checkOut,
        roomType,
        confirmationNumber,
        amenities: hotelAmenities,
      };
    } else if (reservationType === "flight") {
      typeSpecificData = {
        airline,
        flightNumber,
        departureAirport,
        arrivalAirport,
        departureTime,
        arrivalTime,
        seatNumber,
        boardingPass,
      };
    } else if (reservationType === "activity") {
      typeSpecificData = {
        activityName,
        activityDate,
        activityTime,
        location,
        activityType,
        confirmationNumber: activityConfirmation,
        notes: activityNotes,
      };
    }

    onSave?.({ ...baseData, ...typeSpecificData });
  };

  const getTitle = () => {
    if (reservationType === "flight") return "Flight Details";
    if (reservationType === "activity") return "Activity Details";
    return "Stay Details";
  };

  return (
    <div className="min-h-screen bg-[#f8fafb] p-6 sm:p-8">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1a1a1a]">New Reservation</h1>
          <p className="mt-1 text-[#666]">
            {reservationType === "flight" && "Add details for your flight."}
            {reservationType === "hotel" && "Add details for your upcoming stay."}
            {reservationType === "activity" && "Add details for your activity."}
          </p>
        </div>
        {cancelUrl && (
          <button
            onClick={() => router.push(cancelUrl)}
            className="text-[#999] hover:text-[#1a1a1a]"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Reservation Type Tabs */}
      <div className="mb-8 flex gap-3">
        {(["flight", "hotel", "activity"] as const).map((type) => (
          <button
            key={type}
            onClick={() => setReservationType(type)}
            className={`flex items-center gap-2 rounded-full px-4 py-2 font-medium transition ${
              reservationType === type
                ? "bg-[#38a3a5] text-white"
                : "bg-white text-[#666] hover:bg-[#f5f5f5]"
            }`}
          >
            {type === "flight" && (
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 19c-4.286 1.35-4.286-2.55-6-4m12 0v-5m0-4V5m0-1h.01M7 8h.01M7 20h.01M16 8h.01" />
              </svg>
            )}
            {type === "hotel" && (
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2zm-3-9h-8m0 4h8m0-8h-8" />
              </svg>
            )}
            {type === "activity" && (
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column - Stay Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Type-Specific Details */}
          <div className="rounded-2xl bg-white p-6">
            <h2 className="text-lg font-bold text-[#1a1a1a]">{getTitle()}</h2>

            <div className="mt-6 space-y-5">
              {/* HOTEL FORM */}
              {reservationType === "hotel" && (
                <>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-[#666]">
                      Hotel Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Le Sirenuse"
                      value={hotelName}
                      onChange={(e) => setHotelName(e.target.value)}
                      className="mt-2 h-11 w-full rounded-xl border border-[#ddd] bg-[#f5f5f5] px-4 text-[#333] placeholder-[#999] outline-none transition focus:border-[#075f7d] focus:ring-1 focus:ring-[#075f7d]"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-widest text-[#666]">
                        Check-in
                      </label>
                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="mt-2 h-11 w-full rounded-xl border border-[#ddd] bg-[#f5f5f5] px-4 text-[#333] outline-none transition focus:border-[#075f7d] focus:ring-1 focus:ring-[#075f7d]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-widest text-[#666]">
                        Check-out
                      </label>
                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="mt-2 h-11 w-full rounded-xl border border-[#ddd] bg-[#f5f5f5] px-4 text-[#333] outline-none transition focus:border-[#075f7d] focus:ring-1 focus:ring-[#075f7d]"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-widest text-[#666]">
                        Room Type
                      </label>
                      <input
                        type="text"
                        placeholder="Ocean View Suite"
                        value={roomType}
                        onChange={(e) => setRoomType(e.target.value)}
                        className="mt-2 h-11 w-full rounded-xl border border-[#ddd] bg-[#f5f5f5] px-4 text-[#333] placeholder-[#999] outline-none transition focus:border-[#075f7d] focus:ring-1 focus:ring-[#075f7d]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-widest text-[#666]">
                        Confirmation Number
                      </label>
                      <input
                        type="text"
                        placeholder="#XYZ12345"
                        value={confirmationNumber}
                        onChange={(e) => setConfirmationNumber(e.target.value)}
                        className="mt-2 h-11 w-full rounded-xl border border-[#ddd] bg-[#f5f5f5] px-4 text-[#333] placeholder-[#999] outline-none transition focus:border-[#075f7d] focus:ring-1 focus:ring-[#075f7d]"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* FLIGHT FORM */}
              {reservationType === "flight" && (
                <>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-[#666]">
                      Airline
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. British Airways"
                      value={airline}
                      onChange={(e) => setAirline(e.target.value)}
                      className="mt-2 h-11 w-full rounded-xl border border-[#ddd] bg-[#f5f5f5] px-4 text-[#333] placeholder-[#999] outline-none transition focus:border-[#075f7d] focus:ring-1 focus:ring-[#075f7d]"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-widest text-[#666]">
                        Flight Number
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. BA286"
                        value={flightNumber}
                        onChange={(e) => setFlightNumber(e.target.value)}
                        className="mt-2 h-11 w-full rounded-xl border border-[#ddd] bg-[#f5f5f5] px-4 text-[#333] placeholder-[#999] outline-none transition focus:border-[#075f7d] focus:ring-1 focus:ring-[#075f7d]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-widest text-[#666]">
                        Seat Number
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 12A"
                        value={seatNumber}
                        onChange={(e) => setSeatNumber(e.target.value)}
                        className="mt-2 h-11 w-full rounded-xl border border-[#ddd] bg-[#f5f5f5] px-4 text-[#333] placeholder-[#999] outline-none transition focus:border-[#075f7d] focus:ring-1 focus:ring-[#075f7d]"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-widest text-[#666]">
                        Departure Airport
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. LHR"
                        value={departureAirport}
                        onChange={(e) => setDepartureAirport(e.target.value)}
                        className="mt-2 h-11 w-full rounded-xl border border-[#ddd] bg-[#f5f5f5] px-4 text-[#333] placeholder-[#999] outline-none transition focus:border-[#075f7d] focus:ring-1 focus:ring-[#075f7d]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-widest text-[#666]">
                        Arrival Airport
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. HND"
                        value={arrivalAirport}
                        onChange={(e) => setArrivalAirport(e.target.value)}
                        className="mt-2 h-11 w-full rounded-xl border border-[#ddd] bg-[#f5f5f5] px-4 text-[#333] placeholder-[#999] outline-none transition focus:border-[#075f7d] focus:ring-1 focus:ring-[#075f7d]"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-widest text-[#666]">
                        Departure Time
                      </label>
                      <input
                        type="datetime-local"
                        value={departureTime}
                        onChange={(e) => setDepartureTime(e.target.value)}
                        className="mt-2 h-11 w-full rounded-xl border border-[#ddd] bg-[#f5f5f5] px-4 text-[#333] outline-none transition focus:border-[#075f7d] focus:ring-1 focus:ring-[#075f7d]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-widest text-[#666]">
                        Arrival Time
                      </label>
                      <input
                        type="datetime-local"
                        value={arrivalTime}
                        onChange={(e) => setArrivalTime(e.target.value)}
                        className="mt-2 h-11 w-full rounded-xl border border-[#ddd] bg-[#f5f5f5] px-4 text-[#333] outline-none transition focus:border-[#075f7d] focus:ring-1 focus:ring-[#075f7d]"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* ACTIVITY FORM */}
              {reservationType === "activity" && (
                <>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-[#666]">
                      Activity Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Mount Fuji Hiking"
                      value={activityName}
                      onChange={(e) => setActivityName(e.target.value)}
                      className="mt-2 h-11 w-full rounded-xl border border-[#ddd] bg-[#f5f5f5] px-4 text-[#333] placeholder-[#999] outline-none transition focus:border-[#075f7d] focus:ring-1 focus:ring-[#075f7d]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-[#666]">
                      Activity Type
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Hiking, Dining, Water Sports"
                      value={activityType}
                      onChange={(e) => setActivityType(e.target.value)}
                      className="mt-2 h-11 w-full rounded-xl border border-[#ddd] bg-[#f5f5f5] px-4 text-[#333] placeholder-[#999] outline-none transition focus:border-[#075f7d] focus:ring-1 focus:ring-[#075f7d]"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-widest text-[#666]">
                        Date
                      </label>
                      <input
                        type="date"
                        value={activityDate}
                        onChange={(e) => setActivityDate(e.target.value)}
                        className="mt-2 h-11 w-full rounded-xl border border-[#ddd] bg-[#f5f5f5] px-4 text-[#333] outline-none transition focus:border-[#075f7d] focus:ring-1 focus:ring-[#075f7d]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-widest text-[#666]">
                        Time
                      </label>
                      <input
                        type="time"
                        value={activityTime}
                        onChange={(e) => setActivityTime(e.target.value)}
                        className="mt-2 h-11 w-full rounded-xl border border-[#ddd] bg-[#f5f5f5] px-4 text-[#333] outline-none transition focus:border-[#075f7d] focus:ring-1 focus:ring-[#075f7d]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-[#666]">
                      Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Hakone"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="mt-2 h-11 w-full rounded-xl border border-[#ddd] bg-[#f5f5f5] px-4 text-[#333] placeholder-[#999] outline-none transition focus:border-[#075f7d] focus:ring-1 focus:ring-[#075f7d]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-[#666]">
                      Confirmation Number
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. #ACT67890"
                      value={activityConfirmation}
                      onChange={(e) => setActivityConfirmation(e.target.value)}
                      className="mt-2 h-11 w-full rounded-xl border border-[#ddd] bg-[#f5f5f5] px-4 text-[#333] placeholder-[#999] outline-none transition focus:border-[#075f7d] focus:ring-1 focus:ring-[#075f7d]"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Notes Section */}
          <div className="rounded-2xl bg-white p-6">
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-[#075f7d]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
              <h3 className="text-lg font-bold text-[#1a1a1a]">
                {reservationType === "hotel" && "Amenities & Special Notes"}
                {reservationType === "flight" && "Special Requests & Notes"}
                {reservationType === "activity" && "Activity Notes"}
              </h3>
            </div>
            <textarea
              placeholder={
                reservationType === "hotel"
                  ? "Request early check-in, dietary requirements for breakfast..."
                  : reservationType === "flight"
                  ? "Meal preferences, baggage info, special assistance..."
                  : "Additional notes, what to bring, special requirements..."
              }
              value={
                reservationType === "hotel"
                  ? hotelAmenities
                  : reservationType === "activity"
                  ? activityNotes
                  : ""
              }
              onChange={(e) => {
                if (reservationType === "hotel") setHotelAmenities(e.target.value);
                if (reservationType === "activity") setActivityNotes(e.target.value);
              }}
              className="mt-4 h-32 w-full rounded-xl border border-[#ddd] bg-[#f5f5f5] px-4 py-3 text-[#333] placeholder-[#999] outline-none transition focus:border-[#075f7d] focus:ring-1 focus:ring-[#075f7d]"
            />
          </div>
        </div>

        {/* Right Column - Cost Allocation & Documentation */}
        <div className="space-y-6">
          {/* Cost Allocation */}
          <div className="rounded-2xl bg-white p-6">
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-[#075f7d]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm0-10C6.48 4 2 6.49 2 9.5S6.48 15 12 15s10-2.49 10-5.5S17.52 4 12 4zm0 9c-1.93 0-3.5-1.57-3.5-3.5S10.07 6 12 6s3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
              </svg>
              <h3 className="text-lg font-bold text-[#1a1a1a]">
                Cost Allocation
              </h3>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#666]">
                  Total Amount
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xl font-semibold text-[#666]">$</span>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(e.target.value)}
                    step="0.01"
                    className="h-11 flex-1 rounded-xl border border-[#ddd] bg-[#f5f5f5] px-3 text-right text-[#333] outline-none transition focus:border-[#075f7d] focus:ring-1 focus:ring-[#075f7d]"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => setPaymentStatus("paid_in_full")}
                className={`w-full rounded-full px-4 py-2 text-sm font-semibold transition ${
                  paymentStatus === "paid_in_full"
                    ? "bg-[#f5e6d3] text-[#d17a3a]"
                    : "bg-[#f5f5f5] text-[#666] hover:bg-[#e8e8e8]"
                }`}
              >
                {paymentStatus === "paid_in_full" && "✓"} Paid in Full
              </button>

              <button
                type="button"
                onClick={() => setPaymentStatus("pending")}
                className={`w-full rounded-full px-4 py-2 text-sm font-semibold transition ${
                  paymentStatus === "pending"
                    ? "bg-[#f5e6d3] text-[#d17a3a]"
                    : "bg-[#f5f5f5] text-[#666] hover:bg-[#e8e8e8]"
                }`}
              >
                Pending
              </button>
            </div>
          </div>

          {/* Documentation */}
          <div className="rounded-2xl border-2 border-dashed border-[#ddd] p-6 text-center">
            <div className="flex justify-center">
              <div className="h-12 w-12 rounded-lg bg-[#f5f5f5] flex items-center justify-center">
                <svg
                  className="h-6 w-6 text-[#bbb]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
            <h4 className="mt-3 text-sm font-bold text-[#1a1a1a]">
              Documentation
            </h4>
            <p className="mt-1 text-xs text-[#999]">Drop PDF confirmation or image</p>
            <input
              type="file"
              onChange={(e) => setDocumentation(e.target.files?.[0] || null)}
              className="mt-4 hidden"
              id="documentation"
              accept=".pdf,.jpg,.jpeg,.png,.gif"
            />
            <label
              htmlFor="documentation"
              className="mt-3 inline-block cursor-pointer rounded-full bg-[#075f7d] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#064f68]"
            >
              Choose File
            </label>
            {documentation && (
              <p className="mt-2 text-xs text-[#666]">{documentation.name}</p>
            )}
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="mt-12 flex justify-end gap-4">
        <button
          onClick={() => cancelUrl && router.push(cancelUrl)}
          className="rounded-full border border-[#ddd] px-6 py-3 font-semibold text-[#075f7d] transition hover:bg-[#f5f5f5]"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="rounded-full bg-[#075f7d] px-6 py-3 font-semibold text-white transition hover:bg-[#064f68]"
        >
          Save Reservation
        </button>
      </div>
    </div>
  );
}
