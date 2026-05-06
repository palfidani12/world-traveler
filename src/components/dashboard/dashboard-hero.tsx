"use client";

import { CountdownTimer } from "./countdown-timer";

interface DashboardHeroProps {
  title: string;
  destinations: string;
  startDate: string;
  backgroundImage?: string;
}

export function DashboardHero({
  title,
  destinations,
  startDate,
  backgroundImage,
}: DashboardHeroProps) {
  return (
    <div className="relative overflow-hidden rounded-[1.4rem] border border-[#dbe7ee]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: backgroundImage
            ? `url(${backgroundImage})`
            : "url('https://picsum.photos/2000/800?random=0')",
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.5))]" />

      {/* Content */}
      <div className="relative z-10 px-6 py-8 sm:px-8 sm:py-10">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="flex-1">
            <p className="inline-block rounded-full bg-[#7dd3d3]/30 px-4 py-1 text-xs font-semibold uppercase text-white tracking-[0.15em]">
              Upcoming Adventure
            </p>

            <h1 className="mt-4 text-5xl font-black leading-tight text-white tracking-[-0.03em] sm:text-6xl">
              {title.replace(" Expedition", "")}
            </h1>

            <p className="mt-3 text-lg font-semibold text-white/90">{destinations}</p>
          </div>

          <div className="w-full sm:w-auto">
            <CountdownTimer startDate={startDate} />
          </div>
        </div>
      </div>
    </div>
  );
}
