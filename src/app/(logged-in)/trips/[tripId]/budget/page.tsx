import { getBudgetData } from "@/features/budget/data";
import { getTripById } from "@/features/trips/data";
import { SpendingByCategory } from "@/components/budget/spending-by-category";
import { BudgetHealth } from "@/components/budget/budget-health";
import { RecentTransactions } from "@/components/budget/recent-transactions";

export default async function TripBudgetPage({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) {
  const { tripId } = await params;
  const trip = getTripById(tripId);
  const budget = getBudgetData(tripId);

  if (!trip || !budget) {
    return (
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-slate-900">Budget</h2>
        <p className="text-slate-600">Trip or budget data not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Financial Snapshot</h1>
        <p className="mt-2 text-sm font-semibold uppercase text-slate-500">
          {trip.title.toUpperCase()} • {trip.dates.split(" - ")[0]}
        </p>
      </div>

      {/* Top Section: Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SpendingByCategory
          categories={budget.categories}
          totalSpent={budget.totalSpent}
        />
        <BudgetHealth
          totalBudget={budget.totalBudget}
          totalSpent={budget.totalSpent}
          budgetTrendingUnderBy={budget.budgetTrendingUnderBy}
        />
      </div>

      {/* Recent Transactions */}
      <RecentTransactions transactions={budget.transactions} />
    </div>
  );
}
