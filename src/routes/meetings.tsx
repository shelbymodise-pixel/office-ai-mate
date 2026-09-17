import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";

import { AiOutput } from "@/components/AiOutput";
import { AppShell } from "@/components/AppShell";
import { Field, FormCard, PrimaryButton, TextArea, TextInput } from "@/components/Form";
import { useAiTool } from "@/hooks/useAiTool";
import { summarizeNotes } from "@/lib/ai.functions";

export const Route = createFileRoute("/meetings")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — WorkMate AI" },
      {
        name: "description",
        content:
          "Paste raw meeting notes and get a summary, key discussion points, decisions, action items and important dates.",
      },
      { property: "og:title", content: "Meeting Notes Summarizer — WorkMate AI" },
      {
        property: "og:description",
        content: "Turn long meeting notes into clear summaries and action items.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MeetingsPage,
});

function MeetingsPage() {
  const run = useServerFn(summarizeNotes);
  const tool = useAiTool<{ title: string; notes: string }>((data) => run({ data }));

  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const submit = () => {
    if (!notes.trim()) {
      setFormError("Paste your meeting notes first so WorkMate has something to summarize.");
      return;
    }
    setFormError(null);
    void tool.generate({ title, notes });
  };

  const clear = () => {
    setTitle("");
    setNotes("");
    setFormError(null);
    tool.reset();
  };

  return (
    <AppShell eyebrow="Meeting Summarizer" title="Meeting Notes Summarizer 📝">
      <div className="grid gap-6 xl:grid-cols-2">
        <FormCard title="Paste Your Meeting Notes">
          <Field label="Meeting Title (optional)">
            <TextInput
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Weekly product sync"
            />
          </Field>
          <Field
            label="Meeting Notes"
            hint="Only what appears in your notes will be summarized — nothing is invented."
          >
            <TextArea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={14}
              placeholder="Paste your meeting notes here..."
            />
          </Field>
          {formError && <p className="text-sm text-destructive">{formError}</p>}
          <PrimaryButton onClick={submit} disabled={tool.loading} loading={tool.loading}>
            {tool.loading ? "Summarizing…" : "Summarize Meeting"}
          </PrimaryButton>
        </FormCard>

        <AiOutput
          title="Meeting Summary"
          copyLabel="Copy Summary"
          emptyHint="Your summary, key points, decisions, action items table and important dates will appear here."
          text={tool.text}
          loading={tool.loading}
          error={tool.error}
          onRegenerate={tool.regenerate}
          onClear={clear}
        />
      </div>
    </AppShell>
  );
}
