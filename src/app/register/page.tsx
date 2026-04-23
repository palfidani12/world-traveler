"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { createServerSession } from "@/lib/auth/client-session";
import { getFirebaseAuthErrorMessage } from "@/lib/auth/firebase-error-message";

export default function RegisterPage() {
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
      const credentials = await createUserWithEmailAndPassword(auth, email, password);
      await createServerSession(credentials.user);
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      setErrorMessage(getFirebaseAuthErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#b9cad1_0%,#d7d6cc_48%,#ede4d6_100%)] px-4 py-5 sm:px-6 sm:py-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(255,255,255,0.75),transparent_36%),linear-gradient(180deg,rgba(18,36,43,0.06),rgba(18,36,43,0))]" />

      <div className="relative mx-auto flex min-h-[calc(100vh-2.5rem)] w-full max-w-140 items-center justify-center">
        <section className="w-full rounded-[22px] border border-white/70 bg-white px-5 py-8 shadow-[0_24px_70px_rgba(40,61,68,0.18)] sm:px-10 sm:py-11">
          <div className="mx-auto flex max-w-105 flex-col items-center text-center">
            <div className="mb-5 h-16 w-full rounded-[18px] bg-[linear-gradient(180deg,rgba(214,232,236,0.28),rgba(173,193,200,0.08))]" aria-hidden />
            <h1 className="text-[2.15rem] font-black tracking-[-0.03em] text-[#083b53] sm:text-[2.5rem]">
              Join Atlas Horizon
            </h1>
            <p className="mt-3 text-lg text-[#414c57]">
              Create your account and start planning your next trip.
            </p>

            <form onSubmit={handleSubmit} className="mt-9 w-full text-left">
              <div className="space-y-6">
                <label className="block">
                  <span className="block text-sm font-bold uppercase tracking-[0.03em] text-[#4a525a]">
                    Email Address
                  </span>
                  <div className="mt-2 flex items-center gap-3 rounded-2xl border border-[#e3e6ea] bg-white px-4 py-3.5 shadow-[0_1px_0_rgba(14,32,44,0.02)] focus-within:border-[#c6d3dc] focus-within:ring-2 focus-within:ring-[#0b546f]/10">
                    <MailIcon />
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                      placeholder="name@example.com"
                      className="w-full bg-transparent text-[1.03rem] font-medium text-[#5b6671] outline-none placeholder:text-[#8d98a3]"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="block text-sm font-bold uppercase tracking-[0.03em] text-[#4a525a]">
                    Password
                  </span>
                  <div className="mt-2 flex items-center gap-3 rounded-2xl border border-[#e3e6ea] bg-white px-4 py-3.5 shadow-[0_1px_0_rgba(14,32,44,0.02)] focus-within:border-[#c6d3dc] focus-within:ring-2 focus-within:ring-[#0b546f]/10">
                    <LockIcon />
                    <input
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                      minLength={6}
                      placeholder="••••••••"
                      className="w-full bg-transparent text-[1.03rem] font-medium tracking-[0.22em] text-[#5b6671] outline-none placeholder:tracking-[0.22em] placeholder:text-[#8d98a3]"
                    />
                  </div>
                </label>

                {errorMessage ? (
                  <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {errorMessage}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-3 rounded-full bg-[linear-gradient(180deg,#063f58_0%,#0a556f_100%)] px-6 py-4 text-xl font-bold text-white shadow-[0_18px_28px_rgba(8,68,90,0.28)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Creating account..." : "Create Account"}
                  <ArrowIcon />
                </button>
              </div>
            </form>

            <div className="mt-10 h-px w-full bg-[#edf0f2]" aria-hidden />

            <p className="mt-6 text-base text-[#4a525a]">
              Already have an account?{" "}
              <Link href="/login" className="font-bold text-[#083b53] hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6 shrink-0 text-[#7a8088]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6 shrink-0 text-[#7a8088]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="5" y="10" width="14" height="10" rx="2" />
      <path d="M8 10V8a4 4 0 0 1 8 0v2" />
      <path d="M12 14v2" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6 shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h13" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}
