"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Bell,
  CalendarDays,
  Check,
  CheckCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Circle,
  CircleCheck,
  FileText,
  Flag,
  FolderKanban,
  Inbox,
  LayoutDashboard,
  ListTodo,
  Menu,
  MoreHorizontal,
  Moon,
  Plus,
  Search,
  PanelLeftClose,
  PanelLeftOpen,
  Settings2,
  SlidersHorizontal,
  Sparkles,
  Sun,
  X,
} from "lucide-react";

gsap.registerPlugin(useGSAP);

type WorkspaceView =
  | "Overview"
  | "My tasks"
  | "Projects"
  | "Inbox"
  | "Calendar"
  | "Reports";
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
  dueDate?: string;
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
  {
    id: "MRR-128",
    title: "Finalize the new onboarding flow",
    project: "Product experience",
    status: "In progress",
    priority: "Urgent",
    assignee: "Olivia Parker",
    initials: "OP",
    due: "Today",
    dueTone: "soon",
    label: "Design",
  },
  {
    id: "MRR-132",
    title: "Review Q4 launch narrative",
    project: "Brand refresh",
    status: "In review",
    priority: "High",
    assignee: "Amelia Morgan",
    initials: "AM",
    due: "Today",
    dueTone: "soon",
    label: "Content",
  },
  {
    id: "MRR-136",
    title: "Connect feedback signals to insights",
    project: "Product experience",
    status: "In progress",
    priority: "High",
    assignee: "Olivia Parker",
    initials: "OP",
    due: "Nov 11",
    label: "Engineering",
  },
  {
    id: "MRR-141",
    title: "Prepare the design system handoff",
    project: "Brand refresh",
    status: "Todo",
    priority: "Medium",
    assignee: "Sam Kim",
    initials: "SK",
    due: "Nov 12",
    label: "Design",
  },
  {
    id: "MRR-145",
    title: "Validate the analytics events",
    project: "Client portal",
    status: "In progress",
    priority: "Medium",
    assignee: "Jules Lee",
    initials: "JL",
    due: "Nov 13",
    label: "Engineering",
  },
  {
    id: "MRR-149",
    title: "Publish the customer story",
    project: "Launch planning",
    status: "Done",
    priority: "Low",
    assignee: "Amelia Morgan",
    initials: "AM",
    due: "Nov 06",
    label: "Content",
  },
  {
    id: "MRR-153",
    title: "Map the mobile companion journeys",
    project: "Mobile companion",
    status: "Todo",
    priority: "High",
    assignee: "Sam Kim",
    initials: "SK",
    due: "Nov 16",
    label: "Research",
  },
];

const seedProjects = [
  {
    name: "Product experience",
    code: "PX",
    color: "violet",
    status: "On track",
    progress: 72,
    done: 18,
    total: 25,
    due: "Nov 20",
    people: ["OP", "AM", "SK"],
  },
  {
    name: "Brand refresh",
    code: "BR",
    color: "rose",
    status: "Needs review",
    progress: 48,
    done: 12,
    total: 25,
    due: "Nov 24",
    people: ["AM", "JL"],
  },
  {
    name: "Client portal",
    code: "CP",
    color: "blue",
    status: "On track",
    progress: 36,
    done: 9,
    total: 25,
    due: "Dec 02",
    people: ["JL", "OP", "SK"],
  },
  {
    name: "Mobile companion",
    code: "MC",
    color: "green",
    status: "Ahead",
    progress: 84,
    done: 21,
    total: 25,
    due: "Nov 18",
    people: ["SK", "AM"],
  },
];

const seedActivity: ActivityItem[] = [
  {
    id: 1,
    initials: "AM",
    name: "Amelia Morgan",
    action: "completed",
    target: "Homepage content audit",
    time: "12 min ago",
    tone: "rose",
    read: false,
  },
  {
    id: 2,
    initials: "SK",
    name: "Sam Kim",
    action: "left a comment on",
    target: "Design system handoff",
    time: "38 min ago",
    tone: "blue",
    read: false,
  },
  {
    id: 3,
    initials: "JL",
    name: "Jules Lee",
    action: "moved",
    target: "Analytics events to In progress",
    time: "1 hour ago",
    tone: "green",
    read: true,
  },
  {
    id: 4,
    initials: "OP",
    name: "Olivia Parker",
    action: "created",
    target: "Onboarding flow improvements",
    time: "Yesterday",
    tone: "violet",
    read: true,
  },
];

const navItems: {
  label: WorkspaceView;
  icon: typeof LayoutDashboard;
  badge?: string;
}[] = [
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
  return (
    <span className="brand-mark dashboard-brand-mark" aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

function Avatar({
  initials,
  tone = "violet",
  small = false,
}: {
  initials: string;
  tone?: string;
  small?: boolean;
}) {
  return (
    <span
      className={`dash-avatar avatar-${tone} ${small ? "is-small" : ""}`}
      aria-label={initials}
    >
      {initials}
    </span>
  );
}

function DashboardLogo() {
  return (
    <Link className="dashboard-brand" href="/" aria-label="Morrow home">
      <BrandMark />
      <span>morrow</span>
      <span className="dashboard-brand-tag">WORKSPACE</span>
    </Link>
  );
}

export function DashboardApp() {
  const [view, setView] = useState<WorkspaceView>("Overview");
  const motionScope = useRef<HTMLDivElement>(null);
  const toastRef = useRef<HTMLDivElement>(null);
  const previousView = useRef(view);

  useGSAP(
    () => {
      if (previousView.current === view) return;
      previousView.current = view;

      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const panels = gsap.utils.toArray<HTMLElement>(
          ".dashboard-content > *",
          motionScope.current,
        );
        gsap.from(panels, {
          autoAlpha: 0,
          y: 12,
          duration: 0.42,
          stagger: 0.045,
          ease: "power2.out",
        });
      });
      return () => media.revert();
    },
    { scope: motionScope, dependencies: [view], revertOnUpdate: true },
  );
  const [tasks, setTasks] = useState(seedTasks);
  const [activity, setActivity] = useState(seedActivity);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [newTaskDefaultDue, setNewTaskDefaultDue] = useState("Nov 18");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All status");
  const [priorityFilter, setPriorityFilter] = useState("All priorities");
  const [taskScope, setTaskScope] = useState("Everything");
  const [toast, setToast] = useState("");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [weekOffset, setWeekOffset] = useState(0);
  const searchRef = useRef<HTMLInputElement>(null);

  useGSAP(
    () => {
      if (!toastRef.current) return;
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          toastRef.current,
          { autoAlpha: 0, y: 10 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.24,
            ease: "power2.out",
          },
        );
      });
      return () => media.revert();
    },
    { scope: motionScope, dependencies: [toast], revertOnUpdate: true },
  );

  useEffect(() => {
    const saved = window.localStorage.getItem("morrow-theme");
    const nextTheme = saved === "light" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    setSidebarCollapsed(
      window.localStorage.getItem("morrow-sidebar-collapsed") === "true",
    );
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchRef.current?.focus();
      }
      if (
        event.shiftKey &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.altKey &&
        !event.repeat &&
        event.key.toLowerCase() === "t"
      ) {
        const target = event.target;
        const isEditing =
          target instanceof HTMLElement &&
          (target.isContentEditable ||
            /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName));
        if (!isEditing) {
          event.preventDefault();
          setTheme((current) => {
            const next = current === "dark" ? "light" : "dark";
            document.documentElement.dataset.theme = next;
            window.localStorage.setItem("morrow-theme", next);
            return next;
          });
        }
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

  const filteredTasks = useMemo(
    () =>
      tasks.filter((task) => {
        const matchesQuery =
          `${task.title} ${task.project} ${task.id} ${task.assignee}`
            .toLowerCase()
            .includes(search.toLowerCase());
        const matchesStatus =
          statusFilter === "All status" || task.status === statusFilter;
        const matchesPriority =
          priorityFilter === "All priorities" ||
          task.priority === priorityFilter;
        const matchesScope =
          taskScope === "Everything" ||
          (taskScope === "Assigned to me" &&
            task.assignee === "Olivia Parker") ||
          (taskScope === "In review" && task.status === "In review");
        return matchesQuery && matchesStatus && matchesPriority && matchesScope;
      }),
    [tasks, search, statusFilter, priorityFilter, taskScope],
  );

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

  function toggleSidebar() {
    setSidebarCollapsed((current) => {
      const next = !current;
      window.localStorage.setItem("morrow-sidebar-collapsed", String(next));
      return next;
    });
  }

  function openNewTask(due = "Nov 18") {
    setNewTaskDefaultDue(due);
    setTaskModalOpen(true);
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
    setTasks((current) =>
      current.map((task) =>
        task.id === taskId
          ? { ...task, status: task.status === "Done" ? "In progress" : "Done" }
          : task,
      ),
    );
    const task = tasks.find((item) => item.id === taskId);
    showToast(
      task?.status === "Done"
        ? "Task moved back to progress"
        : "Task marked complete",
    );
    if (selectedTask?.id === taskId && task)
      setSelectedTask({
        ...task,
        status: task.status === "Done" ? "In progress" : "Done",
      });
  }

  function updateTaskStatus(taskId: string, status: TaskStatus) {
    setTasks((current) =>
      current.map((task) => (task.id === taskId ? { ...task, status } : task)),
    );
    setSelectedTask((current) =>
      current?.id === taskId ? { ...current, status } : current,
    );
    showToast(`Status changed to ${status}`);
  }

  function createTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = String(formData.get("title") ?? "").trim();
    const project = String(formData.get("project") ?? "Product experience");
    const priority = String(formData.get("priority") ?? "Medium") as Priority;
    const dueValue = String(formData.get("due") ?? newTaskDefaultDue);
    const dueDate = /^\d{4}-\d{2}-\d{2}$/.test(dueValue) ? dueValue : undefined;
    const due = dueDate ? formatShortDate(parseIsoDate(dueDate)) : dueValue;
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
      dueDate,
      label: "New task",
    };
    setTasks((current) => [task, ...current]);
    setTaskModalOpen(false);
    if (view !== "Calendar") {
      setView("My tasks");
      setTaskScope("Assigned to me");
      setStatusFilter("All status");
      showToast("Your new task is ready");
    } else {
      showToast("Task added to your calendar");
    }
  }

  function markAllRead() {
    setActivity((current) => current.map((item) => ({ ...item, read: true })));
    showToast("Inbox marked as read");
  }

  return (
    <div
      className={`dashboard-app ${sidebarCollapsed ? "is-sidebar-collapsed" : ""}`}
      ref={motionScope}
    >
      {mobileNavOpen && (
        <button
          type="button"
          className="dashboard-mobile-backdrop"
          aria-label="Close navigation"
          onClick={() => setMobileNavOpen(false)}
        />
      )}
      <aside
        id="dashboard-sidebar"
        className={`dashboard-sidebar ${mobileNavOpen ? "is-open" : ""}`}
      >
        <div className="dashboard-sidebar-top">
          <DashboardLogo />
          <button
            type="button"
            className="dashboard-sidebar-close"
            onClick={() => setMobileNavOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={17} />
          </button>
          <button
            type="button"
            className="dashboard-workspace-switch"
            aria-label="Juniper Studio workspace"
            title="Juniper Studio workspace"
            onClick={() =>
              showToast("Workspace switcher is ready for connected workspaces")
            }
          >
            <span className="workspace-monogram">M</span>
            <span className="dashboard-workspace-copy">
              <strong>Juniper Studio</strong>
              <small>Pro workspace</small>
            </span>
            <ChevronDown size={14} />
          </button>
          <button
            type="button"
            className="dashboard-sidebar-search"
            aria-label="Search anything"
            title="Search anything"
            onClick={() => searchRef.current?.focus()}
          >
            <Search size={14} />
            <span>Search anything</span>
            <kbd>⌘ K</kbd>
          </button>
        </div>

        <div className="dashboard-nav-group">
          <span className="dashboard-nav-label">WORKSPACE</span>
          {navItems.map(({ label, icon: Icon, badge }) => (
            <button
              key={label}
              type="button"
              className={`dashboard-nav-item ${view === label ? "is-active" : ""}`}
              aria-label={label}
              title={label}
              onClick={() => changeView(label)}
              aria-current={view === label ? "page" : undefined}
            >
              <Icon size={16} strokeWidth={1.8} />
              <span>{label}</span>
              {badge && (
                <small>{label === "Inbox" ? unreadCount || "" : badge}</small>
              )}
            </button>
          ))}
        </div>

        <div className="dashboard-nav-group dashboard-teams-group">
          <div className="dashboard-nav-label-row">
            <span className="dashboard-nav-label">YOUR TEAMS</span>
            <button
              type="button"
              aria-label="Add team"
              onClick={() =>
                showToast(
                  "Team creation will be available with workspace setup",
                )
              }
            >
              <Plus size={14} />
            </button>
          </div>
          <button
            type="button"
            className="dashboard-team-link"
            aria-label="Product team"
            title="Product"
            onClick={() => changeView("Projects")}
          >
            <span className="team-dot team-dot-product">◈</span>
            <span>Product</span>
            <ChevronDown size={13} />
          </button>
          <button
            type="button"
            className="dashboard-team-link"
            aria-label="Design team"
            title="Design"
            onClick={() => changeView("Projects")}
          >
            <span className="team-dot team-dot-design">✳</span>
            <span>Design</span>
            <span className="team-link-count">4</span>
          </button>
          <button
            type="button"
            className="dashboard-team-link"
            aria-label="Growth team"
            title="Growth"
            onClick={() => changeView("Projects")}
          >
            <span className="team-dot team-dot-growth">↗</span>
            <span>Growth</span>
            <span className="team-link-count">3</span>
          </button>
        </div>

        <div className="dashboard-sidebar-bottom">
          <div className="dashboard-upgrade-card">
            <span className="upgrade-spark">
              <Sparkles size={15} />
            </span>
            <strong>Make room for more.</strong>
            <p>Bring the whole team into one calmer workspace.</p>
            <button
              type="button"
              onClick={() =>
                showToast("You're already exploring the Pro workspace")
              }
            >
              Explore Pro <ArrowUpRight size={13} />
            </button>
          </div>
          <button
            type="button"
            className="dashboard-nav-item"
            onClick={() => showToast("Workspace settings are coming soon")}
          >
            <Settings2 size={16} />
            <span>Settings</span>
          </button>
          <div className="dashboard-user-profile">
            <Avatar initials="OP" tone="sand" />
            <span>
              <strong>Olivia Parker</strong>
              <small>olivia@juniper.studio</small>
            </span>
            <button
              type="button"
              aria-label="Profile options"
              onClick={() => showToast("Profile options opened")}
            >
              <MoreHorizontal size={17} />
            </button>
          </div>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div className="dashboard-topbar-left">
            <button
              type="button"
              className="dashboard-mobile-menu"
              aria-label="Open navigation"
              onClick={() => setMobileNavOpen(true)}
            >
              <Menu size={19} />
            </button>
            <button
              type="button"
              className="dashboard-sidebar-toggle"
              aria-label={
                sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
              }
              aria-expanded={!sidebarCollapsed}
              aria-controls="dashboard-sidebar"
              title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              onClick={toggleSidebar}
            >
              {sidebarCollapsed ? (
                <PanelLeftOpen size={17} />
              ) : (
                <PanelLeftClose size={17} />
              )}
            </button>
            <div className="dashboard-breadcrumb">
              <span>Juniper Studio</span>
              <span className="breadcrumb-slash">/</span>
              <strong>{view}</strong>
            </div>
          </div>
          <div className="dashboard-topbar-actions">
            <label className="dashboard-global-search">
              <Search size={15} />
              <input
                ref={searchRef}
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search tasks, projects..."
                aria-label="Search tasks and projects"
              />
              <kbd>⌘ K</kbd>
            </label>
            <button
              type="button"
              className="dashboard-topbar-icon"
              onClick={() => changeView("Inbox")}
              aria-label={`Notifications, ${unreadCount} unread`}
            >
              <Bell size={17} />
              {unreadCount > 0 && <i />}
            </button>
            <span className="dashboard-topbar-divider" />
            <button
              type="button"
              className="dashboard-topbar-icon"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>
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
              onCreate={() => openNewTask()}
              onSelectTask={setSelectedTask}
              onToggleTask={toggleTask}
              onMarkAllRead={markAllRead}
              onOpenInbox={() => changeView("Inbox")}
              search={search}
              onTaskScope={setTaskScope}
              taskScope={taskScope}
              statusFilter={statusFilter}
              onStatusFilter={setStatusFilter}
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
              onCreate={() => openNewTask()}
              search={search}
            />
          )}
          {view === "Projects" && (
            <ProjectsView
              onCreate={() =>
                showToast(
                  "Project creation will be available in workspace settings",
                )
              }
              onProject={(name) => {
                setSearch(name);
                setTaskScope("Everything");
                setView("My tasks");
                showToast(`${name} tasks opened`);
              }}
            />
          )}
          {view === "Inbox" && (
            <InboxView
              activity={activity}
              onMarkAllRead={markAllRead}
              onRead={(id) =>
                setActivity((items) =>
                  items.map((item) =>
                    item.id === id ? { ...item, read: true } : item,
                  ),
                )
              }
            />
          )}
          {view === "Calendar" && (
            <CalendarView
              tasks={tasks}
              weekOffset={weekOffset}
              onPrevious={() => setWeekOffset((value) => value - 1)}
              onNext={() => setWeekOffset((value) => value + 1)}
              onCreateTask={(dueDate) => openNewTask(dueDate)}
              onSelectTask={setSelectedTask}
              onEventSelect={(title, date) => showToast(`${title} · ${date}`)}
            />
          )}
          {view === "Reports" && (
            <ReportsView
              tasks={tasks}
              projects={seedProjects}
              onExploreStatus={(status) => {
                setStatusFilter(status);
                setTaskScope("Everything");
                setSearch("");
                setView("My tasks");
              }}
            />
          )}
        </div>
      </main>

      {selectedTask && (
        <TaskDetail
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onToggle={() => toggleTask(selectedTask.id)}
          onStatus={(status) => updateTaskStatus(selectedTask.id, status)}
        />
      )}
      {taskModalOpen && (
        <NewTaskModal
          onClose={() => setTaskModalOpen(false)}
          onSubmit={createTask}
          defaultDue={newTaskDefaultDue}
        />
      )}
      {toast && (
        <div ref={toastRef} className="dashboard-toast" role="status">
          <Check size={15} />
          {toast}
        </div>
      )}
    </div>
  );
}

function OverviewView({
  tasks,
  filteredTasks,
  activity,
  openTasks,
  completedTasks,
  onViewChange,
  onCreate,
  onSelectTask,
  onToggleTask,
  onMarkAllRead,
  onOpenInbox,
  search,
  onTaskScope,
  taskScope,
  statusFilter,
  onStatusFilter,
}: {
  tasks: Task[];
  filteredTasks: Task[];
  activity: ActivityItem[];
  openTasks: number;
  completedTasks: number;
  onViewChange: (view: WorkspaceView) => void;
  onCreate: () => void;
  onSelectTask: (task: Task) => void;
  onToggleTask: (id: string) => void;
  onMarkAllRead: () => void;
  onOpenInbox: () => void;
  search: string;
  onTaskScope: (scope: string) => void;
  taskScope: string;
  statusFilter: string;
  onStatusFilter: (status: string) => void;
}) {
  const activeTasks = tasks.filter((task) => task.status !== "Done");
  const projectCount = seedProjects.length;
  const nextTask = activeTasks[0];
  return (
    <>
      <header className="dashboard-overview-heading dashboard-daybook">
        <time className="dashboard-daybook-date" dateTime="2026-11-09">
          <span>MON</span>
          <strong>09</strong>
          <small>NOV / 26</small>
        </time>
        <div className="dashboard-daybook-copy">
          <div className="dashboard-daybook-topline">
            <div className="dashboard-eyebrow">
              <span className="dashboard-live-dot" /> JUNIPER STUDIO / YOUR
              WORKSPACE
            </div>
            <button
              type="button"
              className="dashboard-primary-button"
              onClick={onCreate}
            >
              <Plus size={16} /> New task
            </button>
          </div>
          <h1>
            Good morning,
            <br />
            <em>
              <span aria-hidden="true"><ScrambleText value="Olivia" /></span>
              <span className="dashboard-sr-only">Olivia</span>.
            </em>
          </h1>
          <p>Here’s the work that could use your attention today.</p>
        </div>
        {nextTask ? (
          <button
            type="button"
            className="dashboard-daybook-focus"
            onClick={() => onSelectTask(nextTask)}
            aria-label={`Open first focus task: ${nextTask.title}`}
          >
            <span className="daybook-focus-kicker">
              <i /> FIRST UP <span>/</span> {nextTask.project}
            </span>
            <strong>{nextTask.title}</strong>
            <span className="daybook-focus-bottom">
              <span>{nextTask.status}</span>
              <span>
                Open task <ArrowUpRight size={14} />
              </span>
            </span>
          </button>
        ) : (
          <div className="dashboard-daybook-focus is-clear">
            <span className="daybook-focus-kicker">
              <i /> FIRST UP
            </span>
            <strong>Your queue is clear.</strong>
            <span className="daybook-focus-bottom">
              <span>Take a breath</span>
              <span>
                All caught up <Check size={14} />
              </span>
            </span>
          </div>
        )}
      </header>

      <div className="dashboard-kpi-strip" aria-label="Workspace metrics">
        <OverviewMetric
          label="Open issues"
          value={String(openTasks).padStart(2, "0")}
          note="Across all teams"
          tone="violet"
        />
        <OverviewMetric
          label="Completed this cycle"
          value={String(completedTasks + 24)}
          note="12% more than last cycle"
          tone="green"
        />
        <OverviewMetric
          label="Active projects"
          value={String(projectCount).padStart(2, "0")}
          note="Across 3 teams"
          tone="blue"
        />
        <OverviewMetric
          label="Cycle completion"
          value="78%"
          note="8.4% ahead of last cycle"
          tone="rose"
        />
      </div>

      <div className="dashboard-insight-grid">
        <section className="dashboard-panel insight-chart-panel">
          <InsightTrendChart
            kicker="CYCLE INSIGHTS"
            title="Work added and completed"
            description="Weekly issue activity across your workspace."
          />
        </section>
        <section className="dashboard-panel insight-status-panel">
          <StatusDistribution
            tasks={tasks}
            selectedStatus={statusFilter}
            onSelect={(status) =>
              onStatusFilter(statusFilter === status ? "All status" : status)
            }
            helper="Select a status to filter your focus list."
          />
        </section>
      </div>

      <div className="dashboard-overview-grid dashboard-overview-grid-linear">
        <section className="dashboard-panel dashboard-focus-panel">
          <div className="dashboard-panel-heading">
            <div>
              <span className="dashboard-panel-kicker">YOUR WORK QUEUE</span>
              <h2>Focus issues</h2>
              <p>The work that is closest to needing your attention.</p>
            </div>
            <button
              type="button"
              className="dashboard-text-link"
              onClick={() => onViewChange("My tasks")}
            >
              Open issue list <ArrowRight size={14} />
            </button>
          </div>
          <div
            className="dashboard-task-tabs"
            role="tablist"
            aria-label="Task filters"
          >
            {[
              { label: "Everything", value: "Everything" },
              { label: "Assigned to me", value: "Assigned to me" },
              { label: "In review", value: "In review" },
            ].map((scope) => (
              <button
                type="button"
                key={scope.value}
                role="tab"
                aria-selected={taskScope === scope.value}
                className={taskScope === scope.value ? "is-selected" : ""}
                onClick={() => onTaskScope(scope.value)}
              >
                {scope.label}
              </button>
            ))}
            {statusFilter !== "All status" && (
              <button
                type="button"
                className="task-filter-reset"
                onClick={() => onStatusFilter("All status")}
              >
                Clear {statusFilter} ×
              </button>
            )}
          </div>
          <div className="dashboard-task-table-head dashboard-focus-table-head">
            <span>ISSUE</span>
            <span>PRIORITY</span>
            <span>STATUS</span>
            <span>DUE</span>
            <span>ASSIGNEE</span>
          </div>
          <div className="dashboard-focus-list">
            {filteredTasks.slice(0, 5).map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                onSelect={() => onSelectTask(task)}
                onToggle={() => onToggleTask(task.id)}
                compact
              />
            ))}
            {filteredTasks.length === 0 && (
              <EmptyState
                title="Nothing in this view"
                copy={
                  search
                    ? "Try another search term."
                    : "You're clear here. Take a breath."
                }
              />
            )}
          </div>
          <div className="dashboard-focus-footer">
            <span>
              <span className="dashboard-status-dot" /> {activeTasks.length}{" "}
              open issues across the workspace
            </span>
            <button type="button" onClick={onCreate}>
              <Plus size={13} /> Create issue
            </button>
          </div>
        </section>

        <section className="dashboard-panel projects-overview-panel dashboard-project-health-panel">
          <div className="dashboard-panel-heading">
            <div>
              <span className="dashboard-panel-kicker">PROJECT HEALTH</span>
              <h2>Projects in motion</h2>
              <p>Progress against current scope.</p>
            </div>
            <button
              type="button"
              className="dashboard-text-link"
              onClick={() => onViewChange("Projects")}
            >
              All projects <ArrowRight size={14} />
            </button>
          </div>
          <div className="project-overview-list">
            {seedProjects.map((project) => (
              <ProjectProgressRow key={project.name} project={project} />
            ))}
          </div>
          <div className="project-health-foot">
            <span>
              <i className="health-dot is-on-track" /> 3 on track
            </span>
            <span>
              <i className="health-dot is-review" /> 1 needs review
            </span>
          </div>
        </section>
      </div>

      <section className="dashboard-panel activity-overview-panel dashboard-recent-activity-panel">
        <div className="dashboard-panel-heading">
          <div>
            <span className="dashboard-panel-kicker">WORKSPACE FEED</span>
            <h2>Recent activity</h2>
            <p>Updates from across your teams.</p>
          </div>
          <button
            type="button"
            className="dashboard-text-link"
            onClick={onOpenInbox}
          >
            Open inbox <ArrowUpRight size={14} />
          </button>
        </div>
        <div className="dashboard-activity-list dashboard-activity-horizontal">
          {activity.slice(0, 3).map((item) => (
            <ActivityRow key={item.id} item={item} />
          ))}
        </div>
        <div className="activity-panel-footer">
          <span>
            {activity.filter((item) => !item.read).length} unread updates
          </span>
          <button type="button" onClick={onMarkAllRead}>
            Mark all read
          </button>
        </div>
      </section>
    </>
  );
}

function OverviewMetric({
  label,
  value,
  note,
  tone,
}: {
  label: string;
  value: string;
  note: string;
  tone: string;
}) {
  return (
    <article className={`overview-metric metric-tone-${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{note}</small>
    </article>
  );
}

const insightData = {
  "6w": [
    { label: "Oct 05", created: 16, completed: 11 },
    { label: "Oct 12", created: 18, completed: 12 },
    { label: "Oct 19", created: 14, completed: 13 },
    { label: "Oct 26", created: 23, completed: 17 },
    { label: "Nov 02", created: 21, completed: 18 },
    { label: "Nov 09", created: 26, completed: 22 },
  ],
  "12w": [
    { label: "Aug 24", created: 9, completed: 7 },
    { label: "Aug 31", created: 12, completed: 9 },
    { label: "Sep 07", created: 15, completed: 11 },
    { label: "Sep 14", created: 13, completed: 10 },
    { label: "Sep 21", created: 17, completed: 12 },
    { label: "Sep 28", created: 18, completed: 14 },
    { label: "Oct 05", created: 16, completed: 11 },
    { label: "Oct 12", created: 18, completed: 12 },
    { label: "Oct 19", created: 14, completed: 13 },
    { label: "Oct 26", created: 23, completed: 17 },
    { label: "Nov 02", created: 21, completed: 18 },
    { label: "Nov 09", created: 26, completed: 22 },
  ],
};

type InsightDatum = (typeof insightData)["6w"][number];

function InsightTrendChart({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: string;
  description: string;
}) {
  const [range, setRange] = useState<"6w" | "12w">("6w");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const chart = chartRef.current;
      if (!chart || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const lines = gsap.utils.toArray<SVGPathElement>(
        ".insight-created-line, .insight-completed-line",
        chart,
      );
      const timeline = gsap.timeline();

      lines.forEach((line, index) => {
        const length = line.getTotalLength();
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
        timeline.to(
          line,
          {
            strokeDashoffset: 0,
            duration: 0.9,
            ease: "power2.out",
            onComplete: () =>
              gsap.set(line, { clearProps: "strokeDasharray,strokeDashoffset" }),
          },
          index === 0 ? 0 : 0.12,
        );
      });

      timeline.fromTo(
        ".insight-completed-area",
        { opacity: 0 },
        { opacity: 1, duration: 0.65, ease: "power1.out" },
        0.18,
      );
      timeline.fromTo(
        ".insight-created-dot, .insight-completed-dot",
        { opacity: 0, scale: 0.25, transformOrigin: "center center" },
        {
          opacity: 1,
          scale: 1,
          duration: 0.24,
          stagger: 0.025,
          ease: "back.out(1.7)",
        },
        0.42,
      );
      timeline.fromTo(
        ".insight-x-axis-label",
        { opacity: 0, y: 4 },
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.025, ease: "power1.out" },
        0.48,
      );
    },
    { scope: chartRef, dependencies: [range], revertOnUpdate: true },
  );

  const data: InsightDatum[] = insightData[range];
  const maxValue =
    Math.ceil(
      Math.max(...data.flatMap((item) => [item.created, item.completed])) / 10,
    ) * 10;
  const plot = { left: 44, right: 700, top: 18, bottom: 205 };
  const points = data.map((item, index) => ({
    ...item,
    x:
      plot.left +
      (index / Math.max(1, data.length - 1)) * (plot.right - plot.left),
    completedY:
      plot.bottom - (item.completed / maxValue) * (plot.bottom - plot.top),
    createdY:
      plot.bottom - (item.created / maxValue) * (plot.bottom - plot.top),
  }));
  const completedPath = points
    .map(
      (point, index) =>
        `${index === 0 ? "M" : "L"} ${point.x} ${point.completedY}`,
    )
    .join(" ");
  const createdPath = points
    .map(
      (point, index) =>
        `${index === 0 ? "M" : "L"} ${point.x} ${point.createdY}`,
    )
    .join(" ");
  const completedArea = `${completedPath} L ${plot.right} ${plot.bottom} L ${plot.left} ${plot.bottom} Z`;
  const totals = data.reduce(
    (result, item) => ({
      created: result.created + item.created,
      completed: result.completed + item.completed,
    }),
    { created: 0, completed: 0 },
  );
  const activeIndex = hoveredIndex ?? selectedIndex;
  const active = activeIndex === null ? null : points[activeIndex];
  const ticks = [0, 1, 2, 3, 4].map((step) =>
    Math.round(maxValue - (maxValue / 4) * step),
  );

  return (
    <>
      <div className="dashboard-panel-heading insight-panel-heading">
        <div>
          <span className="dashboard-panel-kicker">{kicker}</span>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div
          className="insight-range-switch"
          role="group"
          aria-label="Chart time range"
        >
          <button
            type="button"
            aria-pressed={range === "6w"}
            className={range === "6w" ? "is-active" : ""}
            onClick={() => {
              setRange("6w");
              setHoveredIndex(null);
              setSelectedIndex(null);
            }}
          >
            6 weeks
          </button>
          <button
            type="button"
            aria-pressed={range === "12w"}
            className={range === "12w" ? "is-active" : ""}
            onClick={() => {
              setRange("12w");
              setHoveredIndex(null);
              setSelectedIndex(null);
            }}
          >
            12 weeks
          </button>
        </div>
      </div>
      <div className="insight-chart-summary">
        <div>
          <strong>{totals.completed}</strong>
          <span>Completed</span>
        </div>
        <div>
          <strong>{totals.created}</strong>
          <span>Created</span>
        </div>
        <div className="insight-active-readout" aria-live="polite">
          {active ? (
            <>
              <strong>{active.label}</strong>
              <span>
                {active.completed} completed · {active.created} created
              </span>
            </>
          ) : (
            <span>Select a point to inspect a week</span>
          )}
        </div>
      </div>
      <div className="insight-trend-chart" ref={chartRef}>
        <svg
          viewBox="0 0 720 244"
          preserveAspectRatio="none"
          role="group"
          aria-label={`${title}: completed and created issues by week`}
        >
          <defs>
            <linearGradient
              id="morrow-insight-area"
              x1="0"
              x2="0"
              y1="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="var(--dash-purple)"
                stopOpacity=".24"
              />
              <stop
                offset="100%"
                stopColor="var(--dash-purple)"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>
          {ticks.map((tick, index) => {
            const y = plot.top + (index / 4) * (plot.bottom - plot.top);
            return (
              <g key={tick}>
                <line
                  x1={plot.left}
                  x2={plot.right}
                  y1={y}
                  y2={y}
                  className="insight-grid-line"
                />
                <text
                  x="31"
                  y={y + 4}
                  className="insight-axis-tick"
                  textAnchor="end"
                >
                  {tick}
                </text>
              </g>
            );
          })}
          <path
            d={completedArea}
            className="insight-completed-area"
            fill="url(#morrow-insight-area)"
          />
          <path d={createdPath} className="insight-created-line" />
          <path d={completedPath} className="insight-completed-line" />
          {points.map((point, index) => (
            <g
              key={point.label}
              className={`insight-point ${activeIndex === index ? "is-active" : ""}`}
              role="button"
              tabIndex={0}
              aria-label={`${point.label}: ${point.completed} completed and ${point.created} created`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onFocus={() => setHoveredIndex(index)}
              onBlur={() => setHoveredIndex(null)}
              onClick={() => setSelectedIndex(index)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setSelectedIndex(index);
                }
              }}
            >
              <circle
                cx={point.x}
                cy={point.createdY}
                r="8"
                className="insight-point-hit"
              />
              <circle
                cx={point.x}
                cy={point.createdY}
                r="3.4"
                className="insight-created-dot"
              />
              <circle
                cx={point.x}
                cy={point.completedY}
                r="8"
                className="insight-point-hit"
              />
              <circle
                cx={point.x}
                cy={point.completedY}
                r="4.3"
                className="insight-completed-dot"
              />
              <title>{`${point.label}: ${point.completed} completed, ${point.created} created`}</title>
            </g>
          ))}
          {points.map((point, index) => (
            <text
              key={`${point.label}-axis`}
              x={point.x}
              y="233"
              className="insight-x-axis-label"
              textAnchor="middle"
            >
              {range === "12w" && index % 2 !== 0 && index !== points.length - 1
                ? ""
                : point.label}
            </text>
          ))}
        </svg>
      </div>
      <div className="insight-chart-footer">
        <div className="insight-chart-legend">
          <span>
            <i className="legend-completed" /> Completed
          </span>
          <span>
            <i className="legend-created" /> Created
          </span>
        </div>
        <span>Illustrative workspace data</span>
      </div>
    </>
  );
}

const issueStatuses: {
  status: TaskStatus;
  label: string;
  className: string;
}[] = [
  { status: "In progress", label: "In progress", className: "progress" },
  { status: "In review", label: "In review", className: "review" },
  { status: "Todo", label: "Todo", className: "todo" },
  { status: "Done", label: "Done", className: "done" },
];

function StatusDistribution({
  tasks,
  selectedStatus,
  onSelect,
  helper,
  onExplore,
}: {
  tasks: Task[];
  selectedStatus?: string;
  onSelect?: (status: TaskStatus) => void;
  helper?: string;
  onExplore?: (status: TaskStatus) => void;
}) {
  const total = tasks.length;
  const counts = issueStatuses.map((item) => ({
    ...item,
    count: tasks.filter((task) => task.status === item.status).length,
  }));
  return (
    <>
      <div className="dashboard-panel-heading">
        <div>
          <span className="dashboard-panel-kicker">ISSUE BREAKDOWN</span>
          <h2>Issues by status</h2>
          <p>{total} issues in the current workspace view.</p>
        </div>
        <span className="status-total">{total}</span>
      </div>
      <div
        className="status-stacked-bar"
        role="group"
        aria-label="Issue distribution by status"
      >
        {counts
          .filter((item) => item.count > 0)
          .map((item) => (
            <button
              key={item.status}
              type="button"
              className={`status-segment status-${item.className} ${selectedStatus === item.status ? "is-selected" : ""}`}
              style={{ width: `${(item.count / Math.max(total, 1)) * 100}%` }}
              aria-label={`${item.label}: ${item.count} issues`}
              title={`${item.label}: ${item.count}`}
              onClick={() => {
                onSelect?.(item.status);
                onExplore?.(item.status);
              }}
            />
          ))}
      </div>
      <div className="status-breakdown-list">
        {counts.map((item) => (
          <button
            type="button"
            key={item.status}
            className={`status-breakdown-row ${selectedStatus === item.status ? "is-selected" : ""}`}
            onClick={() => {
              onSelect?.(item.status);
              onExplore?.(item.status);
            }}
          >
            <span
              className={`status-indicator status-indicator-${item.className}`}
            />
            <span>{item.label}</span>
            <strong>{item.count}</strong>
            <small>{total ? Math.round((item.count / total) * 100) : 0}%</small>
          </button>
        ))}
      </div>
      <p className="status-distribution-helper">
        {helper || "Select a status to explore matching issues."}
      </p>
    </>
  );
}

function TaskRow({
  task,
  onSelect,
  onToggle,
  compact = false,
}: {
  task: Task;
  onSelect: () => void;
  onToggle: () => void;
  compact?: boolean;
}) {
  return (
    <div className={`dashboard-task-row ${compact ? "is-compact" : ""}`}>
      <button
        type="button"
        className={`task-complete-button ${task.status === "Done" ? "is-done" : ""}`}
        aria-label={
          task.status === "Done"
            ? `Reopen ${task.title}`
            : `Complete ${task.title}`
        }
        onClick={onToggle}
      >
        {task.status === "Done" ? <Check size={12} /> : <span />}
      </button>
      <button type="button" className="dashboard-task-main" onClick={onSelect}>
        <strong>{task.title}</strong>
        <span>
          <span>{task.id}</span>
          <i />
          {task.project}
        </span>
      </button>
      <span
        className={`dashboard-priority priority-${priorityTone[task.priority]}`}
      >
        <Flag size={11} />
        {task.priority}
      </span>
      <span
        className={`dashboard-task-status status-${statusTone[task.status]}`}
      >
        <i />
        {task.status}
      </span>
      <span
        className={`dashboard-task-due ${task.dueTone === "soon" ? "due-soon" : ""}`}
      >
        {task.due}
      </span>
      <Avatar
        initials={task.initials}
        tone={
          task.initials === "OP"
            ? "sand"
            : task.initials === "AM"
              ? "rose"
              : task.initials === "SK"
                ? "blue"
                : "green"
        }
        small
      />
    </div>
  );
}

function ProjectProgressRow({
  project,
}: {
  project: (typeof seedProjects)[number];
}) {
  return (
    <div className="project-progress-row">
      <span className={`project-code project-${project.color}`}>
        {project.code}
      </span>
      <span className="project-progress-name">
        <strong>{project.name}</strong>
        <small>
          {project.done} of {project.total} tasks
        </small>
      </span>
      <div className="project-progress-track">
        <i style={{ width: `${project.progress}%` }} />
      </div>
      <strong className="project-progress-value">{project.progress}%</strong>
      <span
        className={`project-status-label ${project.status === "Needs review" ? "is-review" : ""}`}
      >
        {project.status}
      </span>
    </div>
  );
}

function ActivityRow({ item }: { item: ActivityItem }) {
  return (
    <div className={`dashboard-activity-item ${!item.read ? "is-unread" : ""}`}>
      <Avatar initials={item.initials} tone={item.tone} small />
      <div>
        <p>
          <strong>{item.name}</strong> {item.action} <b>{item.target}</b>
        </p>
        <span>{item.time}</span>
      </div>
      {!item.read && <i className="activity-unread-dot" />}
    </div>
  );
}

function TaskView({
  title,
  eyebrow,
  subtitle,
  tasks,
  statusFilter,
  priorityFilter,
  onStatusFilter,
  onPriorityFilter,
  onSelectTask,
  onToggleTask,
  onCreate,
  search,
}: {
  title: string;
  eyebrow: string;
  subtitle: string;
  tasks: Task[];
  statusFilter: string;
  priorityFilter: string;
  onStatusFilter: (value: string) => void;
  onPriorityFilter: (value: string) => void;
  onSelectTask: (task: Task) => void;
  onToggleTask: (id: string) => void;
  onCreate: () => void;
  search: string;
}) {
  return (
    <>
      <div className="dashboard-page-heading">
        <div>
          <div className="dashboard-eyebrow">{eyebrow}</div>
          <h1>
            {title}
            <span>.</span>
          </h1>
          <p>{subtitle}</p>
        </div>
        <button
          type="button"
          className="dashboard-primary-button"
          onClick={onCreate}
        >
          <Plus size={16} /> New task
        </button>
      </div>
      <section className="dashboard-panel task-view-panel">
        <div className="task-view-toolbar">
          <div>
            <strong>{tasks.length} tasks</strong>
            <span> · Sorted by priority</span>
          </div>
          <div className="task-view-filters">
            <label>
              <SlidersHorizontal size={14} />
              <select
                value={statusFilter}
                onChange={(event) => onStatusFilter(event.target.value)}
                aria-label="Filter by status"
              >
                <option>All status</option>
                <option>In progress</option>
                <option>In review</option>
                <option>Todo</option>
                <option>Done</option>
              </select>
            </label>
            <label>
              <Flag size={13} />
              <select
                value={priorityFilter}
                onChange={(event) => onPriorityFilter(event.target.value)}
                aria-label="Filter by priority"
              >
                <option>All priorities</option>
                <option>Urgent</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </label>
          </div>
        </div>
        <div className="dashboard-task-table-head">
          <span>ISSUE</span>
          <span>PRIORITY</span>
          <span>STATUS</span>
          <span>DUE DATE</span>
          <span>ASSIGNEE</span>
        </div>
        {tasks.length ? (
          tasks.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              onSelect={() => onSelectTask(task)}
              onToggle={() => onToggleTask(task.id)}
            />
          ))
        ) : (
          <EmptyState
            title="No tasks match"
            copy={
              search
                ? "Try adjusting your search or filters."
                : "You're all caught up here."
            }
          />
        )}
      </section>
    </>
  );
}

function ProjectsView({
  onCreate,
  onProject,
}: {
  onCreate: () => void;
  onProject: (name: string) => void;
}) {
  return (
    <>
      <div className="dashboard-page-heading">
        <div>
          <div className="dashboard-eyebrow">THE BIGGER PICTURE / 03</div>
          <h1>
            Projects<span>.</span>
          </h1>
          <p>A connected view of the work your teams are moving forward.</p>
        </div>
        <button
          type="button"
          className="dashboard-primary-button"
          onClick={onCreate}
        >
          <Plus size={16} /> New project
        </button>
      </div>
      <div className="project-view-summary">
        <div>
          <span>ACTIVE PROJECTS</span>
          <strong>04</strong>
          <small>Across 3 teams</small>
        </div>
        <div>
          <span>TASKS COMPLETED</span>
          <strong>
            60<span>%</span>
          </strong>
          <small>Cycle progress overall</small>
        </div>
        <div>
          <span>ON TRACK</span>
          <strong>03</strong>
          <small>One needs a review</small>
        </div>
      </div>
      <div className="dashboard-project-grid">
        {seedProjects.map((project) => (
          <button
            type="button"
            key={project.name}
            className="dashboard-project-card"
            onClick={() => onProject(project.name)}
          >
            <div className="dashboard-project-card-top">
              <span className={`project-code project-${project.color}`}>
                {project.code}
              </span>
              <span
                className={`project-status-label ${project.status === "Needs review" ? "is-review" : ""}`}
              >
                {project.status}
              </span>
              <MoreHorizontal size={17} />
            </div>
            <h2>{project.name}</h2>
            <p>
              {project.done} of {project.total} tasks completed
            </p>
            <div className="project-card-progress">
              <i style={{ width: `${project.progress}%` }} />
            </div>
            <div className="project-card-meta">
              <strong>{project.progress}%</strong>
              <span>Due {project.due}</span>
              <div className="avatar-stack-small">
                {project.people.map((person, index) => (
                  <Avatar
                    key={`${person}-${index}`}
                    initials={person}
                    tone={
                      person === "OP"
                        ? "sand"
                        : person === "AM"
                          ? "rose"
                          : person === "SK"
                            ? "blue"
                            : "green"
                    }
                    small
                  />
                ))}
              </div>
            </div>
            <span className="project-card-open">
              View project <ArrowUpRight size={14} />
            </span>
          </button>
        ))}
      </div>
    </>
  );
}

function InboxView({
  activity,
  onMarkAllRead,
  onRead,
}: {
  activity: ActivityItem[];
  onMarkAllRead: () => void;
  onRead: (id: number) => void;
}) {
  return (
    <>
      <div className="dashboard-page-heading">
        <div>
          <div className="dashboard-eyebrow">STAY IN THE LOOP / 04</div>
          <h1>
            Inbox<span>.</span>
          </h1>
          <p>
            Updates that help you stay close to the work, without pulling you
            away from it.
          </p>
        </div>
        <button
          type="button"
          className="dashboard-secondary-button"
          onClick={onMarkAllRead}
        >
          <CheckCheck size={15} /> Mark all as read
        </button>
      </div>
      <section className="dashboard-panel inbox-panel">
        <div className="inbox-panel-heading">
          <div>
            <span className="dashboard-panel-kicker">RECENT UPDATES</span>
            <h2>You're in the loop.</h2>
          </div>
          <span>{activity.filter((item) => !item.read).length} unread</span>
        </div>
        {activity.map((item) => (
          <button
            type="button"
            className={`inbox-activity-row ${item.read ? "is-read" : ""}`}
            key={item.id}
            onClick={() => onRead(item.id)}
          >
            <Avatar initials={item.initials} tone={item.tone} />
            <div>
              <p>
                <strong>{item.name}</strong> {item.action} <b>{item.target}</b>
              </p>
              <span>{item.time} · Product team</span>
            </div>
            {!item.read && <i className="activity-unread-dot" />}
          </button>
        ))}
      </section>
    </>
  );
}

function toIsoDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseIsoDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function formatShortDate(date: Date) {
  return `${date.toLocaleDateString("en-US", { month: "short" })} ${date.getDate()}`;
}

function ScrambleText({ value }: { value: string }) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const characterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&◆◇○●";
        const characters = value.split("");
        const targets = characters
          .map((character, index) => ({ character, element: characterRefs.current[index] }))
          .filter((item): item is { character: string; element: HTMLSpanElement } => Boolean(item.element) && item.character !== " ");
        const intervals: number[] = [];
        const timers: number[] = [];

        const randomCharacter = () => alphabet[Math.floor(Math.random() * alphabet.length)];
        const trackTimeout = (callback: () => void, delay: number) => {
          timers.push(window.setTimeout(callback, delay));
        };
        targets.forEach(({ element }) => {
          element.className = "dashboard-scramble-char is-scrambling";
          element.textContent = randomCharacter();
          intervals.push(window.setInterval(() => {
            element.textContent = randomCharacter();
          }, 52));
        });

        targets.forEach(({ character, element }, index) => {
          trackTimeout(() => {
            window.clearInterval(intervals[index]);
            element.classList.remove("is-scrambling");
            element.classList.add("is-settling");

            let step = 0;
            const maxSteps = 5 + Math.floor(Math.random() * 3);
            const settle = () => {
              step += 1;
              if (step > maxSteps) {
                element.textContent = character;
                element.classList.remove("is-settling");
                element.classList.add("is-resolved", "is-glow-flash");
                gsap.fromTo(element, { y: 6, scale: 0.88 }, {
                  y: 0,
                  scale: 1,
                  duration: 0.52,
                  ease: "back.out(1.7)",
                });
                trackTimeout(() => {
                  element.classList.remove("is-glow-flash");
                  element.classList.add("is-glow-steady");
                }, 300);
                return;
              }

              element.textContent = randomCharacter();
              trackTimeout(settle, 28 + step * step * 8);
            };

            settle();
          }, index * 55);
        });

        return () => {
          intervals.forEach(window.clearInterval);
          timers.forEach(window.clearTimeout);
        };
      });

      return () => media.revert();
    },
    { scope: containerRef, revertOnUpdate: true },
  );

  return (
    <span ref={containerRef} className="dashboard-scramble-text">
      {value.split("").map((character, index) => character === " "
        ? <span className="dashboard-scramble-space" key={`space-${index}`} />
        : <span
            className="dashboard-scramble-char"
            key={`${character}-${index}`}
            ref={(element) => { characterRefs.current[index] = element; }}
          >{character}</span>)}
    </span>
  );
}

function isTaskDueOn(task: Task, date: Date) {
  let taskDate: Date | undefined;
  if (task.dueDate) {
    taskDate = parseIsoDate(task.dueDate);
  } else if (task.due === "Today") {
    taskDate = new Date(2026, 10, 9);
  } else {
    const match = task.due.match(/^([A-Za-z]{3})\s+(\d{1,2})$/);
    const months: Record<string, number> = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
    if (match && months[match[1]] !== undefined) {
      taskDate = new Date(2026, months[match[1]], Number(match[2]));
    }
  }
  return Boolean(taskDate && taskDate.getFullYear() === date.getFullYear() && taskDate.getMonth() === date.getMonth() && taskDate.getDate() === date.getDate());
}

function CalendarView({
  tasks,
  weekOffset,
  onPrevious,
  onNext,
  onCreateTask,
  onSelectTask,
  onEventSelect,
}: {
  tasks: Task[];
  weekOffset: number;
  onPrevious: () => void;
  onNext: () => void;
  onCreateTask: (dueDate: string) => void;
  onSelectTask: (task: Task) => void;
  onEventSelect: (title: string, date: string) => void;
}) {
  const [selectedDay, setSelectedDay] = useState(0);
  const weekStart = new Date(2026, 10, 9 + weekOffset * 7);
  const dates = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + index);
    return date;
  });
  const selectedDate = dates[selectedDay];
  const scheduled = [
    [
      { time: "10:00", title: "Weekly product sync", type: "meeting" },
      { time: "14:00", title: "Onboarding review", type: "task" },
    ],
    [{ time: "11:30", title: "Design critique", type: "meeting" }],
    [
      { time: "09:30", title: "Feedback signals", type: "task" },
      { time: "15:00", title: "Research playback", type: "meeting" },
    ],
    [{ time: "13:00", title: "System handoff", type: "task" }],
    [{ time: "10:30", title: "Launch checkpoint", type: "meeting" }],
    [],
    [],
  ];
  const weekRange = `${dates[0].toLocaleDateString("en-US", { month: "short", day: "2-digit" })} – ${dates[6].toLocaleDateString("en-US", { month: "short", day: "2-digit" })}, ${dates[6].getFullYear()}`;
  return (
    <>
      <div className="dashboard-page-heading">
        <div>
          <div className="dashboard-eyebrow">MAKE SPACE FOR THE WORK / 05</div>
          <h1>
            Calendar<span>.</span>
          </h1>
          <p>
            A little structure for the week ahead. Keep the important moments in
            view.
          </p>
        </div>
        <div className="dashboard-calendar-actions">
          <button type="button" className="dashboard-primary-button dashboard-calendar-new-task" onClick={() => onCreateTask(toIsoDate(selectedDate))}>
            <Plus size={14} /> New task
          </button>
          <div className="calendar-week-controls">
            <button type="button" onClick={onPrevious} aria-label="Previous week">
              <ChevronLeft size={16} />
            </button>
            <span>{weekRange}</span>
            <button type="button" onClick={onNext} aria-label="Next week">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
      <section className="dashboard-panel calendar-panel">
        <div className="calendar-week-grid">
          {dates.map((date, index) => {
            const day = date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
            const dateLabel = date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
            const dueTasks = tasks.filter((task) => isTaskDueOn(task, date));
            return (
              <div
                className={`calendar-day ${date.toDateString() === new Date(2026, 10, 9).toDateString() ? "is-today" : ""} ${selectedDay === index ? "is-selected" : ""}`}
                key={toIsoDate(date)}
              >
                <button
                  type="button"
                  className="calendar-day-heading"
                  aria-pressed={selectedDay === index}
                  aria-label={`Select ${dateLabel}`}
                  onClick={() => setSelectedDay(index)}
                >
                  <span>{day}</span>
                  <strong>{date.getDate()}</strong>
                </button>
                <div className="calendar-day-events">
                  {scheduled[index].map((event) => (
                    <button
                      type="button"
                      className={`calendar-event event-${event.type}`}
                      key={`${event.time}-${event.title}`}
                      onClick={() => {
                        setSelectedDay(index);
                        onEventSelect(event.title, dateLabel);
                      }}
                    >
                      <span>{event.time}</span>
                      <strong>{event.title}</strong>
                    </button>
                  ))}
                  {dueTasks.map((task) => (
                    <button
                      type="button"
                      className="calendar-event event-due"
                      key={task.id}
                      aria-label={`Open task due ${dateLabel}: ${task.title}`}
                      onClick={() => {
                        setSelectedDay(index);
                        onSelectTask(task);
                      }}
                    >
                      <span>Due · {task.id}</span>
                      <strong>{task.title}</strong>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <div className="calendar-legend">
          <span>
            <i className="legend-meeting" /> Meetings
          </span>
          <span>
            <i className="legend-task" /> Focus blocks
          </span>
          <span>
            <i className="legend-due" /> Due dates
          </span>
        </div>
      </section>
    </>
  );
}

function ReportsView({
  tasks,
  projects,
  onExploreStatus,
}: {
  tasks: Task[];
  projects: typeof seedProjects;
  onExploreStatus: (status: TaskStatus) => void;
}) {
  const done = tasks.filter((task) => task.status === "Done").length;
  const open = tasks.length - done;
  return (
    <>
      <div className="dashboard-page-heading">
        <div>
          <div className="dashboard-eyebrow">WORKSPACE ANALYTICS / 06</div>
          <h1>
            Reports<span>.</span>
          </h1>
          <p>
            Understand delivery trends, workload distribution, and project
            health.
          </p>
        </div>
        <button
          type="button"
          className="dashboard-secondary-button"
          onClick={() => window.print()}
        >
          <FileText size={15} /> Export snapshot
        </button>
      </div>
      <div className="dashboard-kpi-strip report-kpi-strip">
        <OverviewMetric
          label="Cycle completion"
          value="78%"
          note="8.4% above last cycle"
          tone="violet"
        />
        <OverviewMetric
          label="Tasks completed"
          value={String(24 + done)}
          note="Across 4 active projects"
          tone="green"
        />
        <OverviewMetric
          label="Open issues"
          value={String(open).padStart(2, "0")}
          note="Across all statuses"
          tone="blue"
        />
        <OverviewMetric
          label="Average cycle time"
          value="2.8d"
          note="0.4 days faster"
          tone="rose"
        />
      </div>
      <div className="reports-insight-grid">
        <section className="dashboard-panel insight-chart-panel report-insight-chart-panel">
          <InsightTrendChart
            kicker="DELIVERY TRENDS"
            title="Created vs. completed"
            description="Compare incoming work with issues completed by the team."
          />
        </section>
        <section className="dashboard-panel insight-status-panel report-status-panel">
          <StatusDistribution
            tasks={tasks}
            onExplore={onExploreStatus}
            helper="Choose a status to open the matching issue list."
          />
        </section>
      </div>
      <section className="dashboard-panel report-project-health">
        <div className="dashboard-panel-heading">
          <div>
            <span className="dashboard-panel-kicker">PROJECT PERFORMANCE</span>
            <h2>Progress by project</h2>
            <p>Completion against the current project scope.</p>
          </div>
          <span className="report-table-note">
            {projects.length} active projects
          </span>
        </div>
        <div
          className="report-project-table"
          role="table"
          aria-label="Project progress report"
        >
          <div className="report-project-table-head" role="row">
            <span role="columnheader">Project</span>
            <span role="columnheader">Completed</span>
            <span role="columnheader">Progress</span>
            <span role="columnheader">Status</span>
            <span role="columnheader">Due date</span>
          </div>
          {projects.map((project) => (
            <div
              className="report-project-table-row"
              role="row"
              key={project.name}
            >
              <span role="cell">
                <i className={`project-code project-${project.color}`}>
                  {project.code}
                </i>
                <strong>{project.name}</strong>
              </span>
              <span role="cell">
                {project.done} / {project.total}
              </span>
              <span role="cell">
                <span className="report-table-progress">
                  <i style={{ width: `${project.progress}%` }} />
                </span>
                <strong>{project.progress}%</strong>
              </span>
              <span role="cell">
                <i
                  className={`report-health-dot ${project.status === "Needs review" ? "is-review" : "is-on-track"}`}
                />
                {project.status}
              </span>
              <span role="cell">{project.due}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function TaskDetail({
  task,
  onClose,
  onToggle,
  onStatus,
}: {
  task: Task;
  onClose: () => void;
  onToggle: () => void;
  onStatus: (status: TaskStatus) => void;
}) {
  const drawerRef = useRef<HTMLElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          backdropRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.18, ease: "power1.out" },
        );
        gsap.fromTo(
          drawerRef.current,
          { autoAlpha: 0, x: 22 },
          { autoAlpha: 1, x: 0, duration: 0.28, ease: "power3.out" },
        );
      });
      return () => media.revert();
    },
    { scope: backdropRef, dependencies: [task.id], revertOnUpdate: true },
  );
  return (
    <div
      ref={backdropRef}
      className="dashboard-drawer-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <aside
        ref={drawerRef}
        className="dashboard-task-drawer"
        role="dialog"
        aria-modal="true"
        aria-label={`Task details: ${task.title}`}
      >
        <div className="drawer-topline">
          <span>{task.id}</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close task details"
          >
            <X size={18} />
          </button>
        </div>
        <div className="drawer-title-wrap">
          <span className="dashboard-panel-kicker">TASK DETAILS</span>
          <h2>{task.title}</h2>
          <span className="drawer-project-label">
            <FolderKanban size={13} /> {task.project}
          </span>
        </div>
        <div className="drawer-actions">
          <button
            type="button"
            className="dashboard-secondary-button"
            onClick={onToggle}
          >
            {task.status === "Done" ? (
              <Circle size={14} />
            ) : (
              <Check size={14} />
            )}
            {task.status === "Done" ? "Reopen task" : "Mark complete"}
          </button>
          <button
            type="button"
            className="dashboard-kebab"
            aria-label="More task options"
          >
            <MoreHorizontal size={17} />
          </button>
        </div>
        <div className="drawer-property-list">
          <div>
            <span>Status</span>
            <select
              value={task.status}
              onChange={(event) => onStatus(event.target.value as TaskStatus)}
              aria-label="Task status"
            >
              <option>Todo</option>
              <option>In progress</option>
              <option>In review</option>
              <option>Done</option>
            </select>
          </div>
          <div>
            <span>Priority</span>
            <strong
              className={`dashboard-priority priority-${priorityTone[task.priority]}`}
            >
              <Flag size={12} /> {task.priority}
            </strong>
          </div>
          <div>
            <span>Assignee</span>
            <strong>
              <Avatar
                initials={task.initials}
                tone={
                  task.initials === "OP"
                    ? "sand"
                    : task.initials === "AM"
                      ? "rose"
                      : "blue"
                }
                small
              />{" "}
              {task.assignee}
            </strong>
          </div>
          <div>
            <span>Due date</span>
            <strong>
              <CalendarDays size={14} /> {task.due}
            </strong>
          </div>
          <div>
            <span>Label</span>
            <strong className="drawer-label-tag">{task.label}</strong>
          </div>
        </div>
        <div className="drawer-description">
          <span className="dashboard-panel-kicker">DESCRIPTION</span>
          <p>
            Keep this piece of work moving with clear ownership, a visible next
            step, and enough context for the team to make progress without
            another meeting.
          </p>
        </div>
        <div className="drawer-activity">
          <span className="dashboard-panel-kicker">LATEST ACTIVITY</span>
          <div>
            <Avatar
              initials={task.initials}
              tone={task.initials === "OP" ? "sand" : "rose"}
              small
            />
            <p>
              <strong>{task.assignee}</strong> updated this task{" "}
              <span>Today</span>
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}

function NewTaskModal({
  onClose,
  onSubmit,
  defaultDue,
}: {
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  defaultDue: string;
}) {
  const dueOptions = ["Nov 11", "Nov 12", "Nov 13", "Nov 16", "Nov 18", "Nov 20"];
  const defaultDueIsDate = /^\d{4}-\d{2}-\d{2}$/.test(defaultDue);
  const customDueLabel = defaultDueIsDate
    ? formatShortDate(parseIsoDate(defaultDue))
    : defaultDue;
  const remainingDueOptions = dueOptions.filter((due) => due !== customDueLabel);
  const modalRef = useRef<HTMLElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          backdropRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.16, ease: "power1.out" },
        );
        gsap.fromTo(
          modalRef.current,
          { autoAlpha: 0, y: 12, scale: 0.99 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.26, ease: "power3.out" },
        );
      });
      return () => media.revert();
    },
    { scope: backdropRef, revertOnUpdate: true },
  );
  return (
    <div
      ref={backdropRef}
      className="dashboard-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        ref={modalRef}
        className="dashboard-new-task-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-task-title"
      >
        <div className="new-task-modal-heading">
          <div>
            <span className="dashboard-panel-kicker">MAKE IT MOVE</span>
            <h2 id="new-task-title">Create a task</h2>
            <p>Start with the next clear step.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close new task dialog"
          >
            <X size={18} />
          </button>
        </div>
        <form onSubmit={onSubmit}>
          <label className="new-task-title-field">
            <span>Task name</span>
            <input
              name="title"
              autoFocus
              placeholder="What needs to get done?"
              required
              maxLength={100}
            />
          </label>
          <div className="new-task-form-grid">
            <label>
              <span>Project</span>
              <select name="project">
                <option>Product experience</option>
                <option>Brand refresh</option>
                <option>Client portal</option>
                <option>Launch planning</option>
                <option>Mobile companion</option>
              </select>
            </label>
            <label>
              <span>Priority</span>
              <select name="priority">
                <option>Medium</option>
                <option>Urgent</option>
                <option>High</option>
                <option>Low</option>
              </select>
            </label>
            <label>
              <span>Due date</span>
              <select name="due" defaultValue={defaultDue}>
                {defaultDueIsDate && (
                  <option value={defaultDue}>{customDueLabel}</option>
                )}
                {remainingDueOptions.map((due) => <option key={due} value={due}>{due}</option>)}
              </select>
            </label>
          </div>
          <div className="new-task-modal-footer">
            <span>
              <kbd>ESC</kbd> to cancel
            </span>
            <div>
              <button
                type="button"
                className="dashboard-secondary-button"
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className="dashboard-primary-button">
                <Plus size={15} /> Create task
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

function EmptyState({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="dashboard-empty-state">
      <span>
        <CircleCheck size={18} />
      </span>
      <strong>{title}</strong>
      <p>{copy}</p>
    </div>
  );
}
