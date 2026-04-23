export type TripStatus = "active" | "confirmed" | "drafting" | "completed";

export type TripItem = {
  id: string;
  title: string;
  dates: string;
  progress: number;
  status: TripStatus;
  theme: string;
  footer?: string;
  destination: string;
  budgetUsed: number;
  totalBudget: number;
  stops: number;
  reservations: number;
};

export const trips: TripItem[] = [
  {
    id: "amalfi",
    title: "Amalfi Coast Expedition",
    dates: "Sep 12 - Sep 20, 2024",
    progress: 85,
    status: "active",
    theme: "from-sky-400 via-blue-500 to-cyan-700",
    destination: "Amalfi Coast, Italy",
    budgetUsed: 3900,
    totalBudget: 5000,
    stops: 7,
    reservations: 5,
  },
  {
    id: "tokyo",
    title: "Tokyo City Lights",
    dates: "Oct 05 - Oct 14, 2024",
    progress: 40,
    status: "confirmed",
    theme: "from-slate-900 via-fuchsia-950 to-slate-800",
    destination: "Tokyo, Japan",
    budgetUsed: 2100,
    totalBudget: 6200,
    stops: 4,
    reservations: 3,
  },
  {
    id: "alpine",
    title: "Alpine Retreat",
    dates: "Dec 22 - Dec 30, 2024",
    progress: 15,
    status: "drafting",
    theme: "from-sky-500 via-blue-900 to-stone-900",
    destination: "Patagonia, Argentina",
    budgetUsed: 1200,
    totalBudget: 7000,
    stops: 2,
    reservations: 1,
  },
  {
    id: "venice",
    title: "Venice Biennale 2023",
    dates: "Aug 04 - Aug 12, 2023",
    progress: 100,
    status: "completed",
    theme: "from-sky-300 via-amber-100 to-cyan-700",
    footer: "Memories saved",
    destination: "Venice, Italy",
    budgetUsed: 4300,
    totalBudget: 4300,
    stops: 9,
    reservations: 6,
  },
];

export function getTripById(tripId: string) {
  return trips.find((trip) => trip.id === tripId);
}
