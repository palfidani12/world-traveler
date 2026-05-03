export const siteConfig = {
  name: "World Traveler",
  description: "Plan, track, and explore destinations around the world.",
} as const;

export const loggedOutNavItems = [{ href: "/", label: "HOME" }] as const;

export const loggedInNavItems = [
  { href: "/dashboard", label: "Overview" },
  { href: "/trips", label: "My Trips" },
  { href: "/settings", label: "Settings" },
] as const;
