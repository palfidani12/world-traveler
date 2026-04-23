"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type TripSubnavProps = {
  tripId: string;
};

const tripSections = [
  { segment: "dashboard", label: "Dashboard" },
  { segment: "reservations", label: "Reservations" },
  { segment: "budget", label: "Budget" },
  { segment: "itinerary", label: "Itinerary" },
  { segment: "stops", label: "Stops" },
  { segment: "documents", label: "Documents" },
  { segment: "edit", label: "Edit Trip" },
] as const;

export function TripSubnav({ tripId }: TripSubnavProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Trip sections" className="mt-4 flex flex-wrap gap-2">
      {tripSections.map((section) => {
        const href = `/trips/${tripId}/${section.segment}`;
        const isActive = pathname === href;

        return (
          <Link
            key={section.segment}
            href={href}
            className={isActive
              ? "rounded-full bg-[#075f7d] px-4 py-2 text-sm font-semibold text-white"
              : "rounded-full border border-[#d6e1e7] bg-white px-4 py-2 text-sm font-medium text-[#4f6573] transition hover:border-[#b8cad5] hover:text-[#1d475a]"}
          >
            {section.label}
          </Link>
        );
      })}
    </nav>
  );
}
