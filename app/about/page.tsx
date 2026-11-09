import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowRight, Compass, HeartHandshake, Sparkles } from "lucide-react";
import { MarketingShell } from "@/components/marketing-shell";

export const metadata: Metadata = {
  title: "Our approach — Morrow",
  description: "Why Morrow believes better work starts with making room.",
};

const principles = [
  { icon: Compass, number: "01", title: "Clarity over noise", copy: "Make the important things easy to find. Leave the rest quiet enough to ignore." },
  { icon: HeartHandshake, number: "02", title: "People before process", copy: "Build tools around the people doing the work, not the other way around." },
  { icon: Sparkles, number: "03", title: "Progress with intention", copy: "Create enough structure to move forward, and enough room to think differently." },
];

export default function AboutPage() {
  return (
    <MarketingShell>
      <main className="about-page">
        <section className="about-hero">
          <div className="page-container about-hero-top"><span>OUR REASON FOR BEING</span><span>STORY / 01</span></div>
          <div className="page-container about-hero-main">
            <div className="about-hero-title"><p className="about-hero-kicker"><i /> WHY WE ARE BUILDING MORROW</p><h1>Make space<br />for <em>better work.</em></h1></div>
            <div className="about-hero-aside"><div className="about-aside-index"><span>OUR POINT OF VIEW</span><strong>01—03</strong></div><p>We believe the best work happens when people have the clarity to focus, the space to think, and the trust to move together.</p><Link className="about-hero-link" href="#our-belief">Read what we believe <ArrowDown size={14} aria-hidden="true" /></Link></div>
          </div>
          <div className="about-hero-rule"><div className="page-container"><span>LESS NOISE</span><i /><span>MORE MEANING</span><i /><span>A LITTLE MORE ROOM</span></div></div>
        </section>

        <section className="about-manifesto-section section-pad" id="our-belief"><div className="page-container about-manifesto-grid"><div className="about-manifesto-stamp"><span>THE PRINCIPLE</span><strong>Make the work<br />easier to see.</strong></div><div><p className="eyebrow">THE IDEA IS SIMPLE / 02</p><h2>We're not here to add more to your plate.<br /><span>We're here to take things off it.</span></h2><p>Somewhere along the way, work became keeping up with work. Another tab. Another update. Another thing to remember. Morrow is an invitation to make the important things clearer, keep the right context close, and give people more energy for the work itself.</p><p>We're building a calmer kind of workspace — one that respects attention, makes collaboration feel natural, and gives teams a better way to move forward together.</p></div></div></section>

        <section className="about-principles-section section-pad"><div className="page-container"><div className="about-principles-heading"><p className="eyebrow">WHAT WE BELIEVE / 03</p><h2>A few principles<br /><span>we keep returning to.</span></h2><p>Not rules to follow. Principles to keep us pointed in the right direction.</p></div><div className="principles-grid">{principles.map((principle) => { const Icon = principle.icon; return <article className="principle-card" key={principle.title}><div className="principle-card-top"><span>{principle.number}</span><Icon size={19} /></div><h3>{principle.title}</h3><p>{principle.copy}</p></article>; })}</div></div></section>

        <section className="about-bottom-cta"><div className="page-container"><p className="eyebrow">MAKE SPACE FOR WHAT'S NEXT</p><h2>Here's to work<br /><span>that moves us.</span></h2><Link className="button button-light" href="/how-it-works">See how it works <ArrowRight size={15} /></Link></div></section>
      </main>
    </MarketingShell>
  );
}
