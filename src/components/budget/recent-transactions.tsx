"use client";

import { Transaction, TransactionCategory } from "@/features/budget/types";

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const categoryColors: Record<TransactionCategory, string> = {
  FOOD: "bg-orange-100 text-orange-700",
  LODGING: "bg-blue-100 text-blue-700",
  TRANSPORT: "bg-gray-100 text-gray-700",
  FUN: "bg-cyan-100 text-cyan-700",
  OTHER: "bg-slate-100 text-slate-700",
};

const categoryIcons: Record<TransactionCategory, string> = {
  FOOD: "🍽️",
  LODGING: "🏨",
  TRANSPORT: "🚐",
  FUN: "🎉",
  OTHER: "💳",
};

export function RecentTransactions({
  transactions,
}: RecentTransactionsProps) {
  return (
    <div className="rounded-lg bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-700">
          Recent Transactions
        </h3>
        <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
          View All Statement
        </a>
      </div>

      <div className="space-y-4">
        {transactions.map((txn) => (
          <div
            key={txn.id}
            className="flex items-center justify-between rounded-lg border border-slate-200 p-4 hover:bg-slate-50"
          >
            <div className="flex items-center gap-4">
              <div className="text-xl">
                {categoryIcons[txn.category] || categoryIcons.OTHER}
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-900">
                  {txn.description}
                </p>
                <p className="text-sm text-slate-500">
                  {txn.location} • {txn.date}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-right font-semibold text-slate-900">
                ${txn.amount.toFixed(2)}
              </p>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  categoryColors[txn.category] || categoryColors.OTHER
                }`}
              >
                {txn.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
