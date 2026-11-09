import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BarChart3, Blocks, Palette, Users, Check } from "lucide-react";
import { MarketingShell } from "@/components/marketing-shell";
import { SignupTrigger } from "@/components/signup-trigger";

export const metadata: Metadata = {
  title: "For teams — Morrow",
  description: "A shared workspace for product, design, operations, and thoughtful teams.",
};

const teams = [
  { icon: Blocks, tag: "PRODUCT TEAMS", title: "Keep the big picture close.", copy: "Connect roadmaps, projects, and day-to-day decisions. Give everyone a clearer sense of what is shipping and why it matters.", outcome: "Direction everyone can see" },
  { icon: Palette, tag: "DESIGN TEAMS", title: "Make space for better ideas.", copy: "Keep feedback, creative work, and approvals connected. Spend less time finding context and more time making something meaningful.", outcome: "Feedback with its context" },
  { icon: BarChart3, tag: "OPERATIONS", title: "Turn moving parts into momentum.", copy: "Bring recurring work, owners, and handoffs into one shared rhythm. Make the next action visible before it becomes a blocker.", outcome: "Handoffs that keep moving" },
  { icon: Users, tag: "LEADERSHIP", title: "See progress without chasing it.", copy: "Understand team momentum and emerging risks with useful context, not another layer of status reporting.", outcome: "Progress without the status chase" },
];

export default function TeamsPage() {
  return (
    <MarketingShell>
      <main className="teams-page">
        <section className="teams-hero">
          <div className="page-container teams-hero-layout">
            <div className="teams-hero-copy">
              <p className="teams-hero-kicker">FOR THE WHOLE TEAM</p>
              <h1>Different roles.<br /><span>Shared context.</span></h1>
              <p>Each team has its own responsibilities. Morrow keeps the priorities, decisions and progress connected across them.</p>
              <div className="teams-hero-actions"><SignupTrigger>Bring your team <ArrowUpRight size={16} /></SignupTrigger><Link className="button button-quiet" href="/product">Explore the product <ArrowRight size={15} /></Link></div>
              <div className="teams-hero-note"><span>PRODUCT</span><i /><span>DESIGN</span><i /><span>OPERATIONS</span><i /><span>LEADERSHIP</span></div>
            </div>
            <div className="team-coverage-panel" aria-label="Examples of how teams use Morrow">
              <div className="team-coverage-heading"><span>TEAM WORKSPACES</span><span>SHARED CONTEXT</span></div>
              <div className="team-coverage-row"><span className="team-coverage-number">01</span><div><strong>Product</strong><small>Roadmaps, milestones, delivery</small></div><span className="team-coverage-tag">Direction</span></div>
              <div className="team-coverage-row"><span className="team-coverage-number">02</span><div><strong>Design</strong><small>Feedback, decisions, approvals</small></div><span className="team-coverage-tag">Quality</span></div>
              <div className="team-coverage-row"><span className="team-coverage-number">03</span><div><strong>Operations</strong><small>Recurring work, owners, handoffs</small></div><span className="team-coverage-tag">Continuity</span></div>
              <div className="team-coverage-row"><span className="team-coverage-number">04</span><div><strong>Leadership</strong><small>Priorities, progress, risks</small></div><span className="team-coverage-tag">Visibility</span></div>
              <div className="team-coverage-foot">One shared workspace. A clear view for every role.</div>
            </div>
          </div>
          <div className="teams-hero-bottom"><div className="page-container"><strong>ONE TEAM, MANY STRENGTHS</strong><span>Every role has a different view. Everyone shares the same context.</span></div></div>
        </section>

        <section className="teams-section section-pad">
          <div className="page-container">
            <div className="teams-section-heading"><div><p className="eyebrow">MADE FOR DIFFERENT WAYS OF THINKING / 01</p><h2>One shared space.<br /><span>Room for every role.</span></h2></div><p>Bring the right people into the same picture, while giving each team the space to work in its own way.</p></div>
            <div className="teams-grid">{teams.map((team, index) => { const Icon = team.icon; return <article className={`team-card team-card-${index + 1}`} key={team.tag}><div className="team-card-top"><span className="team-card-icon"><Icon size={19} /></span><span>{team.tag}</span></div><div><h3>{team.title}</h3><p>{team.copy}</p></div><div className="team-card-outcome"><Check size={13} /> {team.outcome}</div><span className="team-card-index">0{index + 1}</span></article>; })}</div>
          </div>
        </section>

        <section className="teams-principle-section"><div className="page-container teams-principle-grid"><div className="teams-principle-mark"><span>04</span><small>TEAM ROLES</small></div><div><p className="eyebrow">SHARED CONTEXT, NOT MORE PROCESS / 02</p><h2>Give good people<br /><span>room to do good work.</span></h2><p>When priorities are visible and context stays close, teams can spend less energy coordinating the work and more energy moving it forward.</p><Link className="text-link" href="/how-it-works">See how Morrow works <ArrowRight size={15} /></Link></div></div></section>

        <section className="simple-cta-section"><div className="page-container simple-cta-inner"><div><p className="eyebrow">YOUR TEAM'S NEXT CHAPTER</p><h2>Make room for<br /><span>better together.</span></h2></div><Link className="button button-primary" href="/pricing">Explore plans <ArrowUpRight size={15} /></Link></div></section>
      </main>
    </MarketingShell>
  );
}
