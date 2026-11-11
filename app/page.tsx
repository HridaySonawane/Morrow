import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  Focus,
  Workflow,
  LockKeyhole,
} from "lucide-react";
import { ProductPreview } from "@/components/product-preview";
import { WorkflowSwitcher } from "@/components/workflow-switcher";
import { PricingCards } from "@/components/pricing-cards";
import { SignupTrigger } from "@/components/signup-trigger";
import { MarketingShell } from "@/components/marketing-shell";

const featureItems = [
  {
    icon: Focus,
    number: "01",
    title: "Know what matters",
    copy: "Keep priorities, owners and next steps visible. The team can see what needs attention without asking for another update.",
  },
  {
    icon: Workflow,
    number: "02",
    title: "Keep the context",
    copy: "Tasks, decisions and handoffs stay connected to the project. People can pick up the work without retracing every conversation.",
  },
  {
    icon: Compass,
    number: "03",
    title: "See work move",
    copy: "A useful view of progress helps teams spot a blocker early and make the next decision with confidence.",
  },
];

export default function Home() {
  return (
    <MarketingShell>
      <main id="top" className="morrow-home">
        <section className="hero-section">
          <div className="page-container home-hero-inner">
            <div className="home-hero-overline">
              <span className="home-hero-rule" /> A SHARED WORKSPACE FOR
              THOUGHTFUL TEAMS <span className="home-hero-rule" />
            </div>
            <div className="home-hero-layout home-hero-centered">
              <div className="home-hero-copy">
                <h1>
                  Good work needs
                  <br />
                  <span className="headline-accent">room to happen.</span>
                </h1>
                <p className="hero-description">
                  Projects, priorities and people — together in one clear
                  workspace.
                </p>
                <div className="hero-actions">
                  <SignupTrigger>
                    Get started <ArrowUpRight size={16} />
                  </SignupTrigger>
                  <a className="button button-quiet" href="/dashboard">
                    Explore the workspace <ArrowRight size={15} />
                  </a>
                </div>
              </div>
            </div>
            <div className="hero-preview-wrap" id="product">
              <ProductPreview />
            </div>
            <div className="home-preview-caption">
              <span>THE MORROW WORKSPACE</span>
              <span>A live view of the work</span>
            </div>
          </div>
        </section>

        <section
          className="home-capability-strip"
          aria-label="What Morrow brings together"
        >
          <div className="page-container home-capability-inner">
            <span className="home-strip-label">THE WORK, IN CONTEXT</span>
            <div>
              <strong>Plan</strong>
              <span>Set a direction everyone understands.</span>
            </div>
            <div>
              <strong>Do</strong>
              <span>Keep the next action easy to find.</span>
            </div>
            <div>
              <strong>Learn</strong>
              <span>Carry useful context into what follows.</span>
            </div>
          </div>
        </section>

        <section className="manifesto-section section-pad" id="manifesto">
          <div className="page-container manifesto-grid">
            <div className="section-index">
              <span>01 / THE IDEA</span>
              <span className="index-line" />
            </div>
            <div className="manifesto-copy">
              <p className="eyebrow">WHY MORROW EXISTS</p>
              <h2>
                Work should move forward.
                <br />
                <span>Not around in circles.</span>
              </h2>
              <p className="manifesto-body">
                The work itself is hard enough. Morrow gives teams a shared
                place to set priorities, keep decisions attached to projects and
                understand what needs attention next. Less searching for
                context. Fewer status loops. More time for the work.
              </p>
              <Link className="text-link" href="/about">
                Read our approach <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>

        <section className="feature-section section-pad" id="stories">
          <div className="page-container feature-section-layout">
            <div className="section-heading-row">
              <div>
                <p className="eyebrow">THE ESSENTIALS</p>
                <h2>
                  Everything connected.
                  <br />
                  <span>Nothing in the way.</span>
                </h2>
              </div>
              <p className="section-intro">
                A focused set of tools for planning work, keeping people aligned
                and making progress visible.
              </p>
            </div>
            <div className="feature-list">
              {featureItems.map((feature) => {
                const Icon = feature.icon;
                return (
                  <article className="feature-row" key={feature.number}>
                    <span className="feature-row-number">{feature.number}</span>
                    <span className="feature-row-icon">
                      <Icon size={19} strokeWidth={1.7} />
                    </span>
                    <h3>{feature.title}</h3>
                    <p>{feature.copy}</p>
                    <ArrowUpRight className="feature-row-arrow" size={18} />
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="workflow-section section-pad" id="workflow">
          <div className="page-container">
            <div className="workflow-heading">
              <p className="eyebrow">A PRACTICAL RHYTHM</p>
              <h2>
                From first thought
                <br />
                <span>to finished work.</span>
              </h2>
              <p>
                Follow a project from the first shared priority to the handoff
                and the learning that comes after.
              </p>
            </div>
            <WorkflowSwitcher />
          </div>
        </section>

        <section className="principle-band">
          <div className="page-container principle-band-inner">
            <div>
              <p className="eyebrow">WHAT CHANGES</p>
              <h2>
                Less time finding the work.
                <br />
                <span>More time moving it.</span>
              </h2>
            </div>
            <div className="principle-band-points">
              <p>
                <span>01</span>
                <strong>One place for priorities</strong>
              </p>
              <p>
                <span>02</span>
                <strong>Decisions with their context</strong>
              </p>
              <p>
                <span>03</span>
                <strong>Progress the team can see</strong>
              </p>
            </div>
          </div>
        </section>

        <section className="pricing-section section-pad" id="pricing">
          <div className="page-container">
            <div className="pricing-heading">
              <p className="eyebrow">PLANS THAT STAY SIMPLE</p>
              <h2>
                Start with what you need.
                <br />
                <span>Grow when you are ready.</span>
              </h2>
              <p>Choose a plan that fits the way your team works today.</p>
            </div>
            <PricingCards />
            <p className="pricing-footnote">
              <LockKeyhole size={13} /> Clear pricing. No complicated add-ons.
            </p>
          </div>
        </section>

        <section className="closing-section">
          <div className="page-container closing-content">
            <div className="closing-copy">
              <p className="eyebrow">A CLEARER PLACE TO BEGIN</p>
              <h2>
                Make room for
                <br />
                <span>the work ahead.</span>
              </h2>
              <p>Bring your projects and people together in one workspace.</p>
            </div>
            <div className="closing-action">
              <SignupTrigger className="button button-light">
                Get started <ArrowUpRight size={16} />
              </SignupTrigger>
              <span>
                No complicated setup. Start with the work in front of you.
              </span>
            </div>
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}
