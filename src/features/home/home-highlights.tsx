import { SectionCard } from "@/components/ui/section-card";
import Link from "next/link";

export function HomeHighlights() {
  return (
    <section className="mt-14 grid gap-4 sm:grid-cols-2">
      <SectionCard eyebrow="Next Step" title="Create your first feature module">
        Put trip, destination, or itinerary code in <span className="font-medium text-text">src/features</span>.
      </SectionCard>
      <SectionCard eyebrow="Structure" title="Keep shared UI small and reusable">
        Put buttons, cards, and primitives in <span className="font-medium text-text">src/components/ui</span>.
      </SectionCard>
      <SectionCard eyebrow="Routes" title="Inspect the sample pages">
        <div className="flex flex-wrap gap-3">
          <Link className="font-medium text-text underline decoration-text-muted underline-offset-4" href="/trips">
            Trips
          </Link>
          <Link className="font-medium text-text underline decoration-text-muted underline-offset-4" href="/destinations">
            Destinations
          </Link>
        </div>
      </SectionCard>
    </section>
  );
}
