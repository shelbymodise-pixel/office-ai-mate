import { createFileRoute, Link } from "@tanstack/react-router";

import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WorkMate AI — Your Workplace Assistant" },
      {
        name: "description",
        content:
          "Draft emails, summarize meetings, plan tasks and research topics with four AI tools built for everyday workplace work.",
      },
      { property: "og:title", content: "WorkMate AI — Your Workplace Assistant" },
      {
        property: "og:description",
        content: "Work smarter. Communicate better. Get more done.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const TOOLS = [
  {
    to: "/email",
    icon: "✉️",
    tag: "Draft",
    title: "Smart Email Generator",
    copy: "Create professional emails in seconds.",
    cta: "Generate Email",
  },
  {
    to: "/meetings",
    icon: "📝",
    tag: "Digest",
    title: "Meeting Notes Summarizer",
    copy: "Turn long meeting notes into clear summaries and action items.",
    cta: "Summarize Notes",
  },
  {
    to: "/planner",
    icon: "📅",
    tag: "Plan",
    title: "AI Task Planner",
    copy: "Organize, prioritize, and schedule your tasks.",
    cta: "Plan My Tasks",
  },
  {
    to: "/research",
    icon: "🔎",
    tag: "Explore",
    title: "AI Research Assistant",
    copy: "Research topics and turn information into useful insights.",
    cta: "Start Research",
  },
] as const;

function Dashboard() {
  return (
    <AppShell eyebrow="Dashboard" title="Work smarter. Communicate better. Get more done.">
      <section className="grid gap-6 lg:grid-cols-5">
        <div className="glass-strong sheen relative overflow-hidden rounded-3xl p-8 lg:col-span-3 lg:p-10">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/20 blur-3xl" />
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[11px] font-semibold text-accent">
            4 AI tools · 1 workspace
          </div>
          <h1 className="mt-4 font-display text-4xl font-black leading-[0.95] tracking-tighter lg:text-6xl">
            Welcome to
            <br />
            <span className="text-accent">WorkMate AI</span>
          </h1>
          <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
            Your intelligent assistant for everyday workplace tasks — draft emails, summarize
            meetings, plan tasks and research in seconds.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/email"
              className="rounded-xl bg-accent px-5 py-3 text-sm font-bold text-accent-foreground shadow-[0_0_35px_-8px] shadow-accent transition hover:brightness-110"
            >
              Generate Email
            </Link>
            <Link
              to="/research"
              className="rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold transition hover:bg-white/5"
            >
              Explore tools
            </Link>
          </div>
        </div>

        <div className="glass relative flex flex-col justify-between overflow-hidden rounded-3xl p-6 lg:col-span-2">
          <div className="anim-floaty pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-glow/20 blur-2xl" />
          <div className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            How it works
          </div>
          <div className="font-display text-5xl font-black tracking-tighter text-accent">4</div>
          <div className="-mt-1 text-sm text-muted-foreground">steps, every time</div>
          <div className="mt-5 space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-accent" />
              Enter your information
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-accent/60" />
              Click generate
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-accent/40" />
              WorkMate drafts your answer
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-accent/20" />
              Review, copy and use it
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-5 flex items-end justify-between">
          <h2 className="font-display text-2xl font-extrabold tracking-tight">Your AI toolkit</h2>
          <span className="text-xs text-muted-foreground">Enter → Generate → Review</span>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {TOOLS.map((tool) => (
            <Link
              key={tool.to}
              to={tool.to}
              className="glass sheen group rounded-2xl border-t-2 border-t-accent p-5 transition hover:-translate-y-1 hover:bg-white/[0.07]"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl" aria-hidden>
                  {tool.icon}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-accent">
                  {tool.tag}
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-extrabold">{tool.title}</h3>
              <p className="mt-1 text-sm leading-snug text-muted-foreground">{tool.copy}</p>
              <span className="mt-5 block w-full rounded-lg border border-accent/30 bg-accent/15 py-2 text-center text-sm font-bold text-accent transition group-hover:bg-accent group-hover:text-accent-foreground">
                {tool.cta}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="glass-strong relative grid gap-8 overflow-hidden rounded-3xl p-6 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:p-8">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-accent">
            How WorkMate writes
          </span>
          <h3 className="mt-2 font-display text-2xl font-extrabold tracking-tight">
            Generated from your input, ready to review
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            WorkMate drafts from only what you provide — no invented names, dates or prices. Missing
            details stay neutral until you clarify.
          </p>
        </div>
        <div className="glass rounded-2xl p-5">
          <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Subject</div>
          <div className="font-display text-lg font-bold text-accent">
            Leave Request — [dates you provide]
          </div>
          <div className="my-3 h-px bg-white/10" />
          <div className="text-[11px] uppercase tracking-widest text-muted-foreground">Body</div>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            Dear [Manager], I would like to request annual leave. I have ensured my current tasks
            are up to date and will remain reachable for anything urgent.
          </p>
          <div className="mt-4 flex items-center gap-2 text-[11px] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Based only on your input · verify before sending
          </div>
        </div>
      </section>
    </AppShell>
  );
}
