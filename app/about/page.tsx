import type { Metadata } from "next";
import Link from "next/link";
import { Activity, ArrowRight, Target, Workflow } from "lucide-react";
import { MarketingShell } from "@/components/marketing-shell";

export const metadata: Metadata = {
  title: "Our approach — Morrow",
  description: "Why Morrow believes better work starts with making room.",
};

const principles = [
  {
    icon: Target,
    number: "01",
    title: "Make priorities visible",
    copy: "See what matters now, who owns it, and what should happen next.",
  },
  {
    icon: Workflow,
    number: "02",
    title: "Keep decisions close",
    copy: "Feedback and choices stay connected to the projects they shape.",
  },
  {
    icon: Activity,
    number: "03",
    title: "Make progress shared",
    copy: "Give everyone a clear view of momentum, handoffs, and blockers.",
  },
];

export default function AboutPage() {
  return (
    <MarketingShell>
      <main className="about-page">
        <section className="about-hero">
          <div className="page-container about-hero-top">
            <span>ABOUT MORROW</span>
            <span>THE IDEA / 01</span>
          </div>
          <div className="page-container about-hero-main">
            <div className="about-hero-title">
              <p className="about-hero-kicker">
                <i /> A SHARED WORKSPACE FOR TEAMS
              </p>
              <h1>
                Keep work
                <br />
                in <em>context.</em>
              </h1>
            </div>
            <div className="about-hero-aside">
              <div className="about-workflow-card">
                <span className="about-workflow-label">ONE SHARED VIEW</span>
                <div className="about-workflow-row">
                  <i>01</i>
                  <div><strong>Priorities</strong><small>What matters now</small></div>
                </div>
                <div className="about-workflow-row">
                  <i>02</i>
                  <div><strong>Decisions</strong><small>Why the work is moving</small></div>
                </div>
                <div className="about-workflow-row">
                  <i>03</i>
                  <div><strong>Progress</strong><small>What happens next</small></div>
                </div>
              </div>
              <Link className="about-hero-link" href="#our-belief">
                Why we built Morrow <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="about-hero-rule">
            <div className="page-container">
              <span>PROJECTS</span>
              <i />
              <span>DECISIONS</span>
              <i />
              <span>PROGRESS</span>
            </div>
          </div>
        </section>

        <section
          className="about-manifesto-section section-pad"
          id="our-belief"
        >
          <div className="page-container about-manifesto-grid">
            <div className="about-manifesto-stamp">
              <span>WHY IT MATTERS</span>
              <strong>
                Less time
                <br />
                reconstructing.
              </strong>
            </div>
            <div>
              <p className="eyebrow">THE PROBLEM / 02</p>
              <h2>
                Work shouldn’t lose
                <br />
                <span>its context.</span>
              </h2>
              <p>
                Projects, tasks, and decisions belong together. When people can
                see what matters and why, handoffs get easier and progress is
                easier to share.
              </p>
            </div>
          </div>
        </section>

        <section className="about-principles-section section-pad">
          <div className="page-container">
            <div className="about-principles-heading">
              <p className="eyebrow">HOW MORROW HELPS / 03</p>
              <h2>
                A clearer way
                <br />
                <span>to move work forward.</span>
              </h2>
              <p>
                Keep priorities, decisions, and next steps visible in one
                shared workspace.
              </p>
            </div>
            <div className="principles-grid">
              {principles.map((principle) => {
                const Icon = principle.icon;
                return (
                  <article className="principle-card" key={principle.title}>
                    <div className="principle-card-top">
                      <span>{principle.number}</span>
                      <Icon size={19} />
                    </div>
                    <h3>{principle.title}</h3>
                    <p>{principle.copy}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="about-bottom-cta">
          <div className="page-container">
            <p className="eyebrow">SEE THE WORKFLOW</p>
            <h2>
              One place to
              <br />
              <span>move work forward.</span>
            </h2>
            <Link className="button button-light" href="/how-it-works">
              See how Morrow works <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}
