import { siteConfig } from "@/config/site";

export function HomeHero() {
  return (
    <header className="max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
        Base structure ready
      </p>
      <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl">
        {siteConfig.name}
      </h1>
      <p className="mt-5 text-lg text-text-muted">
        Template code removed. You now have a clean and scalable Next.js 16 setup.
      </p>
    </header>
  );
}
