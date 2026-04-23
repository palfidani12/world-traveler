import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Trip",
  description: "Create a new trip plan.",
};

export default function NewTripPage() {
  return (
    <section className="mt-8 rounded-3xl border border-[#dce5ea] bg-white p-6 shadow-[0_12px_35px_rgba(26,49,64,0.08)] sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6b818f]">Trip setup</p>
      <h1 className="mt-3 text-4xl font-bold tracking-[-0.02em] text-[#1d2f3a]">Create a new trip</h1>
      <p className="mt-3 max-w-2xl text-lg text-[#5d7380]">
        Start with basics now and refine details later in the trip workspace.
      </p>

      <form className="mt-8 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-[#546974]">Trip name</span>
          <input
            type="text"
            placeholder="Spring in Lisbon"
            className="mt-2 h-11 w-full rounded-xl border border-[#dfe7ec] bg-[#fafcfd] px-4 text-[#29404f] outline-none"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-[#546974]">Destination</span>
          <input
            type="text"
            placeholder="Lisbon, Portugal"
            className="mt-2 h-11 w-full rounded-xl border border-[#dfe7ec] bg-[#fafcfd] px-4 text-[#29404f] outline-none"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-[#546974]">Start date</span>
          <input
            type="date"
            className="mt-2 h-11 w-full rounded-xl border border-[#dfe7ec] bg-[#fafcfd] px-4 text-[#29404f] outline-none"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-[#546974]">End date</span>
          <input
            type="date"
            className="mt-2 h-11 w-full rounded-xl border border-[#dfe7ec] bg-[#fafcfd] px-4 text-[#29404f] outline-none"
          />
        </label>

        <div className="sm:col-span-2 mt-3 flex justify-end">
          <button
            type="button"
            className="rounded-full bg-[#075f7d] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#064f68]"
          >
            Create Trip Workspace
          </button>
        </div>
      </form>
    </section>
  );
}
