export type TransactionCategory = "FOOD" | "LODGING" | "TRANSPORT" | "ACTIVITIES" | "SHOPPING" | "ENTERTAINMENT" | "OTHER";
export type TransactionType = "EXPENSE" | "INCOME" | "TRANSFER";

export type Transaction = {
  id: string;
  tripId: string;
  description: string;
  location?: string;
  date: string; // ISO 8601
  amount: number;
  currency: string;
  category: TransactionCategory;
  type: TransactionType;
  paymentMethod?: "CASH" | "CARD" | "BANK_TRANSFER" | "MOBILE_PAYMENT" | "OTHER";
  receipt?: string; // URL or file path
  tags?: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type BudgetCategory = {
  name: TransactionCategory;
  label: string;
  percentage: number; // Percentage of total budget
  color: string; // Hex color
  amount: number; // Allocated amount
  spent: number; // Amount spent so far
  remaining: number; // Amount remaining
};

export type BudgetData = {
  tripId: string;
  totalBudget: number;
  totalSpent: number;
  totalRemaining: number;
  currency: string;
  categories: BudgetCategory[];
  transactions: Transaction[];
  
  // Analytics
  percentageSpent: number;
  averageDailySpend?: number;
  estimatedTotalSpend?: number;
  budgetTrendingUnderBy?: {
    category: string;
    percentage: number;
  };
  budgetTrendingOverBy?: {
    category: string;
    percentage: number;
  };
  
  // Metadata
  createdAt: string;
  updatedAt: string;
};

export type BudgetAlert = {
  id: string;
  tripId: string;
  type: "OVER_BUDGET" | "OVER_CATEGORY" | "APPROACHING_LIMIT" | "SUSPICIOUS_SPEND";
  category?: TransactionCategory;
  message: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  createdAt: string;
  read: boolean;
};

export type BudgetReport = {
  tripId: string;
  startDate: string;
  endDate: string;
  
  // Summary
  totalBudgeted: number;
  totalSpent: number;
  totalRemaining: number;
  percentageUtilized: number;
  
  // By Category
  categoryBreakdown: BudgetCategory[];
  
  // Trends
  dailyAverageSpend: number;
  estimatedFinalSpend: number;
  projectedBudgetStatus: "UNDER" | "ON_TRACK" | "OVER";
  
  // Top Expenses
  topExpenses: Transaction[];
  
  // Comparisons
  dayByDaySpending?: {
    date: string;
    amount: number;
  }[];
  
  currency: string;
  generatedAt: string;
};
