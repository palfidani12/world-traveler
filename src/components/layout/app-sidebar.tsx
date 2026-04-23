"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getTripById } from "@/features/trips/data";

const tripSidebarItems = [
  { segment: "dashboard", label: "Dashboard" },
  { segment: "reservations", label: "Reservations" },
  { segment: "budget", label: "Budget" },
  { segment: "itinerary", label: "Itinerary" },
  { segment: "stops", label: "Stops" },
  { segment: "documents", label: "Documents" },
  { segment: "edit", label: "Edit Trip" },
] as const;

export function AppSidebar() {
  const pathname = usePathname();
  const tripMatch = pathname.match(/^\/trips\/([^/]+)(?:\/|$)/);
  const selectedTripId = tripMatch?.[1] && tripMatch[1] !== "new" ? tripMatch[1] : null;
  const selectedTrip = selectedTripId ? getTripById(selectedTripId) : undefined;

  return (
    <aside className="flex w-full flex-col border-b border-[#d8e3e8] px-4 py-5 sm:px-6 lg:w-64 lg:border-b-0 lg:border-r lg:px-5 lg:py-7">
      <p className="text-xl font-semibold text-[#19536f]">The Global Curator</p>

      <div className="mt-8 flex items-center gap-3">
        <div className="size-10 rounded-full bg-[linear-gradient(150deg,#6f5136,#2f2317)]" aria-hidden />
        <div>
          <p className="text-sm font-semibold text-[#314a57]">Traveler</p>
          <p className="text-xs text-[#708692]">Premium Member</p>
        </div>
      </div>

      <button
        type="button"
        className="mt-5 w-full rounded-full bg-[#075f7d] px-4 py-3 text-sm font-semibold text-white shadow-[0_14px_26px_rgba(6,96,126,0.25)] transition hover:bg-[#064f68]"
      >
        Plan New Trip
      </button>

      {selectedTrip ? (
        <section className="mt-8 rounded-2xl border border-[#d5e1e8] bg-white/85 p-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#708693]">Selected trip</p>
          <p className="mt-1 text-sm font-semibold leading-snug text-[#1c3d4f]">{selectedTrip.title}</p>

          <nav className="mt-3 space-y-1" aria-label="Selected trip navigation">
            {tripSidebarItems.map((item) => {
              const href = `/trips/${selectedTrip.id}/${item.segment}`;
              const isActive = pathname === href;

              return (
                <Link
                  key={item.segment}
                  href={href}
                  className={isActive
                    ? "block rounded-lg bg-[#e4f3f9] px-3 py-1.5 text-xs font-semibold text-[#17617d]"
                    : "block rounded-lg px-3 py-1.5 text-xs font-medium text-[#5f7683] transition hover:bg-[#edf4f8]"}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </section>
      ) : null}

      <div className="mt-10 space-y-3 text-sm text-[#667f8d] lg:mt-auto">
        <div className="flex gap-3">
          <span className="inline-flex size-5 items-center justify-center rounded-full border border-[#bfd0da]">?</span>
          Help
        </div>
        <div className="flex gap-3">
          <span className="inline-flex size-5 items-center justify-center rounded-full border border-[#bfd0da]">↩</span>
          Logout
        </div>
      </div>
    </aside>
  );
}