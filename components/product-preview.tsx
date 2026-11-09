"use client";

import { useMemo, useState } from "react";
import {
  Activity, ArrowUpRight, Bell, CalendarDays, Check, ChevronDown,
  Circle, CircleDot, Command, FileText, Filter, Inbox, Layers3, ListFilter,
  MoreHorizontal, Plus, Search, Settings2, Users, X, Zap,
} from "lucide-react";

type Status = "In progress" | "In review" | "Backlog" | "Done";
type Task = {
  id: string;
  title: string;
  project: string;
  status: Status;
  assignee: string;
  initials: string;
  due: string;
  description: string;
  priority: "Urgent" | "High" | "Normal";
};

const initialTasks: Task[] = [
  { id: "MOR-345", title: "Ship the new workspace navigation", project: "Product experience", status: "In progress", assignee: "Amelia Morgan", initials: "A", due: "Nov 12", description: "Bring the main workspace destinations into a simpler, more predictable navigation model.", priority: "High" },
  { id: "MOR-348", title: "Refine the onboarding journey", project: "Activation", status: "In progress", assignee: "Jules Lee", initials: "J", due: "Nov 13", description: "Reduce the number of decisions a new team needs to make before reaching their first useful moment.", priority: "Urgent" },
  { id: "MOR-352", title: "Document component foundations", project: "Design system", status: "In review", assignee: "Sam Kim", initials: "S", due: "Nov 14", description: "Capture spacing, color, type and interaction tokens so product surfaces stay consistent.", priority: "Normal" },
  { id: "MOR-361", title: "Connect customer feedback signals", project: "Product experience", status: "Backlog", assignee: "Olivia Parker", initials: "O", due: "Nov 18", description: "Bring important customer signals closer to the decisions and tasks they should influence.", priority: "High" },
  { id: "MOR-369", title: "Prepare the release story", project: "Launch planning", status: "Backlog", assignee: "Jules Lee", initials: "J", due: "Nov 20", description: "Write a clear release narrative for the improvements shipping this month.", priority: "Normal" },
  { id: "MOR-372", title: "Audit workspace accessibility", project: "Quality", status: "Done", assignee: "Sam Kim", initials: "S", due: "Nov 07", description: "Review keyboard access, focus visibility and contrast across key workflows.", priority: "Normal" },
];

const statusClass: Record<Status, string> = {
  "In progress": "task-status-progress",
  "In review": "task-status-review",
  Backlog: "task-status-backlog",
  Done: "task-status-done",
};

export function ProductPreview() {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedId, setSelectedId] = useState("MOR-345");
  const [activeNav, setActiveNav] = useState("Issues");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterMine, setFilterMine] = useState(false);
  const [notice, setNotice] = useState("");
  const [view, setView] = useState<"List" | "Board">("List");
  const selectedTask = tasks.find((task) => task.id === selectedId) ?? tasks[0];
  const visibleTasks = useMemo(
    () => filterMine ? tasks.filter((task) => task.assignee === "Olivia Parker") : tasks,
    [filterMine, tasks],
  );

  function completeTask(id: string) {
    setTasks((current) => current.map((task) => task.id === id ? { ...task, status: task.status === "Done" ? "In progress" : "Done" } : task));
    setNotice("Issue status updated");
    window.setTimeout(() => setNotice(""), 2800);
  }

  function notify(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2800);
  }

  const groups: Status[] = ["In progress", "In review", "Backlog", "Done"];

  return (
    <div className="monitor-stage">
      <div className="product-frame" id="product">
        <div className="browser-chrome">
          <div className="window-dots"><i /><i /><i /></div>
          <div className="browser-address"><span className="secure-dot" /> app.morrow.work / workspace / projects</div>
          <div className="chrome-actions"><span /><span /><span /></div>
        </div>
        <div className="app-preview linear-workspace">
          <aside className="app-sidebar">
            <button className="workspace-switch" onClick={() => notify("Workspace switcher opened")}>
              <span className="workspace-avatar">m</span>
              <span><strong>Juniper Studio</strong><small>Pro workspace</small></span>
              <ChevronDown size={13} />
            </button>
            <button className="sidebar-search" onClick={() => window.dispatchEvent(new Event("morrow:open-command"))}><Search size={13} /> Search anything <kbd>⌘ K</kbd></button>
            <div className="sidebar-label">WORKSPACE</div>
            {[
              { label: "Inbox", icon: Inbox, count: "3" },
              { label: "My issues", icon: CircleDot },
              { label: "Views", icon: Layers3 },
              { label: "Roadmaps", icon: Activity },
            ].map(({ label, icon: Icon, count }) => (
              <button key={label} className={`sidebar-link ${activeNav === label ? "selected" : ""}`} onClick={() => { setActiveNav(label); notify(`${label} view selected`); }}>
                <Icon size={14} /> {label} {count && <span className="side-count">{count}</span>}
              </button>
            ))}
            <div className="sidebar-label team-label">YOUR TEAMS</div>
            <button className="team-project selected-team" onClick={() => setActiveNav("Issues")}><span className="team-project-icon">◈</span><span>Product</span><ChevronDown size={12} /></button>
            <button className="sidebar-sub-link" onClick={() => setActiveNav("Issues")}>Issues <span>12</span></button>
            <button className={`sidebar-sub-link ${activeNav === "Projects" ? "selected" : ""}`} onClick={() => setActiveNav("Projects")}>Projects</button>
            <button className={`sidebar-sub-link ${activeNav === "Cycles" ? "selected" : ""}`} onClick={() => setActiveNav("Cycles")}>Cycles</button>
            <button className="sidebar-link invite-link" onClick={() => notify("Invite link copied")}><Plus size={14} /> Invite members</button>
            <div className="sidebar-bottom">
              <button className="sidebar-link" onClick={() => notify("Settings are available in the full workspace")}><Settings2 size={14} /> Settings</button>
              <button className="sidebar-link" onClick={() => notify("Help center opened")}><Users size={14} /> Help & support</button>
              <div className="user-profile"><span className="mini-avatar avatar-d">O</span><span><strong>Olivia Parker</strong><small>olivia@juniper.studio</small></span><MoreHorizontal size={15} /></div>
            </div>
          </aside>

          <section className="workspace-center">
            <div className="app-topbar">
              <div className="breadcrumbs">Product <span>/</span> <strong>{activeNav === "Issues" ? "Issues" : activeNav}</strong></div>
              <div className="topbar-right">
                <button className="topbar-icon" aria-label="Notifications" onClick={() => notify("You're all caught up")}><Bell size={14} /><i /></button>
                <div className="avatar-stack"><span className="mini-avatar avatar-a">A</span><span className="mini-avatar avatar-b">J</span><span className="mini-avatar avatar-c">S</span><span className="stack-more">+2</span></div>
                <button className="invite-button" onClick={() => notify("Invite link copied")}><Plus size={12} /> Invite</button>
              </div>
            </div>
            <div className="project-toolbar">
              <div className="project-identity"><span className="project-symbol">◈</span><div><small>PRODUCT TEAM</small><strong>Product experience</strong></div><ChevronDown size={13} /></div>
              <div className="project-tools">
                <button className="project-tool" onClick={() => setFilterOpen((value) => !value)} aria-expanded={filterOpen}><Filter size={13} /> Filter</button>
                <button className={`project-view ${view === "List" ? "active" : ""}`} onClick={() => setView("List")} aria-label="List view" aria-pressed={view === "List"}><ListFilter size={13} /></button>
                <button className={`project-view ${view === "Board" ? "active" : ""}`} onClick={() => setView("Board")} aria-label="Board view" aria-pressed={view === "Board"}><Layers3 size={13} /></button>
                <button className="project-tool project-add" onClick={() => notify("New issue composer opened")}><Plus size={13} /> New issue</button>
              </div>
            </div>
            <div className="project-title-row"><div><div className="project-kicker"><span className="project-dot" /> ACTIVE PROJECT <span>·</span> NOVEMBER CYCLE</div><h3>Make work move forward.</h3><p>Keep the important work visible, connected, and moving.</p></div><button className="project-date" onClick={() => notify("Cycle calendar opened")}><CalendarDays size={13} /> Nov 09 — Nov 20 <ChevronDown size={12} /></button></div>
            {filterOpen && <div className="project-filter-popover"><label><input type="checkbox" checked={filterMine} onChange={(event) => setFilterMine(event.target.checked)} /> Assigned to Olivia</label><button onClick={() => { setFilterMine(false); setFilterOpen(false); }}>Clear filters</button></div>}

            {view === "List" ? (
              <div className="issue-groups">
                {groups.map((group) => {
                  const groupTasks = visibleTasks.filter((task) => task.status === group);
                  if (!groupTasks.length) return null;
                  return <section className="issue-group" key={group}>
                    <div className="issue-group-heading"><span className={`group-chevron ${statusClass[group]}`}><ChevronDown size={12} /></span><strong>{group}</strong><span>{groupTasks.length}</span><button onClick={() => notify(`Add issue to ${group}`)} aria-label={`Add issue to ${group}`}><Plus size={13} /></button></div>
                    {groupTasks.map((task) => <div key={task.id} className={`issue-row ${selectedId === task.id ? "issue-row-selected" : ""}`}>
                      <button className={`issue-complete ${task.status === "Done" ? "is-done" : ""}`} aria-label={`Toggle ${task.title} completion`} onClick={() => completeTask(task.id)}>{task.status === "Done" ? <Check size={10} /> : <Circle size={11} />}</button>
                      <button className="issue-main" onClick={() => setSelectedId(task.id)}><span className="issue-id">{task.id}</span><strong>{task.title}</strong></button>
                      <span className={`issue-priority priority-${task.priority.toLowerCase()}`}>{task.priority === "Urgent" ? "↑↑" : task.priority === "High" ? "↑" : "—"}</span>
                      <span className={`issue-assignee avatar-${task.initials.toLowerCase()}`}>{task.initials}</span>
                      <span className="issue-due">{task.due}</span>
                    </div>)}
                  </section>;
                })}
              </div>
            ) : (
              <div className="issue-board">
                {groups.map((group) => <div className="board-column" key={group}><div className="board-heading"><span className={`board-dot ${statusClass[group]}`} />{group}<small>{visibleTasks.filter((task) => task.status === group).length}</small></div>{visibleTasks.filter((task) => task.status === group).map((task) => <button className="board-task" key={task.id} onClick={() => setSelectedId(task.id)}><small>{task.id}</small><strong>{task.title}</strong><span>{task.assignee}</span></button>)}</div>)}
              </div>
            )}
            <div className="workspace-bottom-note"><span><span className="live-pulse" /> Synced just now</span><span>Showing {visibleTasks.length} issues <span>·</span> <button onClick={() => { setFilterMine(false); setFilterOpen(false); }}>Clear view</button></span></div>
          </section>

          <aside className="issue-details">
            <div className="details-topbar"><span>ISSUE DETAILS</span><div><button aria-label="More issue actions" onClick={() => notify("Issue actions opened")}><MoreHorizontal size={15} /></button><button aria-label="Close details" onClick={() => notify("Details panel stays pinned in this preview")}><X size={14} /></button></div></div>
            <div className="details-content" key={selectedTask.id}>
              <div className="details-id">{selectedTask.id} <span>·</span> <span className="details-priority">{selectedTask.priority} priority</span></div>
              <h4>{selectedTask.title}</h4>
              <p className="details-description">{selectedTask.description}</p>
              <div className="details-properties">
                <div><span>Status</span><strong className={`detail-status ${statusClass[selectedTask.status]}`}><i />{selectedTask.status}</strong></div>
                <div><span>Assignee</span><strong><span className={`issue-assignee avatar-${selectedTask.initials.toLowerCase()}`}>{selectedTask.initials}</span>{selectedTask.assignee}</strong></div>
                <div><span>Due date</span><strong><CalendarDays size={12} /> {selectedTask.due}, 2026</strong></div>
                <div><span>Team</span><strong><span className="team-mini-icon">◈</span> Product</strong></div>
                <div><span>Project</span><strong><Layers3 size={12} /> {selectedTask.project}</strong></div>
              </div>
              <div className="details-section"><div className="details-section-heading"><span>DOCUMENTS</span><button onClick={() => notify("Document attached")}><Plus size={13} /></button></div><button className="detail-resource" onClick={() => notify("Project brief opened")}><FileText size={13} /><span>Product direction brief<small>Updated 2 hours ago</small></span><ArrowUpRight size={12} /></button></div>
              <div className="details-section"><div className="details-section-heading"><span>PROGRESS</span><span>THIS CYCLE</span></div><div className="detail-progress"><div className="detail-progress-label"><strong>Delivery progress</strong><span>68%</span></div><div className="detail-progress-track"><i /></div><div className="progress-chart"><svg viewBox="0 0 240 56" preserveAspectRatio="none" role="img" aria-label="Team progress trend"><path d="M0 43 C22 38 24 20 48 29 S78 37 100 25 S127 33 146 17 S182 25 198 10 S223 17 240 5" /><path className="chart-fill" d="M0 43 C22 38 24 20 48 29 S78 37 100 25 S127 33 146 17 S182 25 198 10 S223 17 240 5 L240 56 L0 56 Z" /></svg></div></div></div>
              <div className="details-footer"><span><Zap size={12} /> Part of a focused week</span><span>Updated 11:06 AM</span></div>
            </div>
          </aside>
        </div>
        {notice && <div className="preview-toast" role="status"><Check size={13} /> {notice} <button onClick={() => setNotice("")} aria-label="Dismiss notification"><X size={12} /></button></div>}
      </div>
      <div className="monitor-stand" aria-hidden="true"><span /></div>
      <div className="preview-caption"><span><span className="live-pulse" /> A workspace that feels like yours</span><span><Command size={12} /> Press <kbd>Ctrl / ⌘ K</kbd> to jump anywhere</span></div>
    </div>
  );
}
