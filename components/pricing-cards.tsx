"use client";

import { useState } from "react";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { SignupTrigger } from "./signup-trigger";

export function PricingCards() {
  const [annual, setAnnual] = useState(true);
  const plans = [
    { name: "Starter", description: "A little more clarity for your day.", monthly: 0, annual: 0, features: ["Up to 3 projects", "Unlimited personal tasks", "Basic team updates", "7-day activity history"], featured: false },
    { name: "Team", description: "Everything your team needs to move.", monthly: 12, annual: 9, features: ["Unlimited projects & tasks", "Shared goals and timelines", "Team insights & reports", "AI-powered weekly summaries", "Priority support"], featured: true },
    { name: "Scale", description: "More room for ambitious teams.", monthly: 24, annual: 19, features: ["Everything in Team", "Advanced permissions", "Custom workflows", "Dedicated success partner", "Enhanced security controls"], featured: false },
  ];
  return (
    <>
      <div className="pricing-toggle-wrap"><span className={!annual ? "toggle-label-active" : ""}>Monthly</span><button className={`billing-toggle ${annual ? "is-annual" : ""}`} onClick={() => setAnnual((value) => !value)} aria-label="Toggle annual billing" aria-pressed={annual}><i /></button><span className={annual ? "toggle-label-active" : ""}>Yearly <em>Save up to 25%</em></span></div>
      <div className="pricing-grid">{plans.map((plan) => <article key={plan.name} className={`price-card ${plan.featured ? "price-featured" : ""}`}>
        {plan.featured && <div className="popular-badge"><Sparkles size={12} /> THE SWEET SPOT</div>}
        <div className="price-card-top"><h3>{plan.name}</h3><p>{plan.description}</p></div>
        <div className="price-number"><strong>{plan.monthly === 0 ? "$0" : `$${annual ? plan.annual : plan.monthly}`}</strong>{plan.monthly !== 0 && <span>/ member / month</span>}</div>
        {plan.monthly !== 0 && <div className="price-billing-note">Billed {annual ? "annually" : "monthly"}. Cancel anytime.</div>}
        <SignupTrigger className={`button ${plan.featured ? "button-primary" : "button-secondary"} button-full`}>{plan.monthly === 0 ? "Get started free" : "Choose " + plan.name} <ArrowRight size={15} /></SignupTrigger>
        <div className="price-divider" /><p className="included-label">WHAT'S INCLUDED</p><ul className="feature-list">{plan.features.map((feature) => <li key={feature}><Check size={14} />{feature}</li>)}</ul>
      </article>)}</div>
    </>
  );
}
