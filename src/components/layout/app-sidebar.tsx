"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getTripById } from "@/features/trips/data";

const tripSidebarItems = [
  { segment: "dashboard", label: "Trip Dashboard", icon: TripDashboardIcon },
  { segment: "itinerary", label: "Map & Itinerary", icon: MapItineraryIcon },
  {
    segment: "reservations",
    label: "Reservations Vault",
    icon: ReservationsVaultIcon,
  },
  { segment: "budget", label: "Budget Tracker", icon: BudgetTrackerIcon },
] as const;

const settingsSidebarItems = [
  { href: "/settings", label: "Profile", icon: IconUser },
  { href: "/settings/account", label: "Account", icon: IconUserCog },
  { href: "/settings/notifications", label: "Notifications", icon: IconBell },
  { href: "/settings/appearance", label: "Appearance", icon: IconPalette },
] as const;

export function AppSidebar() {
  const pathname = usePathname();
  const tripMatch = pathname.match(/^\/trips\/([^/]+)(?:\/|$)/);
  const selectedTripId =
    tripMatch?.[1] && tripMatch[1] !== "new" ? tripMatch[1] : null;
  const selectedTrip = selectedTripId ? getTripById(selectedTripId) : undefined;
  const isSettingsPage = pathname.startsWith("/settings");
  const isTripWorkspacePage = Boolean(
    selectedTripId &&
    (pathname === `/trips/${selectedTripId}` ||
      pathname.startsWith(`/trips/${selectedTripId}/`)),
  );

  let content;

  if (isSettingsPage) {
    content = (
      <>
        <section className="rounded-3xl border border-[#d5e1e8] bg-white/90 p-4 shadow-[0_14px_28px_rgba(20,44,59,0.05)]">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#708693]">
            User Settings
          </p>
          <h2 className="mt-1 text-2xl font-black tracking-[-0.03em] text-[#1c3d4f]">
            Settings
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#617684]">
            Update your profile and preferences.
          </p>
        </section>

        <nav className="mt-6 space-y-2" aria-label="Settings navigation">
          {settingsSidebarItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                  isActive
                    ? "bg-[#e7edf2] font-semibold text-[#14445a] shadow-[0_10px_20px_rgba(20,44,59,0.06)]"
                    : "text-[#5f7683] hover:bg-[#edf4f8]"
                }`}
              >
                <item.icon />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </>
    );
  } else if (isTripWorkspacePage) {
    content = (
      <>
        <div className="rounded-3xl border border-[#d5e1e8] bg-white/90 p-4 shadow-[0_14px_28px_rgba(20,44,59,0.05)]">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#708693]">
            Active Trip
          </p>
          <p className="mt-1 text-sm font-semibold leading-snug text-[#1c3d4f]">
            {selectedTrip?.title ?? "Trip"}
          </p>

          <button
            type="button"
            className="mt-4 flex w-full items-center justify-center rounded-full bg-[#075f7d] px-4 py-3 text-sm font-semibold text-white shadow-[0_14px_26px_rgba(6,96,126,0.25)] transition hover:bg-[#064f68]"
          >
            + Quick Add
          </button>
        </div>

        <nav className="mt-6 space-y-2" aria-label="Selected trip navigation">
          {tripSidebarItems.map((item) => {
            const href = `/trips/${selectedTripId}/${item.segment}`;
            const isActive = pathname === href;

            return (
              <Link
                key={item.segment}
                href={href}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                  isActive
                    ? "bg-[#e4f3f9] font-semibold text-[#17617d] shadow-[0_10px_20px_rgba(20,44,59,0.06)]"
                    : "text-[#5f7683] hover:bg-[#edf4f8]"
                }`}
              >
                <item.icon className="size-6 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </>
    );
  } else {
    content = (
      <>
        <div className="flex items-center gap-3">
          <div
            className="size-10 rounded-full bg-[linear-gradient(150deg,#6f5136,#2f2317)]"
            aria-hidden
          />
          <div>
            <p className="text-sm font-semibold text-[#314a57]">Traveler</p>
            <p className="text-xs text-[#708692]">Premium Member</p>
          </div>
        </div>

        <Link
          href="/trips/new"
          className="mt-5 flex w-full items-center justify-center rounded-full bg-[#075f7d] px-4 py-3 text-sm font-semibold text-white shadow-[0_14px_26px_rgba(6,96,126,0.25)] transition hover:bg-[#064f68]"
        >
          Plan New Trip
        </Link>

        <section className="flex flex-1 flex-col items-center justify-center text-center">
          <p className="text-sm font-semibold text-[#476272]">
            No trip selected
          </p>
          <p className="mt-2 text-sm leading-6 text-[#7b8c97]">
            Create a trip or select one to get started.
          </p>
        </section>

        <nav
          className="mt-8 space-y-3 text-sm lg:mt-auto"
          aria-label="Bottom navigation"
        >
          <Link
            href="/settings"
            className="flex items-center gap-3 text-[#667f8d] transition hover:text-[#1c3d4f]"
          >
            <span className="inline-flex size-5 items-center justify-center text-lg">
              ⚙️
            </span>
            Settings
          </Link>
          <Link
            href="/support"
            className="flex items-center gap-3 text-[#667f8d] transition hover:text-[#1c3d4f]"
          >
            <span className="inline-flex size-5 items-center justify-center text-lg">
              ❓
            </span>
            Support
          </Link>
        </nav>
      </>
    );
  }

  return (
    <aside className="flex w-full flex-col border-b border-[#d8e3e8] px-4 pb-5 sm:px-6 lg:w-64 lg:border-b-0 lg:border-r lg:px-5 lg:pb-7">
      {content}
    </aside>
  );
}

function TripDashboardIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="3" width="6" height="8" rx="0.6" />
      <rect x="3" y="15" width="6" height="6" rx="0.6" />
      <rect x="15" y="3" width="6" height="5" rx="0.6" />
      <rect x="15" y="11" width="6" height="10" rx="0.6" />
      <path d="M13 8h2" />
      <path d="M13 16h2" />
    </svg>
  );
}

function MapItineraryIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 4.5 3 5.4V20l2-.9" />
      <path d="M5 4.5 9 6.3 15 3l4 1.6v14l-4 1.7-6-2.7-4 1.8" />
      <path d="M9 6.3V21" />
      <path d="M15 3v14.8" />
    </svg>
  );
}

function ReservationsVaultIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2H4V7Z" />
      <rect x="5" y="9" width="14" height="12" rx="1.6" />
      <path d="M10 15h4" />
    </svg>
  );
}

function BudgetTrackerIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 6.5A1.5 1.5 0 0 1 5.5 5h11A1.5 1.5 0 0 1 18 6.5v8A1.5 1.5 0 0 1 16.5 16h-11A1.5 1.5 0 0 1 4 14.5v-8Z" />
      <path d="M7 8h8" />
      <path d="M7 13h2" />
      <circle cx="13.5" cy="11.5" r="2.2" />
      <path d="M3 18h18" />
    </svg>
  );
}

function IconUser() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="8" r="3.4" />
      <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
    </svg>
  );
}

function IconUserCog() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="8" cy="8" r="3" />
      <path d="M2.5 18a5.5 5.5 0 0 1 11 0" />
      <circle cx="17.5" cy="15.5" r="2.5" />
      <path d="M17.5 12.5v1M17.5 17.5v1M20.5 15.5h-1M15.5 15.5h-1" />
    </svg>
  );
}

function IconBell() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M6 9a6 6 0 1 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </svg>
  );
}

function IconPalette() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M12 3a9 9 0 0 0 0 18h1.4a2.6 2.6 0 0 0 0-5.2H12a1.8 1.8 0 1 1 0-3.6h4.8A4.2 4.2 0 0 0 21 8a5 5 0 0 0-5-5Z" />
      <circle cx="7.5" cy="9" r="1" />
      <circle cx="10" cy="6.8" r="1" />
      <circle cx="14" cy="6.5" r="1" />
    </svg>
  );
}
