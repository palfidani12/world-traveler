"use client";

import { CircleMarker, MapContainer, Polyline, TileLayer, Tooltip, useMap } from "react-leaflet";

const NAPLES: [number, number] = [40.8518, 14.2681];
const POSITANO: [number, number] = [40.6281, 14.4849];
const AMALFI: [number, number] = [40.634, 14.6027];
const ROUTE_POINTS: [number, number][] = [NAPLES, POSITANO, AMALFI];
const MAP_CENTER: [number, number] = [40.69, 14.45];

function MapControls() {
  const map = useMap();

  return (
    <>
      <div className="absolute right-6 top-6 z-1000 flex w-16 flex-col overflow-hidden rounded-2xl border border-white/35 bg-white/80 backdrop-blur">
        <button
          type="button"
          aria-label="Zoom in"
          onClick={() => map.zoomIn()}
          className="px-4 py-3 text-4xl font-semibold text-[#1f3b4a]"
        >
          +
        </button>
        <button
          type="button"
          aria-label="Zoom out"
          onClick={() => map.zoomOut()}
          className="border-t border-[#d7e2e8] px-4 py-3 text-4xl font-semibold text-[#1f3b4a]"
        >
          -
        </button>
      </div>

      <button
        type="button"
        aria-label="Center map on Positano"
        onClick={() => map.flyTo(POSITANO, 12, { duration: 0.8 })}
        className="absolute right-6 top-40 z-1000 rounded-2xl border border-white/40 bg-white/80 px-4 py-3 text-2xl text-[#1a3949] backdrop-blur"
      >
        ◎
      </button>

      <button
        type="button"
        onClick={() => map.flyTo(POSITANO, 12, { duration: 0.8 })}
        className="absolute right-6 top-56 z-1000 rounded-full bg-[#476772]/90 px-5 py-2 text-sm font-semibold text-[#e8f1f6]"
      >
        Positano
      </button>
    </>
  );
}

export function ItineraryMap() {
  return (
    <div className="relative h-full w-full">
      <MapContainer
        bounds={[NAPLES, AMALFI]}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <Polyline
          positions={ROUTE_POINTS}
          pathOptions={{
            color: "#2b566f",
            opacity: 0.85,
            weight: 4,
            dashArray: "9 9",
          }}
        />

        <CircleMarker center={NAPLES} radius={6} pathOptions={{ color: "#113347", fillColor: "#113347", fillOpacity: 1 }}>
          <Tooltip
            permanent
            direction="top"
            offset={[0, -8]}
            className="rounded-xl! border-4! border-[#113347]! bg-white! px-5! py-3! text-base! font-bold! text-[#2f4c5d]! shadow-lg!"
          >
            Naples
          </Tooltip>
        </CircleMarker>

        <CircleMarker center={POSITANO} radius={8} pathOptions={{ color: "#0e2d41", fillColor: "#0e2d41", fillOpacity: 1 }} />
        <CircleMarker center={AMALFI} radius={7} pathOptions={{ color: "#0f445c", fillColor: "#0f445c", fillOpacity: 1 }}>
          <Tooltip permanent direction="bottom" className="rounded-full! border-none! bg-[#0f445c]! px-3! py-1! text-xs! font-semibold! text-[#e6f2f7]!">
            Amalfi
          </Tooltip>
        </CircleMarker>

        <MapControls />
      </MapContainer>

      <div className="pointer-events-none absolute bottom-6 left-1/2 z-1000 w-[85%] max-w-md -translate-x-1/2 rounded-3xl bg-[#0f445c]/92 p-5 text-white shadow-2xl backdrop-blur">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9ec2d1]">Next Stop</p>
        <div className="mt-2 flex items-center justify-between">
          <div>
            <p className="text-4xl font-black leading-none">Amalfi</p>
            <p className="mt-1 text-3xl font-semibold text-[#dae9f0]">Cathedral</p>
          </div>
          <p className="border-l border-white/30 pl-4 text-4xl font-bold">14:00</p>
        </div>
      </div>
    </div>
  );
}