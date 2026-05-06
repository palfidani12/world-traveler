export type TransactionCategory = "FOOD" | "LODGING" | "TRANSPORT" | "FUN" | "OTHER";

export type Transaction = {
  id: string;
  description: string;
  location: string;
  date: string;
  amount: number;
  category: TransactionCategory;
};

export type BudgetCategory = {
  name: TransactionCategory;
  label: string;
  percentage: number;
  color: string;
  amount: number;
};

export type BudgetData = {
  tripId: string;
  totalBudget: number;
  totalSpent: number;
  categories: BudgetCategory[];
  transactions: Transaction[];
  budgetTrendingUnderBy?: {
    category: string;
    percentage: number;
  };
};
