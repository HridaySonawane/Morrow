import type { ReactNode } from "react";

export function PageIntro({
  eyebrow,
  title,
  accent,
  copy,
  actions,
  note,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  copy: string;
  actions?: ReactNode;
  note?: string;
}) {
  return (
    <section className="interior-hero">
      <div className="interior-hero-glow" aria-hidden="true" />
      <div className="page-container interior-hero-content">
        <div className="announcement-pill"><span className="announcement-dot" />{eyebrow}</div>
        <h1>{title}<br /><span>{accent}</span></h1>
        <p>{copy}</p>
        {actions && <div className="interior-hero-actions">{actions}</div>}
        {note && <div className="interior-hero-note">{note}</div>}
      </div>
    </section>
  );
}
