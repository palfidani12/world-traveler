"use client";

import { useEffect, useState } from "react";

import type { BudgetData, Transaction } from "@/features/budget/types";
import { budgetRepository, transactionsRepository } from "@/lib/firestore";

type TransactionsManagerProps = {
  tripId: string;
};

export function TransactionsManager({ tripId }: TransactionsManagerProps) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<Transaction["category"]>("OTHER");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const loadTransactions = async () => {
    try {
      const items = await transactionsRepository.listByTripId(tripId);
      setTransactions(items.sort((a, b) => b.date.localeCompare(a.date)));
    } catch (error) {
      console.error(error);
      setMessage("Failed to load transactions.");
    }
  };

  useEffect(() => {
    void loadTransactions();
  }, [tripId]);

  const handleAddTransaction = async () => {
    if (!description.trim() || !amount || !date) {
      setMessage("Please provide description, amount, and date.");
      return;
    }

    setIsSaving(true);
    setMessage(null);

    try {
      const now = new Date().toISOString();
      const transactionAmount = Number(amount);

      const transaction: Transaction = {
        id: `txn-${Date.now()}`,
        tripId,
        description: description.trim(),
        location: location.trim() || undefined,
        date,
        amount: transactionAmount,
        currency: "USD",
        category,
        type: "EXPENSE",
        paymentMethod: "CARD",
        createdAt: now,
        updatedAt: now,
      };

      await transactionsRepository.create(transaction);

      const budget = await budgetRepository.getByTripId(tripId);
      if (budget) {
        const totalSpent = budget.totalSpent + transactionAmount;
        await budgetRepository.upsertByTripId({
          ...budget,
          totalSpent,
          totalRemaining: Math.max(0, budget.totalBudget - totalSpent),
          percentageSpent:
            budget.totalBudget > 0
              ? Number(((totalSpent / budget.totalBudget) * 100).toFixed(2))
              : 0,
          updatedAt: now,
        });
      } else {
        const initialBudget: BudgetData = {
          tripId,
          totalBudget: 0,
          totalSpent: transactionAmount,
          totalRemaining: 0,
          currency: "USD",
          categories: [],
          transactions: [transaction],
          percentageSpent: 0,
          createdAt: now,
          updatedAt: now,
        };

        await budgetRepository.upsertByTripId(initialBudget);
      }

      setDescription("");
      setAmount("");
      setDate("");
      setLocation("");
      setCategory("OTHER");
      setMessage("Transaction saved.");
      await loadTransactions();
    } catch (error) {
      console.error(error);
      setMessage("Failed to save transaction.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="rounded-lg bg-white p-6">
      <h3 className="text-lg font-semibold text-slate-900">Add Transaction</h3>

      <div className="mt-4 grid gap-3 md:grid-cols-5">
        <input
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Description"
          className="h-10 rounded-lg border border-slate-200 px-3 text-sm"
        />
        <input
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          placeholder="Amount"
          type="number"
          className="h-10 rounded-lg border border-slate-200 px-3 text-sm"
        />
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value as Transaction["category"])}
          className="h-10 rounded-lg border border-slate-200 px-3 text-sm"
        >
          <option value="FOOD">Food</option>
          <option value="LODGING">Lodging</option>
          <option value="TRANSPORT">Transport</option>
          <option value="ACTIVITIES">Activities</option>
          <option value="SHOPPING">Shopping</option>
          <option value="ENTERTAINMENT">Entertainment</option>
          <option value="OTHER">Other</option>
        </select>
        <input
          value={date}
          onChange={(event) => setDate(event.target.value)}
          type="date"
          className="h-10 rounded-lg border border-slate-200 px-3 text-sm"
        />
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Location"
          className="h-10 rounded-lg border border-slate-200 px-3 text-sm"
        />
      </div>

      <button
        type="button"
        onClick={handleAddTransaction}
        disabled={isSaving}
        className="mt-4 rounded-full bg-[#075f7d] px-4 py-2 text-sm font-semibold text-white"
      >
        {isSaving ? "Saving..." : "Add Transaction"}
      </button>

      {message && <p className="mt-2 text-sm text-slate-600">{message}</p>}

      <div className="mt-5 space-y-2">
        <h4 className="text-sm font-semibold uppercase text-slate-500">Saved Transactions</h4>
        {transactions.length === 0 && <p className="text-sm text-slate-500">No transactions yet.</p>}
        {transactions.map((item) => (
          <div key={item.id} className="rounded-md border border-slate-200 px-3 py-2 text-sm">
            <p className="font-medium text-slate-800">{item.description}</p>
            <p className="text-slate-600">
              ${item.amount.toFixed(2)} • {item.category} • {item.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
