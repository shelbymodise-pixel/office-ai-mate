import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { GhostButton } from "./Form";

export function AiOutput({
  title,
  copyLabel,
  emptyHint,
  text,
  loading,
  error,
  onRegenerate,
  onClear,
  clearLabel = "Clear",
}: {
  title: string;
  copyLabel: string;
  emptyHint: string;
  text: string | null;
  loading: boolean;
  error: string | null;
  onRegenerate: () => void;
  onClear: () => void;
  clearLabel?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="glass rounded-3xl p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-xl font-extrabold tracking-tight">{title}</h2>
        <div className="flex flex-wrap gap-2">
          <GhostButton onClick={copy} disabled={!text || loading}>
            {copied ? "Copied" : copyLabel}
          </GhostButton>
          <GhostButton onClick={onRegenerate} disabled={loading}>
            Regenerate
          </GhostButton>
          <GhostButton onClick={onClear} disabled={loading}>
            {clearLabel}
          </GhostButton>
        </div>
      </div>

      <div className="mt-5">
        {loading && (
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-accent/30 border-t-accent" />
            Working on it — this usually takes a few seconds.
          </div>
        )}

        {!loading && error && (
          <div className="rounded-2xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-foreground">
            {error}
          </div>
        )}

        {!loading && !error && !text && (
          <p className="text-sm leading-relaxed text-muted-foreground">{emptyHint}</p>
        )}

        {!loading && !error && text && (
          <article className="wm-markdown text-sm leading-relaxed text-foreground/90">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: (p) => (
                  <h3 className="mt-6 font-display text-lg font-extrabold first:mt-0" {...p} />
                ),
                h2: (p) => (
                  <h3 className="mt-6 font-display text-lg font-extrabold first:mt-0" {...p} />
                ),
                h3: (p) => (
                  <h3
                    className="mt-6 font-display text-base font-extrabold text-accent first:mt-0"
                    {...p}
                  />
                ),
                p: (p) => <p className="mt-3 leading-relaxed" {...p} />,
                ul: (p) => <ul className="mt-3 list-disc space-y-1.5 pl-5" {...p} />,
                ol: (p) => <ol className="mt-3 list-decimal space-y-1.5 pl-5" {...p} />,
                strong: (p) => <strong className="font-semibold text-foreground" {...p} />,
                table: (p) => (
                  <div className="mt-4 overflow-x-auto rounded-xl border border-white/10">
                    <table className="w-full border-collapse text-left text-sm" {...p} />
                  </div>
                ),
                th: (p) => (
                  <th
                    className="border-b border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                    {...p}
                  />
                ),
                td: (p) => <td className="border-b border-white/5 px-3 py-2 align-top" {...p} />,
                a: (p) => <a className="text-accent underline" {...p} />,
                code: (p) => <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs" {...p} />,
              }}
            >
              {text}
            </ReactMarkdown>
          </article>
        )}
      </div>

      {text && !loading && (
        <div className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4 text-[11px] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Generated from your input · review before using
        </div>
      )}
    </section>
  );
}
