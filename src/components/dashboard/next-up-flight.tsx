"use client";

interface NextUpFlightProps {
  flightTo: string;
  airportCode: string;
  date: string;
  time: string;
  departure: {
    code: string;
    city: string;
  };
  arrival: {
    code: string;
    city: string;
  };
  terminal?: string;
  gate?: string;
}

export function NextUpFlight({
  flightTo,
  airportCode,
  date,
  time,
  departure,
  arrival,
  terminal,
  gate,
}: NextUpFlightProps) {
  return (
    <div className="flex flex-col gap-6 sm:flex-row">
      {/* Flight Info */}
      <div className="flex-1 rounded-2xl bg-white p-6 border border-[#e2eaef]">
        <p className="text-xs font-semibold uppercase text-[#666] tracking-[0.15em]">Next Up</p>

        <h3 className="mt-3 text-2xl font-bold text-[#1a3949]">{flightTo}</h3>

        <p className="mt-1 text-sm text-[#666]">
          {date} • {time}
        </p>

        <div className="mt-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-4xl font-bold text-[#1a3949]">{departure.code}</p>
            <p className="mt-1 text-sm text-[#666]">{departure.city}</p>
          </div>

          <div className="text-2xl text-[#ccc]">✈️</div>

          <div>
            <p className="text-4xl font-bold text-[#1a3949]">{arrival.code}</p>
            <p className="mt-1 text-sm text-[#666]">{arrival.city}</p>
          </div>
        </div>

        {(terminal || gate) && (
          <div className="mt-6 flex gap-6 text-sm">
            {terminal && (
              <div>
                <p className="uppercase text-[#999] text-xs font-semibold">Terminal</p>
                <p className="mt-1 font-bold text-[#1a3949]">{terminal}</p>
              </div>
            )}
            {gate && (
              <div>
                <p className="uppercase text-[#999] text-xs font-semibold">Gate</p>
                <p className="mt-1 font-bold text-[#1a3949]">{gate}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Weather Panel */}
      <div className="w-full rounded-2xl bg-linear-to-br from-teal-600 to-teal-800 p-6 sm:w-72 text-white">
        <p className="text-xs font-semibold uppercase text-teal-100 tracking-[0.15em]">
          Destination Weather
        </p>

        <h3 className="mt-3 text-2xl font-bold">{arrival.city}, {arrival.code === "CDG" ? "France" : "JP"}</h3>

        <div className="mt-6 flex items-center gap-4">
          <p className="text-5xl font-bold">19°</p>
          <div className="text-5xl">☁️</div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-teal-50">
          Light showers expected. Pack a light trench coat.
        </p>

        <div className="mt-6 grid grid-cols-4 gap-2 text-xs">
          <div className="text-center">
            <p className="font-semibold text-teal-100">TUE</p>
            <p className="mt-1 font-bold">21°</p>
          </div>
          <div className="text-center">
            <p className="font-semibold text-teal-100">WED</p>
            <p className="mt-1 font-bold">18°</p>
          </div>
          <div className="text-center">
            <p className="font-semibold text-teal-100">THU</p>
            <p className="mt-1 font-bold">19°</p>
          </div>
          <div className="text-center">
            <p className="font-semibold text-teal-100">FRI</p>
            <p className="mt-1 font-bold">22°</p>
          </div>
        </div>
      </div>
    </div>
  );
}
