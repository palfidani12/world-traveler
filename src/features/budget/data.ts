import { BudgetData } from "./types";

export const amalfiCoastBudget: BudgetData = {
  tripId: "amalfi",
  totalBudget: 7000,
  totalSpent: 4850,
  categories: [
    {
      name: "TRANSPORT",
      label: "Transport",
      percentage: 35,
      color: "#001a33",
      amount: 1697.5,
    },
    {
      name: "LODGING",
      label: "Lodging",
      percentage: 40,
      color: "#1a5f6f",
      amount: 1940,
    },
    {
      name: "FOOD",
      label: "Food",
      percentage: 15,
      color: "#6b4423",
      amount: 727.5,
    },
    {
      name: "FUN",
      label: "Entertainment",
      percentage: 10,
      color: "#7dd3d3",
      amount: 485,
    },
  ],
  transactions: [
    {
      id: "txn-1",
      description: "Dinner at Da Paolino",
      location: "Capri, Italy",
      date: "June 14, 2024",
      amount: 248.0,
      category: "FOOD",
    },
    {
      id: "txn-2",
      description: "Private Boat Charter",
      location: "Positano Pier",
      date: "June 13, 2024",
      amount: 1200.0,
      category: "FUN",
    },
    {
      id: "txn-3",
      description: "Le Sirenuse Deposit",
      location: "Positano",
      date: "June 12, 2024",
      amount: 3402.15,
      category: "LODGING",
    },
    {
      id: "txn-4",
      description: "Private Transfer from Naples",
      location: "NAP Airport",
      date: "June 12, 2024",
      amount: 180.0,
      category: "TRANSPORT",
    },
  ],
  budgetTrendingUnderBy: {
    category: "Lodging",
    percentage: 12,
  },
};

export function getBudgetData(tripId: string): BudgetData | undefined {
  if (tripId === "amalfi") {
    return amalfiCoastBudget;
  }
  return undefined;
}
