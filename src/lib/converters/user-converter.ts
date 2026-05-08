// lib/firebase.ts (or wherever you define your db)
import { collection, DocumentData, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";
import type { User } from "@/types/user";
import { db } from "../firebase/config";

// 1. Create the converter
const userConverter = {
  // Intercepts data right before it goes TO the database
  toFirestore: (userData: User): DocumentData => {
    return {
      id: userData.id,
      email: userData.email,
      emailVerified: userData.emailVerified || false,
      profile: userData.profile,
      role: userData.role || "user",
      plan: userData.plan || "free",
      friendIds: userData.friendIds || [],
      blockedUserIds: userData.blockedUserIds || [],
      preferences: userData.preferences,
      settings: userData.settings,
      firstName: userData.firstName,
      lastName: userData.lastName,
      age: userData.age,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
    };
  },
  
  // Intercepts data right after it comes FROM the database
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): User => {
    const data = snapshot.data(options);
    return {
      id: data.id,
      email: data.email,
      emailVerified: data.emailVerified || false,
      profile: data.profile,
      role: data.role || "user",
      plan: data.plan || "free",
      friendIds: data.friendIds || [],
      blockedUserIds: data.blockedUserIds || [],
      preferences: data.preferences,
      settings: data.settings,
      firstName: data.firstName,
      lastName: data.lastName,
      age: data.age,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
};

// 2. Export a pre-typed collection reference
export const usersCollection = collection(db, "users").withConverter(userConverter);