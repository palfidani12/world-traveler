"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const sidebarItems: SidebarItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <IconGrid />,
  },
  {
    label: "My Trips",
    href: "/trips",
    icon: <IconBook />,
  },
  {
    label: "Explore",
    href: "/destinations",
    icon: <IconCompass />,
  },
  {
    label: "Settings",
    href: "/example",
    icon: <IconCog />,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full border-b border-[#d8e3e8] px-4 py-5 sm:px-6 lg:w-64 lg:border-b-0 lg:border-r lg:px-5 lg:py-7">
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

      <nav className="mt-8 space-y-1" aria-label="Sidebar navigation">
        {sidebarItems.map((item) => (
          <Link
            key={item.label}
            className={pathname === item.href
              ? "flex items-center gap-3 rounded-xl bg-[#dff4fb] px-3 py-2 text-sm font-semibold text-[#1a6c89]"
              : "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-[#5d7481]"}
            href={item.href}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="mt-10 flex gap-3 text-sm text-[#667f8d] lg:mt-48">
        <span className="inline-flex size-5 items-center justify-center rounded-full border border-[#bfd0da]">?</span>
        Help
      </div>
      <div className="mt-3 flex gap-3 text-sm text-[#667f8d]">
        <span className="inline-flex size-5 items-center justify-center rounded-full border border-[#bfd0da]">↩</span>
        Logout
      </div>
    </aside>
  );
}

function IconGrid() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function IconBook() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H20v17H7.5A2.5 2.5 0 0 0 5 22z" />
      <path d="M5 5v17" />
    </svg>
  );
}

function IconCompass() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <path d="m9 15 2-6 6-2-2 6-6 2Z" />
    </svg>
  );
}

function IconCog() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="3.2" />
      <path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a1.7 1.7 0 0 1-2.4 2.4l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a1.7 1.7 0 1 1-3.4 0v-.2a1 1 0 0 0-.6-.9 1 1 0 0 0-1.1.2l-.1.1a1.7 1.7 0 0 1-2.4-2.4l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H4a1.7 1.7 0 1 1 0-3.4h.2a1 1 0 0 0 .9-.6 1 1 0 0 0-.2-1.1l-.1-.1a1.7 1.7 0 0 1 2.4-2.4l.1.1a1 1 0 0 0 1.1.2h.1a1 1 0 0 0 .6-.9V4a1.7 1.7 0 1 1 3.4 0v.2a1 1 0 0 0 .6.9 1 1 0 0 0 1.1-.2l.1-.1a1.7 1.7 0 1 1 2.4 2.4l-.1.1a1 1 0 0 0-.2 1.1v.1a1 1 0 0 0 .9.6H20a1.7 1.7 0 1 1 0 3.4h-.2a1 1 0 0 0-.9.6z" />
    </svg>
  );
}