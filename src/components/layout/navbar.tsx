"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { loggedOutNavItems, siteConfig } from "@/config/site";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between gap-4 bg-white/70 px-6 py-4 sticky top-0 z-30">
      <div>
        <span className="font-headline text-2xl text-primary">
          {siteConfig.name}
        </span>
      </div>
      <nav
        aria-label="Logged-in navigation"
        className="mx-auto flex w-full max-w-md items-center justify-self-start gap-8 text-sm font-body tracking-wider"
      >
        {loggedOutNavItems.map((item) => {
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

      <div className="ml-auto flex items-center gap-4">
        <Link
          href="/login"
          aria-label="Sign in"
          className="py-2.5 px-6 bg-primary rounded-3xl text-white font-body text-base font-semibold cursor-pointer"
        >
          Sign In
        </Link>
      </div>
    </header>
  );
}
