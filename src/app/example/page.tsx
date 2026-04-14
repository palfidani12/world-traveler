// src/app/user-manager/page.tsx
"use client"

import { useState } from "react";
import { query, where, getDocs, addDoc } from "firebase/firestore";
import type { User } from "@/types/user";
import { usersCollection } from "@/lib/converters/user-converter";

export default function UserManager() {
  // --- State for Searching ---
  const [searchName, setSearchName] = useState("");
  const [fetchedUser, setFetchedUser] = useState<User | null>(null);
  const [searchStatus, setSearchStatus] = useState("");

  // --- State for Creating ---
  const [newFirstName, setNewFirstName] = useState("");
  const [newAge, setNewAge] = useState<number | "">("");

  // 1. READ: Fetching a user by name
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearchStatus("Searching...");
    setFetchedUser(null);

    try {
      // Create a query against the typed collection
      const q = query(usersCollection, where("firstName", "==", searchName));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setSearchStatus("No user found with that name.");
        return;
      }

      // Grab the first matched document
      const doc = querySnapshot.docs[0];
      
      // MAGIC: Because of the converter, doc.data() is strictly typed as 'User'
      // It even has the 'id' attached to it!
      const user = doc.data(); 
      
      setFetchedUser(user);
      setSearchStatus("");
    } catch (error) {
      console.error(error);
      setSearchStatus("Error searching database.");
    }
  };

  // 2. WRITE: Creating a new user
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAge) return;

    try {
      // MAGIC: If you forget 'lastName' or 'isActive', TypeScript will throw an error here.
      const newUser: User = {
        firstName: newFirstName,
        lastName: "Unknown", // Just a placeholder for this demo
        age: Number(newAge),
        email: "", // Placeholder for email
        role: "user"
      };

      const docRef = await addDoc(usersCollection, newUser);
      alert(`User created successfully with ID: ${docRef.id}`);
      
      // Reset form
      setNewFirstName("");
      setNewAge("");
    } catch (error) {
      console.error(error);
      alert("Failed to create user.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 space-y-12 text-black">
      
      {/* --- CREATE SECTION --- */}
      <section className="bg-gray-100 p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-4">Create New User</h2>
        <form onSubmit={handleCreate} className="flex gap-4 items-end">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold">First Name</label>
            <input 
              type="text" 
              value={newFirstName} 
              onChange={(e) => setNewFirstName(e.target.value)} 
              className="border p-2 rounded w-48"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold">Age</label>
            <input 
              type="number" 
              value={newAge} 
              onChange={(e) => setNewAge(e.target.value ? Number(e.target.value) : "")} 
              className="border p-2 rounded w-24"
              required
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Create User
          </button>
        </form>
      </section>

      {/* --- SEARCH SECTION --- */}
      <section className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-4">Find User by Name</h2>
        <form onSubmit={handleSearch} className="flex gap-4">
          <input 
            type="text" 
            placeholder="Enter exact first name..."
            value={searchName} 
            onChange={(e) => setSearchName(e.target.value)} 
            className="border p-2 rounded flex-1"
            required
          />
          <button type="submit" className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900">
            Search
          </button>
        </form>

        {/* Display Status or Results */}
        <div className="mt-6 min-h-[100px]">
          {searchStatus && <p className="text-gray-500 italic">{searchStatus}</p>}
          
          {fetchedUser && (
            <div className="bg-green-50 border border-green-200 p-4 rounded text-sm space-y-1">
              <p><strong>ID:</strong> {fetchedUser.id}</p>
              <p><strong>Name:</strong> {fetchedUser.firstName} {fetchedUser.lastName}</p>
              <p><strong>Age:</strong> {fetchedUser.age}</p>
              <p><strong>Role:</strong> {fetchedUser.role}</p>
              <p><strong>Email:</strong> {fetchedUser.email}</p>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}