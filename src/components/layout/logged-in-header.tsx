"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/trips", label: "My Trips" },
  { href: "/destinations", label: "Explore" },
  { href: "/example", label: "Settings" },
] as const;

export function LoggedInHeader() {
  const pathname = usePathname();

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#d8e3e8] pb-4">
      <nav
        aria-label="Logged-in navigation"
        className="mx-auto flex w-full max-w-md items-center justify-between text-sm font-semibold text-[#6f8492]"
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={pathname === item.href
              ? "text-[#205f79] underline decoration-2 underline-offset-[7px]"
              : "transition hover:text-[#2d4250]"}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-4 text-[#4b6675]">
        <button type="button" aria-label="Alerts">
          <IconBell />
        </button>
        <button type="button" aria-label="Profile">
          <IconUser />
        </button>
      </div>
    </header>
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

function IconUser() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="8" r="3.8" />
      <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
    </svg>
  );
}
