import type {
  ReactNode,
  SelectHTMLAttributes,
  InputHTMLAttributes,
  ButtonHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

const base =
  "w-full rounded-xl border border-white/12 bg-white/5 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition focus:border-accent/60 focus:ring-2 focus:ring-accent/25";

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {children}
      {hint && <span className="mt-1 block text-xs text-muted-foreground">{hint}</span>}
    </label>
  );
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={base} />;
}

export function TextArea({ rows = 6, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea rows={rows} {...props} className={`${base} resize-y leading-relaxed`} />;
}

export function SelectInput({
  options,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { options: readonly string[] }) {
  return (
    <select {...props} className={`${base} appearance-none`}>
      {options.map((o) => (
        <option key={o} value={o} className="bg-card text-foreground">
          {o}
        </option>
      ))}
    </select>
  );
}

export function PrimaryButton({
  children,
  loading,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean; children: ReactNode }) {
  return (
    <button
      type="button"
      {...props}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-bold text-accent-foreground shadow-[0_0_35px_-8px] shadow-accent transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-accent-foreground/30 border-t-accent-foreground" />
      )}
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return (
    <button
      type="button"
      {...props}
      className="inline-flex items-center justify-center rounded-lg border border-white/20 px-3 py-2 text-xs font-semibold text-foreground transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {children}
    </button>
  );
}

export function FormCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="glass-strong rounded-3xl p-5 sm:p-7">
      <h2 className="font-display text-xl font-extrabold tracking-tight">{title}</h2>
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}
