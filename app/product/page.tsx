import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Check,
  Focus,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { MarketingShell } from "@/components/marketing-shell";
import { ProductPreview } from "@/components/product-preview";
import { SignupTrigger } from "@/components/signup-trigger";

export const metadata: Metadata = {
  title: "Product — Morrow",
  description:
    "A calmer workspace for projects, priorities, and team momentum.",
};

const capabilities = [
  {
    icon: Focus,
    number: "01",
    title: "A clearer view",
    copy: "See the work that matters now, understand what's next, and leave the background noise behind.",
  },
  {
    icon: Workflow,
    number: "02",
    title: "Connected momentum",
    copy: "Keep tasks, decisions, and conversations close so handoffs don't turn into loose ends.",
  },
  {
    icon: Activity,
    number: "03",
    title: "Progress with context",
    copy: "Understand how the team is moving without turning every update into another meeting.",
  },
  {
    icon: ShieldCheck,
    number: "04",
    title: "Space to do your best",
    copy: "A thoughtful environment with the right structure, sensible defaults, and fewer distractions.",
  },
];

export default function ProductPage() {
  return (
    <MarketingShell>
      <main className="product-page">
        <section className="product-hero">
          <div className="page-container product-hero-layout">
            <div className="product-hero-copy">
              <div className="product-kicker">
                PRODUCT / THE MORROW WORKSPACE
              </div>
              <h1>
                One place for
                <br />
                <em>the work that matters.</em>
              </h1>
              <p>
                Keep projects, priorities and team decisions connected. Morrow
                gives everyone a clear view of the work and the next step.
              </p>
              <div className="product-hero-actions">
                <SignupTrigger>
                  Get started <ArrowUpRight size={16} />
                </SignupTrigger>
                <Link className="button button-quiet" href="/how-it-works">
                  How it works <ArrowRight size={15} />
                </Link>
              </div>
              <div className="product-hero-meta">
                <span>
                  <Check size={13} /> Projects and tasks
                </span>
                <span>
                  <Check size={13} /> Shared team context
                </span>
                <span>
                  <Check size={13} /> Visible progress
                </span>
              </div>
            </div>
            <aside
              className="product-hero-aside"
              aria-label="What the workspace brings together"
            >
              <div className="product-aside-heading">
                <span>IN ONE WORKSPACE</span>
                <span>01—03</span>
              </div>
              <div className="product-aside-row">
                <span>01</span>
                <div>
                  <strong>Plan the work</strong>
                  <p>
                    <small>Goals, priorities and ownership.</small>
                  </p>
                </div>
              </div>
              <div className="product-aside-row">
                <span>02</span>
                <div>
                  <strong>Keep it moving</strong>
                  <p>
                    <small>Tasks, handoffs and decisions.</small>
                  </p>
                </div>
              </div>
              <div className="product-aside-row">
                <span>03</span>
                <div>
                  <strong>Understand progress</strong>
                  <p>
                    <small>Updates with the context attached.</small>
                  </p>
                </div>
              </div>
            </aside>
          </div>
          <div className="product-hero-bottom">
            <div className="page-container">
              <span>MADE TO KEEP THE IMPORTANT THINGS CLOSE</span>
              <div>
                <span>Projects</span>
                <i />
                <span>People</span>
                <i />
                <span>Progress</span>
                <i />
                <span>Context</span>
              </div>
            </div>
          </div>
        </section>

        <section className="product-showcase-section section-pad">
          <div className="page-container">
            <div className="product-showcase-heading">
              <div>
                <p className="eyebrow">A CLOSER LOOK / 02</p>
                <h2>
                  The overview and
                  <br />
                  <span>the details belong together.</span>
                </h2>
              </div>
              <p>
                This is the working view: a place to see priorities, move tasks
                forward and understand what needs attention.
              </p>
            </div>
            <div className="interior-product-stage">
              <ProductPreview />
            </div>
            <div className="product-proof-row">
              <span>
                <Check size={14} /> Flexible views
              </span>
              <span>
                <Check size={14} /> Connected projects
              </span>
              <span>
                <Check size={14} /> Clear ownership
              </span>
              <span>
                <Check size={14} /> Useful team updates
              </span>
            </div>
          </div>
        </section>

        <section className="capabilities-section section-pad">
          <div className="page-container">
            <div className="capability-heading">
              <span className="capability-heading-index">03 / THE DETAILS</span>
              <div>
                <p className="eyebrow">LESS FRICTION, BY DESIGN</p>
                <h2>
                  The tools you need.
                  <br />
                  <span>Nothing you don't.</span>
                </h2>
              </div>
              <p>
                Morrow brings the pieces of meaningful work together, without
                asking your team to learn another complicated system.
              </p>
            </div>
            <div className="capability-grid">
              {capabilities.map((item) => {
                const Icon = item.icon;
                return (
                  <article className="capability-card" key={item.title}>
                    <div className="capability-card-top">
                      <span>{item.number}</span>
                      <Icon size={18} />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                    <span className="capability-card-arrow">
                      <ArrowUpRight size={15} />
                    </span>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="product-cta-band">
          <div className="page-container product-cta-inner">
            <div>
              <p className="eyebrow">READY WHEN YOU ARE</p>
              <h2>
                Bring the work
                <br />
                <span>into focus.</span>
              </h2>
            </div>
            <div>
              <p>
                Give your team one clear place to plan, collaborate and move the
                next thing forward.
              </p>
              <Link className="button button-primary" href="/pricing">
                View plans <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}
