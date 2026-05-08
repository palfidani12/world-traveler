import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import type { NotificationPreferences } from "@/types/app";
import type { ReviewComment } from "@/types/destination";
import type { DocumentFolder } from "@/types/document";

import { db } from "@/lib/firebase/config";
import { COLLECTIONS } from "@/lib/firestore/collections";
import { createCrudRepository } from "@/lib/firestore/crud";

const documentFoldersBase = createCrudRepository<DocumentFolder>(COLLECTIONS.documentFolders);
const reviewCommentsBase = createCrudRepository<ReviewComment>(COLLECTIONS.reviewComments);
const notificationPreferencesRef = collection(db, COLLECTIONS.notificationPreferences);

export const documentFoldersRepository = {
  ...documentFoldersBase,
  listByTripId(tripId: string) {
    return documentFoldersBase.findByField("tripId", tripId);
  },
};

export const reviewCommentsRepository = {
  ...reviewCommentsBase,
  listByReviewId(reviewId: string) {
    return reviewCommentsBase.findByField("reviewId", reviewId);
  },
  listByAuthor(authorId: string) {
    return reviewCommentsBase.findByField("authorId", authorId);
  },
};

export const notificationPreferencesRepository = {
  async upsertByUserId(preferences: NotificationPreferences): Promise<void> {
    await setDoc(doc(notificationPreferencesRef, preferences.userId), preferences, { merge: true });
  },

  async getByUserId(userId: string): Promise<NotificationPreferences | null> {
    const snapshot = await getDoc(doc(notificationPreferencesRef, userId));
    if (!snapshot.exists()) return null;
    return snapshot.data() as NotificationPreferences;
  },

  async removeByUserId(userId: string): Promise<void> {
    await deleteDoc(doc(notificationPreferencesRef, userId));
  },
};
