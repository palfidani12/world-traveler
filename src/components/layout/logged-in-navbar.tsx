"use client";

import { loggedInNavItems, siteConfig } from "@/config/site";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function LoggedInNavbar() {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between gap-4 bg-white/70 px-6 py-4 sticky top-0 z-30">
      <div className="flex items-center gap-24 flex-1 min-w-0">
        <span className="font-headline text-2xl text-primary whitespace-nowrap shrink-0">
          {siteConfig.name}
        </span>
        <nav
          aria-label="Logged-in navigation"
          className="flex items-center gap-8 text-sm font-body tracking-wider"
        >
          {loggedInNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition ${
                  isActive
                    ? "text-primary font-bold border-b-2 border-primary pb-1"
                    : "text-neutral hover:text-primary pb-1"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="ml-auto flex items-center gap-4">
        <div onClick={() => {}}>
          <IconBell />
        </div>
        <div onClick={() => {}}>
          <IconUser />
        </div>
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
