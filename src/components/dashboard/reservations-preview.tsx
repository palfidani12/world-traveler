"use client";

type ReservationStatus = "CONFIRMED" | "PENDING";

interface Reservation {
  id: string;
  name: string;
  date: string;
  type: "HOTEL" | "DINING" | "ACTIVITY";
  status: ReservationStatus;
}

interface ReservationsPreviewProps {
  reservations: Reservation[];
  totalCount: number;
}

const statusStyles = {
  CONFIRMED: "bg-green-100 text-green-700",
  PENDING: "bg-yellow-100 text-yellow-700",
};

const typeIcons = {
  HOTEL: "🏨",
  DINING: "🍽️",
  ACTIVITY: "🎯",
};

export function ReservationsPreview({
  reservations,
  totalCount,
}: ReservationsPreviewProps) {
  return (
    <div className="rounded-2xl bg-white p-6 border border-[#e2eaef]">
      <h3 className="text-xl font-bold text-[#1a3949]">Reservations</h3>

      <div className="mt-6 space-y-3">
        {reservations.map((reservation) => (
          <div
            key={reservation.id}
            className="flex items-center justify-between rounded-lg bg-[#f8fbfd] p-4"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{typeIcons[reservation.type]}</span>
              <div>
                <p className="font-semibold text-[#1a3949]">{reservation.name}</p>
                <p className="text-xs text-[#666]">{reservation.date}</p>
              </div>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                statusStyles[reservation.status]
              }`}
            >
              {reservation.status}
            </span>
          </div>
        ))}
      </div>

      <a
        href="#"
        className="mt-6 flex text-sm font-semibold text-teal-600 hover:text-teal-700 items-center gap-2"
      >
        View all {totalCount} reservations →
      </a>
    </div>
  );
}
