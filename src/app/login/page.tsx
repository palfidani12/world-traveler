"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { createServerSession } from "@/lib/auth/client-session";
import { getFirebaseAuthErrorMessage } from "@/lib/auth/firebase-error-message";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const credentials = await signInWithEmailAndPassword(auth, email, password);
      await createServerSession(credentials.user);

      const nextPath = new URLSearchParams(window.location.search).get("next");
      const redirectPath = nextPath?.startsWith("/") ? nextPath : "/dashboard";
      router.push(redirectPath);
      router.refresh();
    } catch (error) {
      setErrorMessage(getFirebaseAuthErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-20 sm:px-10">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-panel-border bg-panel p-6 shadow-[0_12px_30px_rgba(21,32,30,0.04)]">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-muted">Account</p>
        <h1 className="mt-4 text-3xl font-semibold">Login</h1>
        <p className="mt-3 text-sm text-text-muted">Access your travel plans and saved destinations.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <label className="flex flex-col gap-2 text-sm font-medium">
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="rounded-lg border border-panel-border bg-white px-3 py-2 outline-none transition-colors focus:border-text"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={6}
              className="rounded-lg border border-panel-border bg-white px-3 py-2 outline-none transition-colors focus:border-text"
            />
          </label>

          {errorMessage ? (
            <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{errorMessage}</p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-text px-4 py-2 font-semibold text-bg transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="mt-5 text-sm text-text-muted">
          No account yet?{" "}
          <Link href="/register" className="font-semibold text-text hover:underline">
            Create one
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
