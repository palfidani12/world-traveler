import type { User } from "firebase/auth";

export async function createServerSession(user: User) {
  const idToken = await user.getIdToken(true);

  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
    body: JSON.stringify({ idToken }),
  });

  if (!response.ok) {
    throw new Error("Failed to establish secure server session.");
  }
}

export async function clearServerSession() {
  await fetch("/api/logout", {
    method: "POST",
    credentials: "same-origin",
  });
}
