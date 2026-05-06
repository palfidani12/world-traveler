"use client";

interface BudgetAnalysisProps {
  totalBudget: number;
  spent: number;
  categories: {
    name: string;
    amount: number;
  }[];
}

export function BudgetAnalysis({
  totalBudget,
  spent,
  categories,
}: BudgetAnalysisProps) {
  const percentSpent = Math.round((spent / totalBudget) * 100);

  return (
    <div className="rounded-2xl bg-white p-6 border border-[#e2eaef]">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-[#1a3949]">Budget Analysis</h3>
        <p className="rounded-full bg-red-100 px-4 py-2 text-sm font-bold text-red-700">
          ${spent.toLocaleString()} Total
        </p>
      </div>

      <div className="mt-6">
        <p className="text-sm font-semibold text-[#666]">Funds Spent</p>
        <p className="mt-1 text-3xl font-bold text-[#1a3949]">
          ${spent.toLocaleString()} ({percentSpent}%)
        </p>

        <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-[#e8eef3]">
          <div
            className="h-full bg-[#07394f] transition-all duration-300"
            style={{ width: `${percentSpent}%` }}
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {categories.map((category) => (
          <div key={category.name} className="rounded-lg bg-[#f8fbfd] p-4">
            <p className="text-sm font-semibold text-[#666]">{category.name}</p>
            <p className="mt-2 text-2xl font-bold text-[#1a3949]">
              ${category.amount.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
