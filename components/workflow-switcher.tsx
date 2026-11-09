"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Circle, Clock3, Layers3, MessageSquare, Sparkles, Target, Zap } from "lucide-react";

const steps = [
  { id: "plan", number: "01", label: "Find your focus", title: "Start with what matters.", copy: "Bring your goals, projects, and people into one shared view. Everyone knows what deserves their attention — and what can wait.", icon: Target, tag: "A clearer direction", task: ["Set a meaningful team goal", "Give the next milestone an owner", "Keep the whole team in sync"], footer: "One direction. Less second-guessing." },
  { id: "move", number: "02", label: "Keep work moving", title: "Turn plans into progress.", copy: "Make the next step obvious. Morrow connects the small details to the bigger picture, so momentum doesn't get lost between meetings.", icon: Zap, tag: "A steadier rhythm", task: ["Move the launch checklist forward", "Share a decision with the team", "Unblock the next handoff"], footer: "Progress you can actually feel." },
  { id: "learn", number: "03", label: "Learn as you go", title: "Make every week count.", copy: "See what's working, spot the slowdowns, and make space for better ideas. Your workspace gets more useful as your team grows.", icon: Sparkles, tag: "A better feedback loop", task: ["Review this week's momentum", "Capture what the team learned", "Make room for the next big idea"], footer: "Small insights. Better work." },
];

export function WorkflowSwitcher() {
  const [active, setActive] = useState(0);
  const current = steps[active];
  const Icon = current.icon;
  return (
    <div className="workflow-module">
      <div className="workflow-tabs" role="tablist" aria-label="How Morrow works">
        {steps.map((step, index) => <button key={step.id} role="tab" aria-selected={active === index} className={`workflow-tab ${active === index ? "active" : ""}`} onClick={() => setActive(index)}><span>{step.number}</span>{step.label}</button>)}
      </div>
      <div className="workflow-content" key={current.id}>
        <div className="workflow-copy"><span className="workflow-tag"><Icon size={13} /> {current.tag}</span><h3>{current.title}</h3><p>{current.copy}</p><div className="workflow-footnote"><span><Check size={13} /></span>{current.footer}</div><Link className="text-link" href="/dashboard">Explore the workspace <ArrowRight size={15} /></Link></div>
        <div className="workflow-visual">
          <div className="flow-card-top"><span className="flow-app-mark"><Layers3 size={14} /></span><div><strong>Juniper Studio</strong><small>Team workspace / This week</small></div><span className="flow-menu">•••</span></div>
          <div className="flow-card-title"><span>YOUR TEAM'S NEXT MOVES</span><span className="flow-count">0{active + 1} / 03</span></div>
          <div className="flow-task-list">{current.task.map((task, index) => <div className="flow-task" key={task}><span className={`flow-task-check ${index < active ? "done" : ""}`}>{index < active ? <Check size={11} /> : <Circle size={12} />}</span><span>{task}</span><span className={`flow-task-status status-index-${index}`}>{index === active ? "In focus" : index < active ? "Done" : "Up next"}</span></div>)}</div>
          <div className="flow-card-bottom"><div className="flow-people"><span className="mini-avatar avatar-a">A</span><span className="mini-avatar avatar-b">J</span><span className="mini-avatar avatar-c">S</span><span className="flow-people-label">Your team</span></div><div className="flow-time"><Clock3 size={12} /> Updated just now</div></div>
          <div className="flow-note"><span className="flow-note-icon"><MessageSquare size={13} /></span><span><strong>A little nudge</strong><small>Make the next step easy to see.</small></span><ArrowRight size={14} /></div>
        </div>
      </div>
    </div>
  );
}
