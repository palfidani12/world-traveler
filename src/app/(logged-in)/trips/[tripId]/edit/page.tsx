import { notFound } from "next/navigation";
import { getTripById } from "@/features/trips/data";

export default async function TripEditPage({
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
    <>
      <h2 className="text-3xl font-bold text-[#20323e]">Edit Trip Basics</h2>
      <p className="mt-2 text-[#607582]">Update destination, dates, and budget assumptions for this trip.</p>

      <form className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-[#546974]">Trip name</span>
          <input
            type="text"
            defaultValue={trip.title}
            className="mt-2 h-11 w-full rounded-xl border border-[#dfe7ec] bg-[#fafcfd] px-4 text-[#29404f] outline-none"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-[#546974]">Destination</span>
          <input
            type="text"
            defaultValue={trip.destination}
            className="mt-2 h-11 w-full rounded-xl border border-[#dfe7ec] bg-[#fafcfd] px-4 text-[#29404f] outline-none"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-[#546974]">Travel dates</span>
          <input
            type="text"
            defaultValue={trip.dates}
            className="mt-2 h-11 w-full rounded-xl border border-[#dfe7ec] bg-[#fafcfd] px-4 text-[#29404f] outline-none"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-[#546974]">Budget ceiling</span>
          <input
            type="number"
            defaultValue={trip.totalBudget}
            className="mt-2 h-11 w-full rounded-xl border border-[#dfe7ec] bg-[#fafcfd] px-4 text-[#29404f] outline-none"
          />
        </label>

        <div className="sm:col-span-2 mt-3 flex justify-end">
          <button
            type="button"
            className="rounded-full bg-[#075f7d] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#064f68]"
          >
            Save Trip Basics
          </button>
        </div>
      </form>
    </>
  );
}
