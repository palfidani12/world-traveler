import type { Metadata } from "next";

type TripStatus = "active" | "confirmed" | "drafting" | "completed";

type TripItem = {
  id: string;
  title: string;
  dates: string;
  progress: number;
  status: TripStatus;
  theme: string;
  footer?: string;
};

const trips: TripItem[] = [
  {
    id: "amalfi",
    title: "Amalfi Coast Expedition",
    dates: "Sep 12 - Sep 20, 2024",
    progress: 85,
    status: "active",
    theme: "from-sky-400 via-blue-500 to-cyan-700",
  },
  {
    id: "tokyo",
    title: "Tokyo City Lights",
    dates: "Oct 05 - Oct 14, 2024",
    progress: 40,
    status: "confirmed",
    theme: "from-slate-900 via-fuchsia-950 to-slate-800",
  },
  {
    id: "alpine",
    title: "Alpine Retreat",
    dates: "Dec 22 - Dec 30, 2024",
    progress: 15,
    status: "drafting",
    theme: "from-sky-500 via-blue-900 to-stone-900",
  },
  {
    id: "venice",
    title: "Venice Biennale 2023",
    dates: "Aug 04 - Aug 12, 2023",
    progress: 100,
    status: "completed",
    theme: "from-sky-300 via-amber-100 to-cyan-700",
    footer: "Memories saved",
  },
];

const statusStyles: Record<TripStatus, string> = {
  active: "bg-cyan-100 text-cyan-800",
  confirmed: "bg-amber-100 text-amber-800",
  drafting: "bg-slate-200 text-slate-700",
  completed: "bg-emerald-100 text-emerald-800",
};

export const metadata: Metadata = {
  title: "My Trips",
  description: "Curated escapes and planned expeditions.",
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

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        <article className="flex min-h-80 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#c8d5dc] bg-white/70 p-8 text-center">
          <span className="mb-6 inline-flex size-12 items-center justify-center rounded-full bg-[#edf4f8] text-3xl text-[#4a6778]">
            +
          </span>
          <h2 className="text-3xl font-semibold tracking-[-0.01em] text-[#1d2e39]">Create New Trip</h2>
          <p className="mt-3 max-w-[18ch] text-sm leading-6 text-[#6f8794]">
            Start designing your next curator-approved journey.
          </p>
        </article>

        {trips.map((trip) => (
          <article
            key={trip.id}
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
                <button
                  type="button"
                  aria-label={`Trip options for ${trip.title}`}
                  className="mt-1 text-2xl leading-none text-[#4f6875]"
                >
                  ⋮
                </button>
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
          </article>
        ))}
      </div>

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
