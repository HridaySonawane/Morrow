"use client";

import { Command, Search, Sparkles } from "lucide-react";

export function HeroCommand() {
  return (
    <button
      type="button"
      className="hero-command-demo"
      onClick={() => window.dispatchEvent(new Event("morrow:open-command"))}
      aria-label="Open Morrow quick search"
    >
      <span className="hero-command-symbol"><Search size={16} /></span>
      <span className="hero-command-copy"><strong>Find anything in your workspace</strong><small>Projects, issues, people and more</small></span>
      <span className="hero-command-keys"><kbd><Command size={10} /></kbd><kbd>K</kbd></span>
      <span className="hero-command-spark"><Sparkles size={14} /></span>
    </button>
  );
}
