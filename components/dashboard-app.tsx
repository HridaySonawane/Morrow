"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import {
  Activity, ArrowRight, ArrowUpRight, Bell, CalendarDays,
  Check, CheckCheck, ChevronDown, ChevronLeft, ChevronRight, Circle,
  CircleCheck, Clock3, FileText, Flag, FolderKanban,
  Inbox, LayoutDashboard, ListTodo, Menu, MoreHorizontal, Moon, Plus, Search,
  Settings2, SlidersHorizontal, Sparkles, Sun, Target, TrendingUp,
  X, Zap,
} from "lucide-react";

type WorkspaceView = "Overview" | "My tasks" | "Projects" | "Inbox" | "Calendar" | "Reports";
type TaskStatus = "In progress" | "In review" | "Todo" | "Done";
type Priority = "Urgent" | "High" | "Medium" | "Low";

type Task = {
  id: string;
  title: string;
  project: string;
  status: TaskStatus;
  priority: Priority;
  assignee: string;
  initials: string;
  due: string;
  dueTone?: "late" | "soon";
  label: string;
};

type ActivityItem = {
  id: number;
  initials: string;
  name: string;
  action: string;
  target: string;
  time: string;
  tone: string;
  read: boolean;
};

const seedTasks: Task[] = [
  { id: "MRR-128", title: "Finalize the new onboarding flow", project: "Product experience", status: "In progress", priority: "Urgent", assignee: "Olivia Parker", initials: "OP", due: "Today", dueTone: "soon", label: "Design" },
  { id: "MRR-132", title: "Review Q4 launch narrative", project: "Brand refresh", status: "In review", priority: "High", assignee: "Amelia Morgan", initials: "AM", due: "Today", dueTone: "soon", label: "Content" },
  { id: "MRR-136", title: "Connect feedback signals to insights", project: "Product experience", status: "In progress", priority: "High", assignee: "Olivia Parker", initials: "OP", due: "Nov 11", label: "Engineering" },
  { id: "MRR-141", title: "Prepare the design system handoff", project: "Brand refresh", status: "Todo", priority: "Medium", assignee: "Sam Kim", initials: "SK", due: "Nov 12", label: "Design" },
  { id: "MRR-145", title: "Validate the analytics events", project: "Client portal", status: "In progress", priority: "Medium", assignee: "Jules Lee", initials: "JL", due: "Nov 13", label: "Engineering" },
  { id: "MRR-149", title: "Publish the customer story", project: "Launch planning", status: "Done", priority: "Low", assignee: "Amelia Morgan", initials: "AM", due: "Nov 06", label: "Content" },
  { id: "MRR-153", title: "Map the mobile companion journeys", project: "Mobile companion", status: "Todo", priority: "High", assignee: "Sam Kim", initials: "SK", due: "Nov 16", label: "Research" },
];

const seedProjects = [
  { name: "Product experience", code: "PX", color: "violet", status: "On track", progress: 72, done: 18, total: 25, due: "Nov 20", people: ["OP", "AM", "SK"] },
  { name: "Brand refresh", code: "BR", color: "rose", status: "Needs review", progress: 48, done: 12, total: 25, due: "Nov 24", people: ["AM", "JL"] },
  { name: "Client portal", code: "CP", color: "blue", status: "On track", progress: 36, done: 9, total: 25, due: "Dec 02", people: ["JL", "OP", "SK"] },
  { name: "Mobile companion", code: "MC", color: "green", status: "Ahead", progress: 84, done: 21, total: 25, due: "Nov 18", people: ["SK", "AM"] },
];

const seedActivity: ActivityItem[] = [
  { id: 1, initials: "AM", name: "Amelia Morgan", action: "completed", target: "Homepage content audit", time: "12 min ago", tone: "rose", read: false },
  { id: 2, initials: "SK", name: "Sam Kim", action: "left a comment on", target: "Design system handoff", time: "38 min ago", tone: "blue", read: false },
  { id: 3, initials: "JL", name: "Jules Lee", action: "moved", target: "Analytics events to In progress", time: "1 hour ago", tone: "green", read: true },
  { id: 4, initials: "OP", name: "Olivia Parker", action: "created", target: "Onboarding flow improvements", time: "Yesterday", tone: "violet", read: true },
];

const navItems: { label: WorkspaceView; icon: typeof LayoutDashboard; badge?: string }[] = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "My tasks", icon: ListTodo, badge: "5" },
  { label: "Projects", icon: FolderKanban },
  { label: "Inbox", icon: Inbox, badge: "2" },
  { label: "Calendar", icon: CalendarDays },
  { label: "Reports", icon: Activity },
];

const statusTone: Record<TaskStatus, string> = {
  "In progress": "progress",
  "In review": "review",
  Todo: "todo",
  Done: "done",
};

const priorityTone: Record<Priority, string> = {
  Urgent: "urgent",
  High: "high",
  Medium: "medium",
  Low: "low",
};

function BrandMark() {
  return <span className="brand-mark dashboard-brand-mark" aria-hidden="true"><i /><i /><i /></span>;
}

function Avatar({ initials, tone = "violet", small = false }: { initials: string; tone?: string; small?: boolean }) {
  return <span className={`dash-avatar avatar-${tone} ${small ? "is-small" : ""}`} aria-label={initials}>{initials}</span>;
}

function DashboardLogo() {
  return <Link className="dashboard-brand" href="/" aria-label="Morrow home"><BrandMark /><span>morrow</span><span className="dashboard-brand-tag">WORKSPACE</span></Link>;
}

export function DashboardApp() {
  const [view, setView] = useState<WorkspaceView>("Overview");
  const [tasks, setTasks] = useState(seedTasks);
  const [activity, setActivity] = useState(seedActivity);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All status");
  const [priorityFilter, setPriorityFilter] = useState("All priorities");
  const [taskScope, setTaskScope] = useState("Everything");
  const [toast, setToast] = useState("");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [weekOffset, setWeekOffset] = useState(0);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem("morrow-theme");
    const nextTheme = saved === "light" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchRef.current?.focus();
      }
      if (event.key === "Escape") {
        setTaskModalOpen(false);
        setSelectedTask(null);
        setMobileNavOpen(false);
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const filteredTasks = useMemo(() => tasks.filter((task) => {
    const matchesQuery = `${task.title} ${task.project} ${task.id} ${task.assignee}`.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All status" || task.status === statusFilter;
    const matchesPriority = priorityFilter === "All priorities" || task.priority === priorityFilter;
    const matchesScope = taskScope === "Everything" || (taskScope === "Assigned to me" && task.assignee === "Olivia Parker") || (taskScope === "In review" && task.status === "In review");
    return matchesQuery && matchesStatus && matchesPriority && matchesScope;
  }), [tasks, search, statusFilter, priorityFilter, taskScope]);

  const openTasks = tasks.filter((task) => task.status !== "Done").length;
  const completedTasks = tasks.filter((task) => task.status === "Done").length;
  const unreadCount = activity.filter((item) => !item.read).length;

  function showToast(message: string) {
    setToast(message);
  }

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("morrow-theme", next);
  }

  function changeView(nextView: WorkspaceView) {
    setView(nextView);
    setSearch("");
    setStatusFilter("All status");
    setPriorityFilter("All priorities");
    setTaskScope(nextView === "My tasks" ? "Assigned to me" : "Everything");
    setMobileNavOpen(false);
    setSelectedTask(null);
  }

  function toggleTask(taskId: string) {
    setTasks((current) => current.map((task) => task.id === taskId ? { ...task, status: task.status === "Done" ? "In progress" : "Done" } : task));
    const task = tasks.find((item) => item.id === taskId);
    showToast(task?.status === "Done" ? "Task moved back to progress" : "Task marked complete");
    if (selectedTask?.id === taskId && task) setSelectedTask({ ...task, status: task.status === "Done" ? "In progress" : "Done" });
  }

  function updateTaskStatus(taskId: string, status: TaskStatus) {
    setTasks((current) => current.map((task) => task.id === taskId ? { ...task, status } : task));
    setSelectedTask((current) => current?.id === taskId ? { ...current, status } : current);
    showToast(`Status changed to ${status}`);
  }

  function createTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = String(formData.get("title") ?? "").trim();
    const project = String(formData.get("project") ?? "Product experience");
    const priority = String(formData.get("priority") ?? "Medium") as Priority;
    const due = String(formData.get("due") ?? "Nov 18");
    if (!title) return;
    const task: Task = {
      id: `MRR-${Math.floor(160 + Math.random() * 800)}`,
      title,
      project,
      status: "Todo",
      priority,
      assignee: "Olivia Parker",
      initials: "OP",
      due: due || "Nov 18",
      label: "New task",
    };
    setTasks((current) => [task, ...current]);
    setTaskModalOpen(false);
    setView("My tasks");
    setTaskScope("Assigned to me");
    setStatusFilter("All status");
    showToast("Your new task is ready");
  }

  function markAllRead() {
    setActivity((current) => current.map((item) => ({ ...item, read: true })));
    showToast("Inbox marked as read");
  }

  return (
    <div className="dashboard-app">
      {mobileNavOpen && <button type="button" className="dashboard-mobile-backdrop" aria-label="Close navigation" onClick={() => setMobileNavOpen(false)} />}
      <aside className={`dashboard-sidebar ${mobileNavOpen ? "is-open" : ""}`}>
        <div className="dashboard-sidebar-top">
          <DashboardLogo />
          <button type="button" className="dashboard-sidebar-close" onClick={() => setMobileNavOpen(false)} aria-label="Close sidebar"><X size={17} /></button>
          <button type="button" className="dashboard-workspace-switch" onClick={() => showToast("Workspace switcher is ready for connected workspaces")}>
            <span className="workspace-monogram">M</span>
            <span className="dashboard-workspace-copy"><strong>Meridian Studio</strong><small>Pro workspace</small></span>
            <ChevronDown size={14} />
          </button>
          <button type="button" className="dashboard-sidebar-search" onClick={() => searchRef.current?.focus()}><Search size={14} /><span>Search anything</span><kbd>⌘ K</kbd></button>
        </div>

        <div className="dashboard-nav-group">
          <span className="dashboard-nav-label">WORKSPACE</span>
          {navItems.map(({ label, icon: Icon, badge }) => (
            <button key={label} type="button" className={`dashboard-nav-item ${view === label ? "is-active" : ""}`} onClick={() => changeView(label)} aria-current={view === label ? "page" : undefined}>
              <Icon size={16} strokeWidth={1.8} /><span>{label}</span>{badge && <small>{label === "Inbox" ? unreadCount || "" : badge}</small>}
            </button>
          ))}
        </div>

        <div className="dashboard-nav-group dashboard-teams-group">
          <div className="dashboard-nav-label-row"><span className="dashboard-nav-label">YOUR TEAMS</span><button type="button" aria-label="Add team" onClick={() => showToast("Team creation will be available with workspace setup")}><Plus size={14} /></button></div>
          <button type="button" className="dashboard-team-link" onClick={() => changeView("Projects")}><span className="team-dot team-dot-product">◈</span><span>Product</span><ChevronDown size={13} /></button>
          <button type="button" className="dashboard-team-link" onClick={() => changeView("Projects")}><span className="team-dot team-dot-design">✳</span><span>Design</span><span className="team-link-count">4</span></button>
          <button type="button" className="dashboard-team-link" onClick={() => changeView("Projects")}><span className="team-dot team-dot-growth">↗</span><span>Growth</span><span className="team-link-count">3</span></button>
        </div>

        <div className="dashboard-sidebar-bottom">
          <div className="dashboard-upgrade-card"><span className="upgrade-spark"><Sparkles size={15} /></span><strong>Make room for more.</strong><p>Bring the whole team into one calmer workspace.</p><button type="button" onClick={() => showToast("You're already exploring the Pro workspace")}>Explore Pro <ArrowUpRight size={13} /></button></div>
          <button type="button" className="dashboard-nav-item" onClick={() => showToast("Workspace settings are coming soon")}><Settings2 size={16} /><span>Settings</span></button>
          <div className="dashboard-user-profile"><Avatar initials="OP" tone="sand" /><span><strong>Olivia Parker</strong><small>olivia@meridian.co</small></span><button type="button" aria-label="Profile options" onClick={() => showToast("Profile options opened")}><MoreHorizontal size={17} /></button></div>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div className="dashboard-topbar-left">
            <button type="button" className="dashboard-mobile-menu" aria-label="Open navigation" onClick={() => setMobileNavOpen(true)}><Menu size={19} /></button>
            <div className="dashboard-breadcrumb"><span>Meridian Studio</span><span className="breadcrumb-slash">/</span><strong>{view}</strong></div>
          </div>
          <div className="dashboard-topbar-actions">
            <label className="dashboard-global-search"><Search size={15} /><input ref={searchRef} value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search tasks, projects..." aria-label="Search tasks and projects" /><kbd>⌘ K</kbd></label>
            <button type="button" className="dashboard-topbar-icon" onClick={() => changeView("Inbox")} aria-label={`Notifications, ${unreadCount} unread`}><Bell size={17} />{unreadCount > 0 && <i />}</button>
            <span className="dashboard-topbar-divider" />
            <button type="button" className="dashboard-topbar-icon" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>{theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}</button>
            <Avatar initials="OP" tone="sand" />
          </div>
        </header>

        <div className="dashboard-content">
          {view === "Overview" && (
            <OverviewView
              tasks={tasks}
              filteredTasks={filteredTasks}
              activity={activity}
              openTasks={openTasks}
              completedTasks={completedTasks}
              onViewChange={changeView}
              onCreate={() => setTaskModalOpen(true)}
              onSelectTask={setSelectedTask}
              onToggleTask={toggleTask}
              onMarkAllRead={markAllRead}
              onOpenInbox={() => changeView("Inbox")}
              search={search}
              onTaskScope={setTaskScope}
              taskScope={taskScope}
            />
          )}
          {view === "My tasks" && (
            <TaskView
              title="My tasks"
              eyebrow="YOUR WORK / 02"
              subtitle="Keep the next right things close. Your work, priorities, and moving pieces in one place."
              tasks={filteredTasks}
              statusFilter={statusFilter}
              priorityFilter={priorityFilter}
              onStatusFilter={setStatusFilter}
              onPriorityFilter={setPriorityFilter}
              onSelectTask={setSelectedTask}
              onToggleTask={toggleTask}
              onCreate={() => setTaskModalOpen(true)}
              search={search}
            />
          )}
          {view === "Projects" && <ProjectsView onCreate={() => showToast("Project creation will be available in workspace settings")} onProject={(name) => { setSearch(name); setTaskScope("Everything"); setView("My tasks"); showToast(`${name} tasks opened`); }} />}
          {view === "Inbox" && <InboxView activity={activity} onMarkAllRead={markAllRead} onRead={(id) => setActivity((items) => items.map((item) => item.id === id ? { ...item, read: true } : item))} />}
          {view === "Calendar" && <CalendarView tasks={tasks} weekOffset={weekOffset} onPrevious={() => setWeekOffset((value) => value - 1)} onNext={() => setWeekOffset((value) => value + 1)} />}
          {view === "Reports" && <ReportsView tasks={tasks} projects={seedProjects} />}
        </div>
      </main>

      {selectedTask && <TaskDetail task={selectedTask} onClose={() => setSelectedTask(null)} onToggle={() => toggleTask(selectedTask.id)} onStatus={(status) => updateTaskStatus(selectedTask.id, status)} />}
      {taskModalOpen && <NewTaskModal onClose={() => setTaskModalOpen(false)} onSubmit={createTask} />}
      {toast && <div className="dashboard-toast" role="status"><Check size={15} />{toast}</div>}
    </div>
  );
}

function OverviewView({
  tasks, filteredTasks, activity, openTasks, completedTasks, onViewChange, onCreate, onSelectTask, onToggleTask, onMarkAllRead, onOpenInbox, search, onTaskScope, taskScope,
}: {
  tasks: Task[]; filteredTasks: Task[]; activity: ActivityItem[]; openTasks: number; completedTasks: number;
  onViewChange: (view: WorkspaceView) => void; onCreate: () => void; onSelectTask: (task: Task) => void; onToggleTask: (id: string) => void;
  onMarkAllRead: () => void; onOpenInbox: () => void; search: string; onTaskScope: (scope: string) => void; taskScope: string;
}) {
  const activeTasks = tasks.filter((task) => task.status !== "Done");
  return (
    <>
      <div className="dashboard-page-heading dashboard-overview-heading">
        <div><div className="dashboard-eyebrow"><span className="dashboard-live-dot" /> MONDAY, NOVEMBER 09, 2026 <span className="eyebrow-divider" /> WEEK 46</div><h1>Good morning, Olivia<span>.</span></h1><p>Here's the signal behind the work. You're in a good place to make progress.</p></div>
        <button type="button" className="dashboard-primary-button" onClick={onCreate}><Plus size={16} /> New task</button>
      </div>

      <div className="dashboard-metrics-grid">
        <MetricCard label="Open tasks" value={String(openTasks).padStart(2, "0")} change="3 due this week" icon={ListTodo} tone="violet" trend="up" />
        <MetricCard label="Completed this cycle" value={String(completedTasks + 24)} change="12% more than last cycle" icon={CheckCheck} tone="green" trend="up" />
        <MetricCard label="Active projects" value="04" change="All teams moving" icon={FolderKanban} tone="blue" trend="steady" />
        <MetricCard label="Focus time" value="21.5h" change="+2.4h this week" icon={Clock3} tone="rose" trend="up" />
      </div>

      <div className="dashboard-overview-grid">
        <section className="dashboard-panel dashboard-focus-panel">
          <div className="dashboard-panel-heading"><div><span className="dashboard-panel-kicker">THE IMPORTANT THINGS</span><h2>Your focus</h2><p>A short list of what deserves your attention.</p></div><button type="button" className="dashboard-text-link" onClick={() => onViewChange("My tasks")}>View all <ArrowRight size={14} /></button></div>
          <div className="dashboard-task-tabs" role="tablist" aria-label="Task filters">
            {["Everything", "Assigned to me", "In review"].map((scope) => <button type="button" key={scope} role="tab" aria-selected={taskScope === scope} className={taskScope === scope ? "is-selected" : ""} onClick={() => onTaskScope(scope)}>{scope}</button>)}
          </div>
          <div className="dashboard-focus-list">
            {filteredTasks.slice(0, 5).map((task) => <TaskRow key={task.id} task={task} onSelect={() => onSelectTask(task)} onToggle={() => onToggleTask(task.id)} compact />)}
            {filteredTasks.length === 0 && <EmptyState title="Nothing in this view" copy={search ? "Try another search term." : "You're clear here. Take a breath."} />}
          </div>
          <div className="dashboard-focus-footer"><span><span className="dashboard-status-dot" /> {activeTasks.length} pieces of work in motion</span><button type="button" onClick={onCreate}><Plus size={13} /> Add to focus</button></div>
        </section>

        <div className="dashboard-overview-aside">
          <section className="dashboard-panel momentum-panel">
            <div className="dashboard-panel-heading compact-heading"><div><span className="dashboard-panel-kicker">TEAM MOMENTUM</span><h2>Moving well.</h2></div><button type="button" className="dashboard-kebab" aria-label="Momentum options" onClick={() => onViewChange("Reports")}><MoreHorizontal size={17} /></button></div>
            <div className="momentum-score-row"><strong>78<span>%</span></strong><span className="momentum-change"><TrendingUp size={13} /> 8.4%</span></div>
            <p className="momentum-copy">of planned work is on track this cycle</p>
            <MomentumChart />
            <div className="momentum-legend"><span><i className="legend-lilac" /> Completed</span><span><i className="legend-track" /> Planned</span><strong>LAST 7 DAYS</strong></div>
          </section>

          <section className="dashboard-panel project-spotlight-panel">
            <div className="dashboard-panel-heading compact-heading"><div><span className="dashboard-panel-kicker">IN THE SPOTLIGHT</span><h2>Product experience</h2></div><span className="project-state-pill"><i /> On track</span></div>
            <div className="spotlight-progress-copy"><strong>72%</strong><span>18 of 25 tasks complete</span></div>
            <div className="spotlight-progress-track"><i /></div>
            <div className="spotlight-bottom"><div className="avatar-stack-small"><Avatar initials="OP" tone="sand" small /><Avatar initials="AM" tone="rose" small /><Avatar initials="SK" tone="blue" small /><span>+2</span></div><span>Due Nov 20 <ArrowUpRight size={12} /></span></div>
          </section>
        </div>
      </div>

      <div className="dashboard-bottom-grid">
        <section className="dashboard-panel projects-overview-panel">
          <div className="dashboard-panel-heading"><div><span className="dashboard-panel-kicker">A WIDER VIEW</span><h2>Projects in motion</h2><p>How the bigger picture is coming together.</p></div><button type="button" className="dashboard-text-link" onClick={() => onViewChange("Projects")}>All projects <ArrowRight size={14} /></button></div>
          <div className="project-overview-list">{seedProjects.slice(0, 3).map((project) => <ProjectProgressRow key={project.name} project={project} />)}</div>
        </section>
        <section className="dashboard-panel activity-overview-panel">
          <div className="dashboard-panel-heading"><div><span className="dashboard-panel-kicker">THE LATEST</span><h2>Team activity</h2><p>Small steps, adding up.</p></div><button type="button" className="dashboard-kebab" aria-label="Open inbox" onClick={onOpenInbox}><ArrowUpRight size={16} /></button></div>
          <div className="dashboard-activity-list">{activity.slice(0, 3).map((item) => <ActivityRow key={item.id} item={item} />)}</div>
          <div className="activity-panel-footer"><span>{activity.filter((item) => !item.read).length} unread updates</span><button type="button" onClick={onMarkAllRead}>Mark all read</button></div>
        </section>
      </div>
    </>
  );
}

function MetricCard({ label, value, change, icon: Icon, tone, trend }: { label: string; value: string; change: string; icon: typeof Activity; tone: string; trend: "up" | "steady" }) {
  return <article className="dashboard-metric-card"><div className="metric-card-top"><span>{label}</span><span className={`metric-icon metric-${tone}`}><Icon size={16} /></span></div><div className="metric-card-value">{value}</div><div className="metric-card-foot"><span className={trend === "up" ? "metric-trend-up" : "metric-trend-steady"}>{trend === "up" ? <ArrowUpRight size={12} /> : <Circle size={8} />}{change}</span></div></article>;
}

function TaskRow({ task, onSelect, onToggle, compact = false }: { task: Task; onSelect: () => void; onToggle: () => void; compact?: boolean }) {
  return (
    <div className={`dashboard-task-row ${compact ? "is-compact" : ""}`}>
      <button type="button" className={`task-complete-button ${task.status === "Done" ? "is-done" : ""}`} aria-label={task.status === "Done" ? `Reopen ${task.title}` : `Complete ${task.title}`} onClick={onToggle}>{task.status === "Done" ? <Check size={12} /> : <span />}</button>
      <button type="button" className="dashboard-task-main" onClick={onSelect}><strong>{task.title}</strong><span><span>{task.id}</span><i />{task.project}</span></button>
      <span className={`dashboard-priority priority-${priorityTone[task.priority]}`}><Flag size={11} />{task.priority}</span>
      <span className={`dashboard-task-status status-${statusTone[task.status]}`}><i />{task.status}</span>
      <span className={`dashboard-task-due ${task.dueTone === "soon" ? "due-soon" : ""}`}>{task.due}</span>
      <Avatar initials={task.initials} tone={task.initials === "OP" ? "sand" : task.initials === "AM" ? "rose" : task.initials === "SK" ? "blue" : "green"} small />
    </div>
  );
}

function ProjectProgressRow({ project }: { project: (typeof seedProjects)[number] }) {
  return <div className="project-progress-row"><span className={`project-code project-${project.color}`}>{project.code}</span><span className="project-progress-name"><strong>{project.name}</strong><small>{project.done} of {project.total} tasks</small></span><div className="project-progress-track"><i style={{ width: `${project.progress}%` }} /></div><strong className="project-progress-value">{project.progress}%</strong><span className={`project-status-label ${project.status === "Needs review" ? "is-review" : ""}`}>{project.status}</span></div>;
}

function ActivityRow({ item }: { item: ActivityItem }) {
  return <div className={`dashboard-activity-item ${!item.read ? "is-unread" : ""}`}><Avatar initials={item.initials} tone={item.tone} small /><div><p><strong>{item.name}</strong> {item.action} <b>{item.target}</b></p><span>{item.time}</span></div>{!item.read && <i className="activity-unread-dot" />}</div>;
}

function MomentumChart() {
  return <div className="momentum-chart-wrap"><svg viewBox="0 0 320 102" role="img" aria-label="Team momentum increased steadily over the last seven days" preserveAspectRatio="none"><defs><linearGradient id="momentum-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#b58aff" stopOpacity=".26" /><stop offset="100%" stopColor="#b58aff" stopOpacity="0" /></linearGradient></defs><path d="M0 80 C18 76 28 82 45 68 S78 61 91 64 S115 52 137 57 S165 44 183 49 S211 36 229 43 S257 27 276 33 S301 19 320 15 L320 102 L0 102Z" fill="url(#momentum-fill)" /><path d="M0 80 C18 76 28 82 45 68 S78 61 91 64 S115 52 137 57 S165 44 183 49 S211 36 229 43 S257 27 276 33 S301 19 320 15" fill="none" stroke="#bc98ff" strokeWidth="2.4" strokeLinecap="round" /><path d="M0 88 C25 82 35 87 58 78 S91 73 112 76 S153 67 176 70 S213 60 234 65 S272 54 291 57 S309 51 320 49" fill="none" stroke="rgba(185,174,207,.34)" strokeWidth="1.5" strokeDasharray="4 5" /></svg><div className="momentum-chart-days"><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span></div></div>;
}

function TaskView({ title, eyebrow, subtitle, tasks, statusFilter, priorityFilter, onStatusFilter, onPriorityFilter, onSelectTask, onToggleTask, onCreate, search }: {
  title: string; eyebrow: string; subtitle: string; tasks: Task[]; statusFilter: string; priorityFilter: string;
  onStatusFilter: (value: string) => void; onPriorityFilter: (value: string) => void; onSelectTask: (task: Task) => void; onToggleTask: (id: string) => void; onCreate: () => void; search: string;
}) {
  return <>
    <div className="dashboard-page-heading"><div><div className="dashboard-eyebrow">{eyebrow}</div><h1>{title}<span>.</span></h1><p>{subtitle}</p></div><button type="button" className="dashboard-primary-button" onClick={onCreate}><Plus size={16} /> New task</button></div>
    <section className="dashboard-panel task-view-panel"><div className="task-view-toolbar"><div><strong>{tasks.length} tasks</strong><span> · Sorted by priority</span></div><div className="task-view-filters"><label><SlidersHorizontal size={14} /><select value={statusFilter} onChange={(event) => onStatusFilter(event.target.value)} aria-label="Filter by status"><option>All status</option><option>In progress</option><option>In review</option><option>Todo</option><option>Done</option></select></label><label><Flag size={13} /><select value={priorityFilter} onChange={(event) => onPriorityFilter(event.target.value)} aria-label="Filter by priority"><option>All priorities</option><option>Urgent</option><option>High</option><option>Medium</option><option>Low</option></select></label></div></div>
      <div className="dashboard-task-table-head"><span>ISSUE</span><span>PRIORITY</span><span>STATUS</span><span>DUE DATE</span><span>ASSIGNEE</span></div>
      {tasks.length ? tasks.map((task) => <TaskRow key={task.id} task={task} onSelect={() => onSelectTask(task)} onToggle={() => onToggleTask(task.id)} />) : <EmptyState title="No tasks match" copy={search ? "Try adjusting your search or filters." : "You're all caught up here."} />}
    </section>
  </>;
}

function ProjectsView({ onCreate, onProject }: { onCreate: () => void; onProject: (name: string) => void }) {
  return <>
    <div className="dashboard-page-heading"><div><div className="dashboard-eyebrow">THE BIGGER PICTURE / 03</div><h1>Projects<span>.</span></h1><p>A connected view of the work your teams are moving forward.</p></div><button type="button" className="dashboard-primary-button" onClick={onCreate}><Plus size={16} /> New project</button></div>
    <div className="project-view-summary"><div><span>ACTIVE PROJECTS</span><strong>04</strong><small>Across 3 teams</small></div><div><span>TASKS COMPLETED</span><strong>60<span>%</span></strong><small>Cycle progress overall</small></div><div><span>ON TRACK</span><strong>03</strong><small>One needs a review</small></div></div>
    <div className="dashboard-project-grid">{seedProjects.map((project) => <button type="button" key={project.name} className="dashboard-project-card" onClick={() => onProject(project.name)}><div className="dashboard-project-card-top"><span className={`project-code project-${project.color}`}>{project.code}</span><span className={`project-status-label ${project.status === "Needs review" ? "is-review" : ""}`}>{project.status}</span><MoreHorizontal size={17} /></div><h2>{project.name}</h2><p>{project.done} of {project.total} tasks completed</p><div className="project-card-progress"><i style={{ width: `${project.progress}%` }} /></div><div className="project-card-meta"><strong>{project.progress}%</strong><span>Due {project.due}</span><div className="avatar-stack-small">{project.people.map((person, index) => <Avatar key={`${person}-${index}`} initials={person} tone={person === "OP" ? "sand" : person === "AM" ? "rose" : person === "SK" ? "blue" : "green"} small />)}</div></div><span className="project-card-open">View project <ArrowUpRight size={14} /></span></button>)}</div>
  </>;
}

function InboxView({ activity, onMarkAllRead, onRead }: { activity: ActivityItem[]; onMarkAllRead: () => void; onRead: (id: number) => void }) {
  return <>
    <div className="dashboard-page-heading"><div><div className="dashboard-eyebrow">STAY IN THE LOOP / 04</div><h1>Inbox<span>.</span></h1><p>Updates that help you stay close to the work, without pulling you away from it.</p></div><button type="button" className="dashboard-secondary-button" onClick={onMarkAllRead}><CheckCheck size={15} /> Mark all as read</button></div>
    <section className="dashboard-panel inbox-panel"><div className="inbox-panel-heading"><div><span className="dashboard-panel-kicker">RECENT UPDATES</span><h2>You're in the loop.</h2></div><span>{activity.filter((item) => !item.read).length} unread</span></div>{activity.map((item) => <button type="button" className={`inbox-activity-row ${item.read ? "is-read" : ""}`} key={item.id} onClick={() => onRead(item.id)}><Avatar initials={item.initials} tone={item.tone} /><div><p><strong>{item.name}</strong> {item.action} <b>{item.target}</b></p><span>{item.time} · Product team</span></div>{!item.read && <i className="activity-unread-dot" />}</button>)}</section>
  </>;
}

function CalendarView({ tasks, weekOffset, onPrevious, onNext }: { tasks: Task[]; weekOffset: number; onPrevious: () => void; onNext: () => void }) {
  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const dates = weekOffset === 0 ? [9, 10, 11, 12, 13, 14, 15] : weekOffset > 0 ? [16, 17, 18, 19, 20, 21, 22] : [2, 3, 4, 5, 6, 7, 8];
  const scheduled = [
    [{ time: "10:00", title: "Weekly product sync", type: "meeting" }, { time: "14:00", title: "Onboarding review", type: "task" }],
    [{ time: "11:30", title: "Design critique", type: "meeting" }],
    [{ time: "09:30", title: "Feedback signals", type: "task" }, { time: "15:00", title: "Research playback", type: "meeting" }],
    [{ time: "13:00", title: "System handoff", type: "task" }],
    [{ time: "10:30", title: "Launch checkpoint", type: "meeting" }],
    [], [],
  ];
  return <>
    <div className="dashboard-page-heading"><div><div className="dashboard-eyebrow">MAKE SPACE FOR THE WORK / 05</div><h1>Calendar<span>.</span></h1><p>A little structure for the week ahead. Keep the important moments in view.</p></div><div className="calendar-week-controls"><button type="button" onClick={onPrevious} aria-label="Previous week"><ChevronLeft size={16} /></button><span>{weekOffset === 0 ? "Nov 09 – 15, 2026" : weekOffset > 0 ? "Nov 16 – 22, 2026" : "Nov 02 – 08, 2026"}</span><button type="button" onClick={onNext} aria-label="Next week"><ChevronRight size={16} /></button></div></div>
    <section className="dashboard-panel calendar-panel"><div className="calendar-week-grid">{days.map((day, index) => <div className={`calendar-day ${index === 0 && weekOffset === 0 ? "is-today" : ""}`} key={day}><div className="calendar-day-heading"><span>{day}</span><strong>{dates[index]}</strong></div><div className="calendar-day-events">{scheduled[index].map((event) => <div className={`calendar-event event-${event.type}`} key={`${event.time}-${event.title}`}><span>{event.time}</span><strong>{event.title}</strong></div>)}{index === 2 && <div className="calendar-event event-due"><span>ALL DAY</span><strong>{tasks.filter((task) => task.due === "Nov 11").length || 1} tasks due</strong></div>}</div></div>)}</div><div className="calendar-legend"><span><i className="legend-meeting" /> Meetings</span><span><i className="legend-task" /> Focus blocks</span><span><i className="legend-due" /> Due dates</span></div></section>
  </>;
}

function ReportsView({ tasks, projects }: { tasks: Task[]; projects: typeof seedProjects }) {
  const done = tasks.filter((task) => task.status === "Done").length;
  return <>
    <div className="dashboard-page-heading"><div><div className="dashboard-eyebrow">CONTEXT, NOT MORE NOISE / 06</div><h1>Reports<span>.</span></h1><p>Understand the pace of the work, spot patterns, and decide what needs attention.</p></div><button type="button" className="dashboard-secondary-button" onClick={() => window.print()}><FileText size={15} /> Export snapshot</button></div>
    <div className="report-metrics-grid"><MetricCard label="Cycle completion" value="78%" change="8.4% from last cycle" icon={Target} tone="violet" trend="up" /><MetricCard label="Tasks completed" value={String(24 + done)} change="Across 4 active projects" icon={CheckCheck} tone="green" trend="up" /><MetricCard label="Average cycle time" value="2.8d" change="0.4 days faster" icon={Zap} tone="amber" trend="up" /></div>
    <div className="reports-layout"><section className="dashboard-panel report-chart-panel"><div className="dashboard-panel-heading"><div><span className="dashboard-panel-kicker">CYCLE VELOCITY</span><h2>Work is finding its rhythm.</h2><p>Completed work across the last six weeks.</p></div><span className="report-period">LAST 6 WEEKS <ChevronDown size={13} /></span></div><div className="report-chart"><div className="report-axis"><span>40</span><span>30</span><span>20</span><span>10</span><span>0</span></div><svg viewBox="0 0 600 220" preserveAspectRatio="none" role="img" aria-label="Completed work trend chart"><defs><linearGradient id="report-area" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#b58aff" stopOpacity=".25" /><stop offset="100%" stopColor="#b58aff" stopOpacity="0" /></linearGradient></defs><path d="M0 173 C40 160 55 165 100 145 S160 155 200 128 S265 133 300 110 S358 118 400 84 S470 95 500 62 S560 55 600 34 L600 220 L0 220Z" fill="url(#report-area)" /><path d="M0 173 C40 160 55 165 100 145 S160 155 200 128 S265 133 300 110 S358 118 400 84 S470 95 500 62 S560 55 600 34" stroke="#b58aff" strokeWidth="3" fill="none" strokeLinecap="round" /></svg></div><div className="report-axis-labels"><span>OCT 05</span><span>OCT 12</span><span>OCT 19</span><span>OCT 26</span><span>NOV 02</span><span>NOV 09</span></div></section><section className="dashboard-panel report-breakdown-panel"><div className="dashboard-panel-heading"><div><span className="dashboard-panel-kicker">PROJECT HEALTH</span><h2>Across the team</h2></div></div>{projects.map((project) => <div className="report-project-row" key={project.name}><div><span>{project.name}</span><strong>{project.progress}%</strong></div><div className="report-project-track"><i style={{ width: `${project.progress}%` }} /></div></div>)}</section></div>
  </>;
}

function TaskDetail({ task, onClose, onToggle, onStatus }: { task: Task; onClose: () => void; onToggle: () => void; onStatus: (status: TaskStatus) => void }) {
  return <div className="dashboard-drawer-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><aside className="dashboard-task-drawer" role="dialog" aria-modal="true" aria-label={`Task details: ${task.title}`}><div className="drawer-topline"><span>{task.id}</span><button type="button" onClick={onClose} aria-label="Close task details"><X size={18} /></button></div><div className="drawer-title-wrap"><span className="dashboard-panel-kicker">TASK DETAILS</span><h2>{task.title}</h2><span className="drawer-project-label"><FolderKanban size={13} /> {task.project}</span></div><div className="drawer-actions"><button type="button" className="dashboard-secondary-button" onClick={onToggle}>{task.status === "Done" ? <Circle size={14} /> : <Check size={14} />}{task.status === "Done" ? "Reopen task" : "Mark complete"}</button><button type="button" className="dashboard-kebab" aria-label="More task options"><MoreHorizontal size={17} /></button></div><div className="drawer-property-list"><div><span>Status</span><select value={task.status} onChange={(event) => onStatus(event.target.value as TaskStatus)} aria-label="Task status"><option>Todo</option><option>In progress</option><option>In review</option><option>Done</option></select></div><div><span>Priority</span><strong className={`dashboard-priority priority-${priorityTone[task.priority]}`}><Flag size={12} /> {task.priority}</strong></div><div><span>Assignee</span><strong><Avatar initials={task.initials} tone={task.initials === "OP" ? "sand" : task.initials === "AM" ? "rose" : "blue"} small /> {task.assignee}</strong></div><div><span>Due date</span><strong><CalendarDays size={14} /> {task.due}</strong></div><div><span>Label</span><strong className="drawer-label-tag">{task.label}</strong></div></div><div className="drawer-description"><span className="dashboard-panel-kicker">DESCRIPTION</span><p>Keep this piece of work moving with clear ownership, a visible next step, and enough context for the team to make progress without another meeting.</p></div><div className="drawer-activity"><span className="dashboard-panel-kicker">LATEST ACTIVITY</span><div><Avatar initials={task.initials} tone={task.initials === "OP" ? "sand" : "rose"} small /><p><strong>{task.assignee}</strong> updated this task <span>Today</span></p></div></div></aside></div>;
}

function NewTaskModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: (event: FormEvent<HTMLFormElement>) => void }) {
  return <div className="dashboard-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section className="dashboard-new-task-modal" role="dialog" aria-modal="true" aria-labelledby="new-task-title"><div className="new-task-modal-heading"><div><span className="dashboard-panel-kicker">MAKE IT MOVE</span><h2 id="new-task-title">Create a task</h2><p>Start with the next clear step.</p></div><button type="button" onClick={onClose} aria-label="Close new task dialog"><X size={18} /></button></div><form onSubmit={onSubmit}><label className="new-task-title-field"><span>Task name</span><input name="title" autoFocus placeholder="What needs to get done?" required maxLength={100} /></label><div className="new-task-form-grid"><label><span>Project</span><select name="project"><option>Product experience</option><option>Brand refresh</option><option>Client portal</option><option>Launch planning</option><option>Mobile companion</option></select></label><label><span>Priority</span><select name="priority"><option>Medium</option><option>Urgent</option><option>High</option><option>Low</option></select></label><label><span>Due date</span><select name="due"><option>Nov 11</option><option>Nov 12</option><option>Nov 13</option><option>Nov 16</option><option>Nov 18</option><option>Nov 20</option></select></label></div><div className="new-task-modal-footer"><span><kbd>ESC</kbd> to cancel</span><div><button type="button" className="dashboard-secondary-button" onClick={onClose}>Cancel</button><button type="submit" className="dashboard-primary-button"><Plus size={15} /> Create task</button></div></div></form></section></div>;
}

function EmptyState({ title, copy }: { title: string; copy: string }) {
  return <div className="dashboard-empty-state"><span><CircleCheck size={18} /></span><strong>{title}</strong><p>{copy}</p></div>;
}
