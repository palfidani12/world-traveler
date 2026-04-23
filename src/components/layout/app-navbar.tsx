"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";
import { useAuth } from "@/hooks/use-auth";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/trips", label: "Trips" },
  { href: "/example", label: "Example" },
] as const;

export function AppNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-30 border-b border-panel-border/70 bg-panel/80 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
        <Link href="/" className="text-sm font-semibold uppercase tracking-[0.16em]">
          {siteConfig.name}
        </Link>
        <div className="flex items-center gap-6">
          <nav aria-label="Main navigation" className="flex items-center gap-5 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors hover:text-text ${pathname === item.href ? "text-text" : "text-text-muted"}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {isLoading ? (
            <span className="text-sm text-text-muted">...</span>
          ) : user ? (
            <div className="flex items-center gap-3">
              <span className="hidden text-xs text-text-muted sm:block">{user.email}</span>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-md border border-panel-border px-3 py-1.5 text-sm font-semibold text-text transition-colors hover:bg-bg"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-md bg-text px-3 py-1.5 text-sm font-semibold text-bg transition-opacity hover:opacity-90"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
