import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Compass, Sparkles, Target, Zap } from "lucide-react";
import { MarketingShell } from "@/components/marketing-shell";
import { WorkflowSwitcher } from "@/components/workflow-switcher";

export const metadata: Metadata = {
  title: "How it works — Morrow",
  description: "A natural rhythm for planning, doing, and learning together.",
};

const rhythm = [
  { icon: Target, number: "01", label: "PLAN", title: "Choose what matters", copy: "Bring the team's goals into view. Make priorities clear enough that everyone can see where their attention belongs." },
  { icon: Zap, number: "02", label: "MOVE", title: "Keep momentum close", copy: "Turn direction into practical next steps. Give every handoff an owner and every decision a place to live." },
  { icon: Sparkles, number: "03", label: "LEARN", title: "Make space to learn", copy: "Notice what's moving and what isn't. Carry the useful lessons into the next week instead of starting over." },
];

export default function HowItWorksPage() {
  return (
    <MarketingShell>
      <main className="how-page">
        <section className="rhythm-hero">
          <div className="rhythm-hero-grid" aria-hidden="true" />
          <div className="page-container rhythm-hero-layout">
            <div className="rhythm-hero-copy">
              <div className="rhythm-hero-index"><span>THE MORROW METHOD</span><span>01 — 03</span></div>
              <h1>A clear process<br />keeps work <em>moving.</em></h1>
              <p>Good work happens in stages: set a direction, make the next step clear, then carry what you learn into the next cycle.</p>
              <div className="rhythm-hero-actions"><Link className="button button-primary" href="/dashboard">Explore the workspace <ArrowUpRight size={15} /></Link><a className="rhythm-text-link" href="#the-rhythm">Follow the rhythm <ArrowRight size={14} /></a></div>
              <div className="rhythm-hero-footnote"><span className="rhythm-footnote-line" /> PLAN · MOVE · LEARN</div>
            </div>
            <div className="rhythm-track" aria-label="The three steps in the Morrow workflow">
              <div className="rhythm-track-line" />
              {rhythm.map((step, index) => { const Icon = step.icon; const state = index === 0 ? "START HERE" : index === 1 ? "KEEP GOING" : "CARRY IT FORWARD"; return <div className={`rhythm-track-step rhythm-track-step-${index + 1}`} key={step.number}><span className="rhythm-track-number">{step.number}</span><span className="rhythm-track-icon"><Icon size={18} /></span><span className="rhythm-track-text"><small>{step.label}</small><strong>{step.title}</strong><small className="rhythm-track-state">{state}</small></span></div>; })}
              <div className="rhythm-track-end"><span /><small>REPEAT, WITH MORE CLARITY</small></div>
            </div>
          </div>
        </section>

        <section className="workflow-section section-pad interior-workflow-section" id="the-rhythm">
          <div className="page-container">
            <div className="workflow-heading"><p className="eyebrow">SEE THE METHOD IN MOTION / 01</p><h2>Three simple movements.<br /><span>One steadier team.</span></h2><p>Move through the tabs to see how Morrow gives each part of the workday a little more room.</p></div>
            <WorkflowSwitcher />
          </div>
        </section>

        <section className="rhythm-section section-pad">
          <div className="page-container">
            <div className="rhythm-section-heading"><div><p className="eyebrow">BUILT TO FEEL SIMPLE / 02</p><h2>Good work isn't a straight line.<br /><span>It's a rhythm.</span></h2></div><span className="rhythm-section-aside">A repeatable way<br />to make progress.</span></div>
            <div className="rhythm-grid">{rhythm.map((step) => { const Icon = step.icon; return <article className="rhythm-card" key={step.number}><div className="rhythm-card-top"><span>{step.number} / {step.label}</span><Icon size={18} /></div><h3>{step.title}</h3><p>{step.copy}</p><span className="rhythm-card-check"><Check size={13} /> Built into the flow</span></article>; })}</div>
          </div>
        </section>

        <section className="simple-cta-section"><div className="page-container simple-cta-inner"><div><p className="eyebrow">MAKE THE NEXT STEP EASIER</p><h2>Ready for a better<br /><span>kind of workday?</span></h2></div><Link className="button button-primary" href="/pricing">Find your plan <ArrowRight size={15} /></Link><Compass className="simple-cta-orbit" size={74} strokeWidth={0.8} /></div></section>
      </main>
    </MarketingShell>
  );
}
