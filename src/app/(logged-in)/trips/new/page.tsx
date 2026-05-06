"use client";

import { useState } from "react";

export default function NewTripPage() {
  const [tripName, setTripName] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const inspirationTags = ["Japan 2024", "Coastal Italy", "Icelandic Road"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="max-w-4xl">
        <h1 className="text-4xl font-bold tracking-tight text-[#1a1a1a] sm:text-5xl">Start Your Next Chapter</h1>
        <p className="mt-4 text-lg text-[#5d7380]">
          Every great journey begins with a single detail. Tell us where your curiosity is leading you next.
        </p>
      </div>

      {/* Form Layout */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column - Form */}
        <div className="lg:col-span-2 space-y-8">
          {/* 01. The Identity */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#ff8c42]">01. THE IDENTITY</p>
            <label className="mt-3 block">
              <h2 className="text-2xl font-bold text-[#1a1a1a]">What's the name of this adventure?</h2>
              <input
                type="text"
                placeholder="e.g., Summer Solstice in Santorini"
                value={tripName}
                onChange={(e) => setTripName(e.target.value)}
                className="mt-4 h-12 w-full rounded-xl border border-[#e0e0e0] bg-white px-4 text-[#29404f] placeholder-[#bbb] outline-none transition focus:border-[#075f7d] focus:ring-1 focus:ring-[#075f7d]"
              />
            </label>
          </div>

          {/* 02 & 03. Destination & Timeline */}
          <div className="grid gap-8 md:grid-cols-2">
            {/* 02. The Destination */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#ff8c42]">02. THE DESTINATION</p>
              <label className="mt-3 block">
                <h3 className="text-lg font-semibold text-[#1a1a1a]">Where to?</h3>
                <div className="mt-3 flex items-center border border-[#e0e0e0] rounded-xl bg-white px-4 py-3 transition focus-within:border-[#075f7d] focus-within:ring-1 focus-within:ring-[#075f7d]">
                  <svg className="w-5 h-5 text-[#bbb]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Enter city or country"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="ml-3 flex-1 bg-transparent text-[#29404f] placeholder-[#bbb] outline-none"
                  />
                </div>
              </label>
            </div>

            {/* 03. The Timeline */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#ff8c42]">03. THE TIMELINE</p>
              <label className="mt-3 block">
                <h3 className="text-lg font-semibold text-[#1a1a1a]">When are you going?</h3>
                <div className="mt-3 flex items-center gap-3">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="h-12 flex-1 rounded-xl border border-[#e0e0e0] bg-white px-4 text-[#29404f] outline-none transition focus:border-[#075f7d] focus:ring-1 focus:ring-[#075f7d]"
                  />
                  <span className="text-[#bbb]">→</span>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="h-12 flex-1 rounded-xl border border-[#e0e0e0] bg-white px-4 text-[#29404f] outline-none transition focus:border-[#075f7d] focus:ring-1 focus:ring-[#075f7d]"
                  />
                </div>
              </label>
            </div>
          </div>

          {/* Initialize Itinerary Button */}
          <button
            type="button"
            className="w-full rounded-full bg-[#075f7d] py-4 text-lg font-semibold text-white transition hover:bg-[#064f68] flex items-center justify-center gap-2"
          >
            Initialize Itinerary
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>

          {/* Inspiration Section */}
          <div className="pt-4">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#999]">INSPIRATION:</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {inspirationTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className="rounded-full border border-[#ddd] px-4 py-2 text-sm font-medium text-[#546974] transition hover:border-[#075f7d] hover:bg-[#075f7d]/5"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Visual Identity & Tips */}
        <div className="space-y-6">
          {/* Visual Identity Card */}
          <div className="rounded-2xl bg-[#f5f5f5] p-6 flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white">
              <svg className="w-8 h-8 text-[#075f7d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#1a1a1a]">Visual Identity</h3>
            <p className="mt-2 text-sm text-[#666]">Define the mood of your journey with a cover image.</p>
            <button
              type="button"
              className="mt-4 rounded-full bg-[#075f7d] px-6 py-2 text-sm font-semibold text-white transition hover:bg-[#064f68]"
            >
              UPLOAD PHOTO
            </button>
          </div>

          {/* Wayfarer Pro-Tip */}
          <div className="rounded-2xl bg-white border border-[#e0e0e0] p-5">
            <div className="flex gap-3">
              <div className="shrink-0">
                <svg className="w-5 h-5 text-[#075f7d]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1a1a1a]">Wayfarer Pro-Tip</h4>
                <p className="mt-1 text-xs text-[#666]">Don't worry about being too specific yet. You can adjust your dates and add multiple destinations later in the planner.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
