import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check, ChevronDown, LockKeyhole } from "lucide-react";
import { MarketingShell } from "@/components/marketing-shell";
import { PricingCards } from "@/components/pricing-cards";

export const metadata: Metadata = {
  title: "Pricing — Morrow",
  description: "Simple plans that give your team more room to do meaningful work.",
};

const faqs = [
  { question: "Can we start for free?", answer: "Yes. The Starter plan gives small teams a useful place to begin, with no credit card required." },
  { question: "Can we change plans later?", answer: "Absolutely. You can move between plans as your team and its needs change." },
  { question: "How does annual billing work?", answer: "Choose yearly billing to receive the lower per-member monthly rate, billed once annually. You can also stay on monthly billing." },
  { question: "Is our work private?", answer: "Morrow is designed around thoughtful access and clear ownership. These plans are illustrative for this frontend project and are not connected to a live billing service." },
];

export default function PricingPage() {
  return (
    <MarketingShell>
      <main className="pricing-page">
        <section className="pricing-hero">
          <div className="pricing-hero-grain" aria-hidden="true" />
          <div className="page-container pricing-hero-layout">
            <div className="pricing-hero-copy"><p className="pricing-hero-kicker">PLANS &amp; PRICING</p><h1>Simple plans.<br /><em>Room to grow.</em></h1><p>Choose the level of structure your team needs today. Move to another plan as your projects and people change.</p><div className="pricing-hero-actions"><a className="button button-primary" href="#plans">Find your plan <ArrowUpRight size={15} /></a><span>Start with the free plan. Upgrade when it makes sense.</span></div></div>
            <aside className="pricing-promise-card"><div className="pricing-promise-top"><span>THE MORROW PROMISE</span><span className="pricing-promise-spark">01</span></div><div className="pricing-promise-main">A clear place<br /><i>to do the work.</i></div><div className="pricing-promise-list"><span><Check size={14} /> Start free, no card required</span><span><Check size={14} /> Change plans whenever you need</span><span><Check size={14} /> One clear price per person</span></div><div className="pricing-promise-footer"><span>PLANS THAT SCALE WITH YOUR TEAM</span><span>↗</span></div></aside>
          </div>
          <div className="pricing-hero-bottom"><div className="page-container"><span>MADE FOR TEAMS AT EVERY STAGE</span><span>SOLO THINKERS <i /> SMALL TEAMS <i /> GROWING ORGANIZATIONS</span></div></div>
        </section>

        <section className="pricing-section section-pad interior-pricing-section" id="plans">
          <div className="page-container">
            <div className="pricing-heading"><p className="eyebrow">CHOOSE YOUR SPACE / 01</p><h2>Room to start.<br /><span>Space to grow.</span></h2><p>Every plan is designed to make the work feel a little lighter.</p></div>
            <PricingCards />
            <p className="pricing-footnote"><LockKeyhole size={13} /> Your work stays yours. No credit card required to start.</p>
          </div>
        </section>

        <section className="faq-section section-pad"><div className="page-container faq-layout"><div><p className="eyebrow">A FEW GOOD QUESTIONS / 02</p><h2>Good to<br /><span>know.</span></h2><p>Still have something on your mind? <a href="mailto:hello@morrow.work">Talk to our team <ArrowUpRight size={13} /></a></p></div><div className="faq-list">{faqs.map((faq) => <details className="faq-item" key={faq.question}><summary>{faq.question}<ChevronDown size={16} /></summary><p>{faq.answer}</p></details>)}</div></div></section>

        <section className="pricing-trust-strip"><div className="page-container"><span><Check size={14} /> Start free</span><span><Check size={14} /> Change plans anytime</span><span><Check size={14} /> Built for real teams</span><Link href="/dashboard">Explore the workspace <ArrowUpRight size={14} /></Link></div></section>
      </main>
    </MarketingShell>
  );
}
