import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";

import type { BudgetAlert, BudgetData, BudgetReport, Transaction } from "@/features/budget/types";

import { db } from "@/lib/firebase/config";
import { COLLECTIONS } from "@/lib/firestore/collections";
import { createCrudRepository } from "@/lib/firestore/crud";

type StoredBudgetReport = BudgetReport & {
  id: string;
};

const transactionsBase = createCrudRepository<Transaction>(COLLECTIONS.transactions);
const alertsBase = createCrudRepository<BudgetAlert>(COLLECTIONS.budgetAlerts);
const reportsBase = createCrudRepository<StoredBudgetReport>(COLLECTIONS.budgetReports);

const budgetsCollectionRef = collection(db, COLLECTIONS.budgets);

export const budgetRepository = {
  async upsertByTripId(budget: BudgetData) {
    await setDoc(doc(budgetsCollectionRef, budget.tripId), budget, { merge: true });
  },

  async getByTripId(tripId: string): Promise<BudgetData | null> {
    const snapshot = await getDoc(doc(budgetsCollectionRef, tripId));
    if (!snapshot.exists()) return null;
    return snapshot.data() as BudgetData;
  },

  async list(): Promise<BudgetData[]> {
    const snapshot = await getDocs(budgetsCollectionRef);
    return snapshot.docs.map((docSnapshot) => docSnapshot.data() as BudgetData);
  },

  async removeByTripId(tripId: string): Promise<void> {
    await deleteDoc(doc(budgetsCollectionRef, tripId));
  },
};

export const transactionsRepository = {
  ...transactionsBase,
  listByTripId(tripId: string) {
    return transactionsBase.findByField("tripId", tripId);
  },
};

export const budgetAlertsRepository = {
  ...alertsBase,
  listByTripId(tripId: string) {
    return alertsBase.findByField("tripId", tripId);
  },
};

export const budgetReportsRepository = {
  ...reportsBase,
  async createForTrip(report: BudgetReport): Promise<StoredBudgetReport> {
    const reportId = `${report.tripId}_${report.startDate}_${report.endDate}`;
    return reportsBase.create({
      ...report,
      id: reportId,
    });
  },
  listByTripId(tripId: string) {
    return reportsBase.findByField("tripId", tripId);
  },
};
