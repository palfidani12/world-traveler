export type Trip = {
  id: string;
  destination: string;
  season: string;
  status: "planned" | "in-progress" | "completed";
  description: string;
};

export const trips: Trip[] = [
  {
    id: "kyoto-spring",
    destination: "Kyoto, Japan",
    season: "Spring 2026",
    status: "planned",
    description: "A slow trip for temples, gardens, and early morning markets.",
  },
  {
    id: "lisbon-workation",
    destination: "Lisbon, Portugal",
    season: "Autumn 2026",
    status: "in-progress",
    description: "Base for remote work, neighborhood walks, and day trips.",
  },
  {
    id: "patagonia-trek",
    destination: "Patagonia",
    season: "Winter 2027",
    status: "completed",
    description: "A long-form hiking route across dramatic southern landscapes.",
  },
];
