import { notFound } from "next/navigation";
import { getTripById } from "@/features/trips/data";
import { ItineraryMap } from "@/components/itinerary/itinerary-map";

type ItineraryChip = {
  label: string;
  active?: boolean;
};

type ItineraryActivity = {
  id: string;
  type: "TRANSPORT" | "DINING" | "ACTIVITIES";
  title: string;
  description: string;
  time: string;
  amount?: string;
  attendees?: string;
  image?: string;
};

type ItineraryDay = {
  id: string;
  dayIndex: string;
  title: string;
  dateLine: string;
  activities: ItineraryActivity[];
};

const chips: ItineraryChip[] = [
  { label: "All Items", active: true },
  { label: "Transport" },
  { label: "Activities" },
  { label: "Dining" },
];

const itineraryDays: ItineraryDay[] = [
  {
    id: "d1",
    dayIndex: "01",
    title: "Positano Arrival",
    dateLine: "Monday, June 12",
    activities: [
      {
        id: "d1-a1",
        type: "TRANSPORT",
        title: "Private Transfer from Naples",
        description: "Luxury Mercedes V-Class with scenic stop in Sorrento.",
        time: "09:30 AM",
        amount: "EUR120.00",
      },
      {
        id: "d1-a2",
        type: "DINING",
        title: "Lunch at Da Adolfo",
        description: "Beachfront seafood with boat shuttle from Positano pier.",
        time: "01:00 PM",
        image: "dining",
      },
    ],
  },
  {
    id: "d2",
    dayIndex: "02",
    title: "The Path of Gods",
    dateLine: "Tuesday, June 13",
    activities: [
      {
        id: "d2-a1",
        type: "ACTIVITIES",
        title: "Hiking: Sentiero degli Dei",
        description: "Breathtaking trail from Agerola to Nocelle. High elevation.",
        time: "08:00 AM",
        attendees: "+2 Friends Joining",
      },
    ],
  },
];

const typeClasses: Record<ItineraryActivity["type"], string> = {
  TRANSPORT: "bg-[#f6d7c8] text-[#9f5c3f]",
  DINING: "bg-[#c8f0ee] text-[#2c7c77]",
  ACTIVITIES: "bg-[#cce8f6] text-[#3f7ea3]",
};

export default async function TripItineraryPage({
  params,
}: Readonly<{
  params: Promise<{ tripId: string }>;
}>) {
  const { tripId } = await params;
  const trip = getTripById(tripId);

  if (!trip) {
    notFound();
  }

  return (
    <section className="h-[calc(100dvh-8.5rem)] overflow-hidden rounded-[1.4rem] border border-[#dbe7ee] bg-[#f3f7fb]">
      <div className="grid h-full grid-cols-1 xl:grid-cols-[56%_44%]">
        <div className="flex h-full min-h-0 flex-col px-6 pb-6 pt-6 lg:px-8">
          <div className="shrink-0">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#956f59]">Current Adventure</p>
            <h1 className="mt-2 text-5xl font-black tracking-[-0.03em] text-[#1d303d]">{trip.title.replace("Expedition", "Drift")}</h1>

            <div className="mt-6 flex flex-wrap gap-2">
              {chips.map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  className={
                    chip.active
                      ? "rounded-full bg-[#07394f] px-4 py-2 text-sm font-semibold text-white"
                      : "rounded-full bg-[#dde6ec] px-4 py-2 text-sm font-semibold text-[#2c4a5c]"
                  }
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 min-h-0 flex-1 overflow-y-auto pr-2">
            <div className="space-y-10 pb-4">
            {itineraryDays.map((day) => (
              <article key={day.id}>
                <div className="flex items-start gap-4">
                  <p className="w-10 text-[2.7rem] font-extrabold leading-[0.9] tracking-[-0.03em] text-[#cad3db]">{day.dayIndex}</p>
                  <div>
                    <h2 className="pt-2 text-[2rem] font-bold tracking-[-0.02em] text-[#1e303d]">{day.title}</h2>
                    <p className="text-sm font-semibold text-[#ab744b]">{day.dateLine}</p>
                  </div>
                </div>

                <div className="relative ml-4 mt-5 border-l border-[#d8e2e8] pl-6">
                  <div className="space-y-5">
                    {day.activities.map((activity) => (
                      <div key={activity.id} className="rounded-2xl border border-[#e2eaef] bg-white p-4 shadow-[0_1px_0_#eff4f7]">
                        <div className="flex items-start justify-between gap-4">
                          <span className={`rounded-full px-3 py-1 text-[0.65rem] font-bold tracking-[0.16em] ${typeClasses[activity.type]}`}>
                            {activity.type}
                          </span>
                          <p className="pt-1 text-sm font-semibold text-[#95a4af]">{activity.time}</p>
                        </div>

                        <div className="mt-2 flex gap-4">
                          <div className="min-w-0 flex-1">
                            <h3 className="text-2xl font-bold tracking-[-0.02em] text-[#263643]">{activity.title}</h3>
                            <p className="mt-1 text-lg text-[#677985]">{activity.description}</p>

                            {activity.amount ? (
                              <p className="mt-3 inline-flex items-center rounded-md bg-[#d6f2f2] px-3 py-1 text-sm font-bold text-[#2b7a7a]">{activity.amount}</p>
                            ) : null}

                            {activity.attendees ? (
                              <div className="mt-4 flex items-center gap-2">
                                <div className="flex -space-x-2">
                                  <span className="h-7 w-7 rounded-full border-2 border-white bg-linear-to-br from-[#2a6179] to-[#0e2d41]" />
                                  <span className="h-7 w-7 rounded-full border-2 border-white bg-linear-to-br from-[#6ac6d5] to-[#1b5f7a]" />
                                </div>
                                <p className="text-sm font-semibold text-[#5f7380]">{activity.attendees}</p>
                              </div>
                            ) : null}
                          </div>

                          {activity.image ? (
                            <div className="h-20 w-20 shrink-0 rounded-xl bg-linear-to-br from-[#5e4a3b] via-[#3b2e26] to-[#1f1712]" />
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
            </div>
          </div>
        </div>

        <div className="relative h-full overflow-hidden border-l border-[#d8e3ea]">
          <ItineraryMap />
        </div>
      </div>
    </section>
  );
}
