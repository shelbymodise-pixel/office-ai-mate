import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

const NAV = [
  { to: "/", icon: "🏠", label: "Dashboard" },
  { to: "/email", icon: "✉️", label: "Email Generator" },
  { to: "/meetings", icon: "📝", label: "Meeting Summarizer" },
  { to: "/planner", icon: "📅", label: "Task Planner" },
  { to: "/research", icon: "🔎", label: "Research Assistant" },
] as const;

export const DISCLAIMER =
  "Responsible AI: WorkMate AI provides AI-generated assistance and information. Users should review and verify AI-generated content before using it for important workplace, employment, legal, financial, or other high-impact decisions.";

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="flex flex-col gap-1">
      {NAV.map((item) => {
        const active = pathname === item.to;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={
              active
                ? "flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-foreground"
                : "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
            }
          >
            <span aria-hidden>{item.icon}</span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-accent to-glow font-display text-xl font-black text-accent-foreground shadow-[0_0_30px_-4px] shadow-accent/70">
        W
      </div>
      <div>
        <div className="font-display text-lg font-extrabold leading-none tracking-tight">
          WorkMate AI
        </div>
        <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Workplace Assistant
        </div>
      </div>
    </div>
  );
}

export function AppShell({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="anim-drift absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-accent/25 blur-[130px]" />
        <div className="anim-drift2 absolute -right-32 top-1/3 h-[460px] w-[460px] rounded-full bg-glow/25 blur-[140px]" />
        <div className="absolute bottom-[-160px] left-1/4 h-[420px] w-[420px] rounded-full bg-accent/10 blur-[150px]" />
        <div className="grid-backdrop absolute inset-0" />
      </div>

      <div className="lg:grid lg:grid-cols-[264px_1fr]">
        <aside className="sticky top-0 hidden h-screen flex-col gap-1 border-r border-white/10 p-6 lg:flex">
          <div className="mb-8">
            <Brand />
          </div>
          <NavLinks />
          <div className="glass mt-auto rounded-2xl p-4">
            <div className="text-[11px] font-semibold uppercase tracking-widest text-accent">
              Enter → Generate → Review
            </div>
            <p className="mt-1 text-sm leading-snug text-muted-foreground">
              Every answer is drafted from what you provide. Always review before sending.
            </p>
          </div>
        </aside>

        <main className="min-w-0">
          <header className="glass sticky top-0 z-20 flex items-center gap-4 border-b border-white/10 px-5 py-4 sm:px-6">
            <button
              type="button"
              aria-label="Open navigation"
              onClick={() => setMenuOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-lg border border-white/15 text-lg lg:hidden"
            >
              ☰
            </button>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] uppercase tracking-[0.25em] text-accent">{eyebrow}</div>
              <div className="truncate font-display text-lg font-extrabold tracking-tight sm:text-xl">
                {title}
              </div>
            </div>
            <div className="glass-strong hidden items-center gap-2 rounded-full px-3 py-1.5 text-xs text-muted-foreground md:flex">
              <span className="anim-floaty h-2 w-2 rounded-full bg-accent" />
              AI online
            </div>
          </header>

          <div className="space-y-10 p-5 sm:p-6 lg:p-10">
            {children}
            <p className="max-w-3xl border-t border-white/10 pt-6 text-xs leading-relaxed text-muted-foreground">
              {DISCLAIMER}
            </p>
          </div>
        </main>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 bg-background/80"
          />
          <div className="glass-strong absolute inset-y-0 left-0 w-[264px] max-w-[82vw] p-6">
            <div className="mb-8 flex items-start justify-between gap-2">
              <Brand />
              <button
                type="button"
                aria-label="Close navigation"
                onClick={() => setMenuOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-lg border border-white/15 text-sm"
              >
                ✕
              </button>
            </div>
            <NavLinks onNavigate={() => setMenuOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
