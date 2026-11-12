"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { GlassButton, GlassMenu, GlassNav } from "@zakisheriff/liquid-glass";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowUpRight,
  Command,
  Compass,
  CreditCard,
  House,
  Layers3,
  LayoutDashboard,
  Menu,
  Moon,
  Search,
  Sparkles,
  Sun,
  UsersRound,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { SignupModal } from "./signup-modal";

gsap.registerPlugin(useGSAP);

type CommandItem = {
  label: string;
  detail: string;
  icon: LucideIcon;
  href?: string;
  action?: "signup" | "theme";
};

const commands: CommandItem[] = [
  {
    label: "Open Morrow workspace",
    detail: "Go to your team dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "Explore the product",
    detail: "See the Morrow workspace",
    icon: Layers3,
    href: "/product",
  },
  {
    label: "How it works",
    detail: "Find a steadier team rhythm",
    icon: Workflow,
    href: "/how-it-works",
  },
  {
    label: "For teams",
    detail: "Explore the ways teams work",
    icon: Compass,
    href: "/teams",
  },
  {
    label: "Plans and pricing",
    detail: "Find the right workspace",
    icon: Zap,
    href: "/pricing",
  },
  {
    label: "Our approach",
    detail: "Why we make room for meaningful work",
    icon: Sparkles,
    href: "/about",
  },
  {
    label: "Switch appearance",
    detail: "Toggle light or dark mode",
    icon: Sun,
    action: "theme",
  },
  {
    label: "Start your workspace",
    detail: "Request early access to Morrow",
    icon: Sparkles,
    action: "signup",
  },
];

export function SiteHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [signupOpen, setSignupOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const navItems = [
    { label: "Home", href: "/", icon: House },
    { label: "Product", href: "/product", icon: Layers3 },
    { label: "How it works", href: "/how-it-works", icon: Workflow },
    { label: "For teams", href: "/teams", icon: UsersRound },
    { label: "Pricing", href: "/pricing", icon: CreditCard },
    { label: "Our approach", href: "/about", icon: Compass },
  ];

  const activeIndex = Math.max(
    0,
    navItems.findIndex((item) =>
      item.href === "/"
        ? pathname === "/"
        : pathname === item.href || pathname.startsWith(`${item.href}/`),
    ),
  );

  // Text-only labels keep the library's GlassNav reading as the site's primary
  // navigation, rather than an icon-led in-app tab strip.
  const glassNavItems = navItems.map(({ label }) => ({ label }));

  const mobileMenuItems = [
    ...navItems.map(({ label, href, icon: Icon }) => ({
      label,
      icon: <Icon size={16} strokeWidth={1.8} aria-hidden="true" />,
      checked:
        pathname === href || (href !== "/" && pathname.startsWith(`${href}/`)),
      onSelect: () => router.push(href),
    })),
    {
      label: "Open workspace",
      icon: <LayoutDashboard size={16} />,
      onSelect: () => router.push("/dashboard"),
    },
    {
      label:
        theme === "dark"
          ? "Switch to light appearance"
          : "Switch to dark appearance",
      icon: theme === "dark" ? <Sun size={16} /> : <Moon size={16} />,
      onSelect: () => toggleTheme(),
    },
    {
      label: "Get started",
      icon: <ArrowUpRight size={16} />,
      onSelect: () => setSignupOpen(true),
    },
  ];

  useEffect(() => {
    const saved = window.localStorage.getItem("morrow-theme");
    const nextTheme = saved === "light" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;

    const openSignup = () => setSignupOpen(true);
    const toggleFromPalette = () => {
      setTheme((current) => {
        const next = current === "dark" ? "light" : "dark";
        document.documentElement.dataset.theme = next;
        window.localStorage.setItem("morrow-theme", next);
        return next;
      });
    };
    const handleThemeShortcut = (event: KeyboardEvent) => {
      if (
        !event.shiftKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        event.repeat ||
        event.key.toLowerCase() !== "t"
      ) {
        return;
      }

      const target = event.target;
      const isEditing =
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName));
      const isCommandPaletteInput =
        target instanceof Element && target.closest(".command-dialog");
      if (isEditing && !isCommandPaletteInput) return;

      event.preventDefault();
      toggleFromPalette();
    };

    window.addEventListener("morrow:open-signup", openSignup);
    window.addEventListener("morrow:toggle-theme", toggleFromPalette);
    window.addEventListener("keydown", handleThemeShortcut);
    return () => {
      window.removeEventListener("morrow:open-signup", openSignup);
      window.removeEventListener("morrow:toggle-theme", toggleFromPalette);
      window.removeEventListener("keydown", handleThemeShortcut);
    };
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("morrow-theme", next);
  }

  function navigateTo(index: number) {
    const destination = navItems[index];
    if (destination) router.push(destination.href);
  }

  return (
    <header className="site-header" aria-label="Morrow site navigation">
      <div className="nav-shell">
        <Link className="brand" href="/" aria-label="Morrow home">
          <span className="brand-mark" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>morrow</span>
        </Link>

        {/* GlassNav is the primary navigation surface, not a tab strip nested inside another glass navbar. */}
        <nav className="desktop-nav" aria-label="Main navigation">
          <GlassNav
            className="morrow-page-nav"
            items={glassNavItems}
            activeIndex={activeIndex}
            onChange={navigateTo}
            intensity={5}
            aria-label="Morrow pages"
          />
        </nav>

        <div className="nav-actions">
          <GlassButton
            className="nav-theme-glass-button"
            variant="glass"
            size="sm"
            intensity={4}
            icon={theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            title="Toggle theme"
            onClick={toggleTheme}
          />
          <Link className="nav-login" href="/dashboard">
            Open workspace
          </Link>
          <GlassButton
            className="nav-glass-cta"
            variant="filled"
            tint="var(--accent)"
            size="md"
            intensity={4}
            icon={<ArrowUpRight size={15} />}
            onClick={() => setSignupOpen(true)}
          >
            Get started
          </GlassButton>
          <div className="mobile-glass-menu">
            <GlassMenu
              icon={<Menu size={18} />}
              aria-label="Open navigation menu"
              align="end"
              size="md"
              width={252}
              items={mobileMenuItems}
            />
          </div>
        </div>
      </div>
      <SignupModal open={signupOpen} onClose={() => setSignupOpen(false)} />
    </header>
  );
}

export function CommandPrompt() {
  return (
    <button
      type="button"
      className="proof-note proof-command-button"
      onClick={() => window.dispatchEvent(new Event("morrow:open-command"))}
      aria-label="Open quick navigation command palette"
    >
      <Command size={13} /> Quick search <kbd>Ctrl / ⌘ K</kbd>
    </button>
  );
}

export function ShortcutLauncher() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const openPalette = () => setOpen(true);
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    window.addEventListener("keydown", handleShortcut);
    window.addEventListener("morrow:open-command", openPalette);
    return () => {
      window.removeEventListener("keydown", handleShortcut);
      window.removeEventListener("morrow:open-command", openPalette);
    };
  }, []);

  return <CommandPalette open={open} onClose={() => setOpen(false)} />;
}

export function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (!open) return;

      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".command-backdrop",
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            duration: 0.16,
            ease: "power1.out",
          },
        );
        gsap.fromTo(
          ".command-dialog",
          { autoAlpha: 0, y: 12, scale: 0.99 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.28,
            ease: "power3.out",
          },
        );
        gsap.fromTo(
          ".command-result",
          { autoAlpha: 0, y: 5 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.2,
            stagger: 0.025,
            delay: 0.08,
            ease: "power2.out",
          },
        );
      });
      return () => media.revert();
    },
    { scope: backdropRef, dependencies: [open], revertOnUpdate: true },
  );

  const filteredCommands = useMemo(
    () =>
      commands.filter((item) =>
        `${item.label} ${item.detail}`
          .toLowerCase()
          .includes(query.toLowerCase().trim()),
      ),
    [query],
  );

  useEffect(() => {
    if (!open) {
      setQuery("");
      setActiveIndex(0);
      previouslyFocused.current?.focus();
      return;
    }

    previouslyFocused.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const frame = window.requestAnimationFrame(() => inputRef.current?.focus());
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("keydown", handleKey);
    };
  }, [open, onClose]);

  function runCommand(item: CommandItem) {
    onClose();
    if (item.href) router.push(item.href);
    if (item.action === "signup")
      window.setTimeout(
        () => window.dispatchEvent(new Event("morrow:open-signup")),
        40,
      );
    if (item.action === "theme")
      window.dispatchEvent(new Event("morrow:toggle-theme"));
  }

  function handleInputKeyDown(event: ReactKeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) =>
        filteredCommands.length ? (index + 1) % filteredCommands.length : 0,
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) =>
        filteredCommands.length
          ? (index - 1 + filteredCommands.length) % filteredCommands.length
          : 0,
      );
    } else if (event.key === "Home") {
      event.preventDefault();
      setActiveIndex(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setActiveIndex(Math.max(0, filteredCommands.length - 1));
    } else if (event.key === "Enter" && filteredCommands[activeIndex]) {
      event.preventDefault();
      runCommand(filteredCommands[activeIndex]);
    }
  }

  if (!open) return null;

  const activeCommandId = filteredCommands[activeIndex]
    ? `morrow-command-${activeIndex}`
    : undefined;

  return (
    <div
      ref={backdropRef}
      className="command-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="command-dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Quick navigation"
      >
        <div className="command-search-row">
          <Search size={18} aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={handleInputKeyDown}
            placeholder="Search pages and actions..."
            aria-label="Search pages and actions"
            role="combobox"
            aria-expanded="true"
            aria-controls="morrow-command-list"
            aria-activedescendant={activeCommandId}
            autoComplete="off"
            spellCheck={false}
          />
          <kbd>ESC</kbd>
        </div>
        <div className="command-section-label">
          QUICK JUMP <span>{filteredCommands.length} ACTIONS</span>
        </div>
        <div
          className="command-results"
          id="morrow-command-list"
          role="listbox"
          aria-label="Available actions"
        >
          {filteredCommands.length ? (
            filteredCommands.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  id={`morrow-command-${index}`}
                  key={item.label}
                  type="button"
                  role="option"
                  aria-selected={activeIndex === index}
                  className={`command-result ${activeIndex === index ? "is-active" : ""}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => runCommand(item)}
                >
                  <span className="command-result-icon">
                    <Icon size={15} />
                  </span>
                  <span className="command-result-copy">
                    <strong>{item.label}</strong>
                    <small>{item.detail}</small>
                  </span>
                  {item.action ? (
                    <kbd>{item.action === "theme" ? "⇧ T" : "↵"}</kbd>
                  ) : (
                    <kbd>↵</kbd>
                  )}
                </button>
              );
            })
          ) : (
            <div className="command-empty">No results for “{query}”</div>
          )}
        </div>
        <div className="command-footer">
          <span>
            Move with <kbd>↑</kbd> <kbd>↓</kbd>, select with <kbd>↵</kbd>
          </span>
          <span>
            <kbd>Ctrl / ⌘ K</kbd> to reopen
          </span>
        </div>
      </section>
    </div>
  );
}
