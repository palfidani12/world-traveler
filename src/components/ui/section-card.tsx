import type { ReactNode } from "react";

export function SectionCard({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow: string;
  children: ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-panel-border bg-panel p-5 shadow-[0_12px_30px_rgba(21,32,30,0.04)]">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-muted">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-lg font-semibold text-text">{title}</h2>
      <div className="mt-3 text-sm leading-6 text-text-muted">{children}</div>
    </article>
  );
}
