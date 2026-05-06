"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
  startDate: string;
}

export function CountdownTimer({ startDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    mins: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date(startDate).getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          mins: Math.floor((difference / 1000 / 60) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [startDate]);

  return (
    <div className="flex gap-6 rounded-2xl bg-[#0f445c]/70 px-6 py-4 backdrop-blur">
      <div className="text-center">
        <p className="text-3xl font-bold text-white">{String(timeLeft.days).padStart(2, "0")}</p>
        <p className="text-xs font-semibold uppercase text-[#a8c8d8] tracking-wider">Days</p>
      </div>
      <div className="text-center">
        <p className="text-3xl font-bold text-white">{String(timeLeft.hours).padStart(2, "0")}</p>
        <p className="text-xs font-semibold uppercase text-[#a8c8d8] tracking-wider">Hours</p>
      </div>
      <div className="text-center">
        <p className="text-3xl font-bold text-white">{String(timeLeft.mins).padStart(2, "0")}</p>
        <p className="text-xs font-semibold uppercase text-[#a8c8d8] tracking-wider">Mins</p>
      </div>
    </div>
  );
}
