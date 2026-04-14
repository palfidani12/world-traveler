import { HomeHighlights } from "@/features/home/home-highlights";
import { HomeHero } from "@/features/home/home-hero";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-20 sm:px-10">
      <HomeHero />
      <HomeHighlights />
    </main>
  );
}
