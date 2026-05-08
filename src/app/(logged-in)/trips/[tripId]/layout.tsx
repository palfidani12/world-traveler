import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { resolveTripById } from "@/lib/trips/resolve-trip";

export const metadata: Metadata = {
  title: "Trip Workspace",
  description: "Manage a specific trip and all related planning sections.",
};

export default async function TripWorkspaceLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ tripId: string }>;
}>) {
  const { tripId } = await params;
  const trip = await resolveTripById(tripId);

  if (!trip) {
    notFound();
  }

  return (
    <section className="mt-8">
      <div className="rounded-3xl border border-[#dce5ea] bg-white p-6 shadow-[0_10px_30px_rgba(25,49,64,0.08)] sm:p-8">
        {children}
      </div>
    </section>
  );
}
