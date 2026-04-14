// lib/firebase.ts (or wherever you define your db)
import { collection, DocumentData, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";
import type { User } from "@/types/user";
import { db } from "../config";

// 1. Create the converter
const userConverter = {
  // Intercepts data right before it goes TO the database
  toFirestore: (userData: User): DocumentData => {
    return {
      firstName: userData.firstName,
      lastName: userData.lastName,
      age: userData.age,
      email: userData.email,
      role: userData.role || "user", // You can even set defaults here!
    };
  },
  
  // Intercepts data right after it comes FROM the database
  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): User => {
    const data = snapshot.data(options);
    return {
      firstName: data.firstName,
      lastName: data.lastName,
      age: data.age,
      email: data.email,
      role: data.role,
    };
  }
};

// 2. Export a pre-typed collection reference
export const usersCollection = collection(db, "users").withConverter(userConverter);