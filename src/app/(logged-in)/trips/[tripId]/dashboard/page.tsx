import { notFound } from "next/navigation";
import { resolveTripById } from "@/lib/trips/resolve-trip";
import { DashboardHero } from "@/components/dashboard/dashboard-hero";
import { NextUpFlight } from "@/components/dashboard/next-up-flight";
import { BudgetAnalysis } from "@/components/dashboard/budget-analysis";
import { ReservationsPreview } from "@/components/dashboard/reservations-preview";

export default async function TripDashboardPage({
  params,
}: Readonly<{
  params: Promise<{ tripId: string }>;
}>) {
  const { tripId } = await params;
  const trip = await resolveTripById(tripId);

  if (!trip) {
    notFound();
  }

  // Parse destinations from trip title
  const destinations =
    tripId === "tokyo"
      ? "Tokyo • Kyoto • Sapporo"
      : "London • Paris • Amsterdam • Berlin • Prague • Vienna";

  // Next flight info
  const nextFlight =
    tripId === "tokyo"
      ? {
          flightTo: "Flight to Tokyo (HND)",
          airportCode: "HND",
          date: "October 5, 2024",
          time: "09:45 AM",
          departure: { code: "LHR", city: "London" },
          arrival: { code: "HND", city: "Tokyo" },
          terminal: "3",
          gate: "A15",
        }
      : {
          flightTo: "Flight to Paris (CDG)",
          airportCode: "CDG",
          date: "October 12, 2024",
          time: "09:45 AM",
          departure: { code: "LHR", city: "London" },
          arrival: { code: "CDG", city: "Paris" },
          terminal: "T5",
          gate: "B32",
        };

  // Sample reservations
  const sampleReservations = [
    {
      id: "1",
      name: tripId === "tokyo" ? "Aman Tokyo" : "Le Maurice Paris",
      date:
        tripId === "tokyo"
          ? "Check-in Oct 5"
          : "Check-in Oct 12",
      type: "HOTEL" as const,
      status: "CONFIRMED" as const,
    },
    {
      id: "2",
      name: tripId === "tokyo" ? "Dinner at Nabezo" : "Le Jules Verne",
      date:
        tripId === "tokyo"
          ? "Dinner Oct 6, 7:00 PM"
          : "Dinner Oct 13, 8:00 PM",
      type: "DINING" as const,
      status: "PENDING" as const,
    },
  ];

  const budgetCategories = [
    { name: "Accommodation", amount: 2100 },
    { name: "Activities", amount: 950 },
  ];

  // Background images for different trips
  const backgroundImages: Record<string, string> = {
    tokyo: "https://picsum.photos/2000/800?random=1",
    amalfi: "https://picsum.photos/2000/800?random=2",
    alpine: "https://picsum.photos/2000/800?random=3",
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <DashboardHero
        title={trip.title}
        destinations={destinations}
        startDate={trip.dates.split(" - ")[0]}
        backgroundImage={backgroundImages[tripId]}
      />

      {/* Next Up Flight & Weather */}
      <NextUpFlight
        flightTo={nextFlight.flightTo}
        airportCode={nextFlight.airportCode}
        date={nextFlight.date}
        time={nextFlight.time}
        departure={nextFlight.departure}
        arrival={nextFlight.arrival}
        terminal={nextFlight.terminal}
        gate={nextFlight.gate}
      />

      {/* Budget & Reservations */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <BudgetAnalysis
          totalBudget={trip.totalBudget}
          spent={trip.budgetUsed}
          categories={budgetCategories}
        />

        <ReservationsPreview
          reservations={sampleReservations}
          totalCount={18}
        />
      </div>
    </div>
  );
}
