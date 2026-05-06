"use client";

interface BudgetHealthProps {
  totalBudget: number;
  totalSpent: number;
  budgetTrendingUnderBy?: {
    category: string;
    percentage: number;
  };
}

export function BudgetHealth({
  totalBudget,
  totalSpent,
  budgetTrendingUnderBy,
}: BudgetHealthProps) {
  const percentageSpent = Math.round((totalSpent / totalBudget) * 100);
  const remaining = totalBudget - totalSpent;

  return (
    <div className="rounded-lg bg-white p-6">
      <h3 className="text-lg font-semibold text-slate-700">Budget Health</h3>

      <div className="mt-6 space-y-6">
        {/* Current Spend Progress */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600">
              Current Spend
            </span>
            <span className="text-sm font-semibold text-slate-900">
              {percentageSpent}%
            </span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full bg-blue-900 transition-all duration-300"
              style={{ width: `${percentageSpent}%` }}
            />
          </div>
        </div>

        {/* Budget and Remaining */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase text-slate-500">
              Budget
            </p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              ${totalBudget.toLocaleString()}
            </p>
          </div>
          <div className="rounded-lg bg-green-50 p-4">
            <p className="text-xs font-semibold uppercase text-green-600">
              Remaining
            </p>
            <p className="mt-2 text-2xl font-bold text-green-700">
              ${remaining.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Trending Alert */}
        {budgetTrendingUnderBy && (
          <div className="flex gap-3 rounded-lg bg-orange-50 p-4">
            <div className="shrink-0 text-xl">📈</div>
            <p className="text-sm text-orange-800">
              You're trending {budgetTrendingUnderBy.percentage}% under budget
              for {budgetTrendingUnderBy.category}. Great work!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
