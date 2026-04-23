// src/app/user-manager/page.tsx
"use client";

import { useState } from "react";
import { query, where, getDocs, addDoc } from "firebase/firestore";
import type { User } from "@/types/user";
import { usersCollection } from "@/lib/converters/user-converter";

export default function UserManager() {
  const [searchName, setSearchName] = useState("");
  const [fetchedUser, setFetchedUser] = useState<User | null>(null);
  const [searchStatus, setSearchStatus] = useState("");

  const [newFirstName, setNewFirstName] = useState("");
  const [newAge, setNewAge] = useState<number | "">("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearchStatus("Searching...");
    setFetchedUser(null);

    try {
      const q = query(usersCollection, where("firstName", "==", searchName));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setSearchStatus("No user found with that name.");
        return;
      }

      const doc = querySnapshot.docs[0];
      const user = doc.data();

      setFetchedUser(user);
      setSearchStatus("");
    } catch (error) {
      console.error(error);
      setSearchStatus("Error searching database.");
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAge) return;

    try {
      const newUser: User = {
        firstName: newFirstName,
        lastName: "Unknown",
        age: Number(newAge),
        email: "",
        role: "user",
      };

      const docRef = await addDoc(usersCollection, newUser);
      alert(`User created successfully with ID: ${docRef.id}`);

      setNewFirstName("");
      setNewAge("");
    } catch (error) {
      console.error(error);
      alert("Failed to create user.");
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-12 p-8 text-black">
      <section className="rounded-lg bg-gray-100 p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-bold">Create New User</h2>
        <form onSubmit={handleCreate} className="flex items-end gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold">First Name</label>
            <input
              type="text"
              value={newFirstName}
              onChange={(e) => setNewFirstName(e.target.value)}
              className="w-48 rounded border p-2"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold">Age</label>
            <input
              type="number"
              value={newAge}
              onChange={(e) => setNewAge(e.target.value ? Number(e.target.value) : "")}
              className="w-24 rounded border p-2"
              required
            />
          </div>
          <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            Create User
          </button>
        </form>
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-bold">Find User by Name</h2>
        <form onSubmit={handleSearch} className="flex gap-4">
          <input
            type="text"
            placeholder="Enter exact first name..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="flex-1 rounded border p-2"
            required
          />
          <button type="submit" className="rounded bg-gray-800 px-6 py-2 text-white hover:bg-gray-900">
            Search
          </button>
        </form>

        <div className="mt-6 min-h-25">
          {searchStatus && <p className="italic text-gray-500">{searchStatus}</p>}

          {fetchedUser && (
            <div className="space-y-1 rounded border border-green-200 bg-green-50 p-4 text-sm">
              <p>
                <strong>ID:</strong> {fetchedUser.id}
              </p>
              <p>
                <strong>Name:</strong> {fetchedUser.firstName} {fetchedUser.lastName}
              </p>
              <p>
                <strong>Age:</strong> {fetchedUser.age}
              </p>
              <p>
                <strong>Role:</strong> {fetchedUser.role}
              </p>
              <p>
                <strong>Email:</strong> {fetchedUser.email}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
