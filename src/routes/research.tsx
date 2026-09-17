import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";

import { AiOutput } from "@/components/AiOutput";
import { AppShell } from "@/components/AppShell";
import { Field, FormCard, PrimaryButton, SelectInput, TextArea, TextInput } from "@/components/Form";
import { useAiTool } from "@/hooks/useAiTool";
import { researchTopic } from "@/lib/ai.functions";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — WorkMate AI" },
      {
        name: "description",
        content:
          "Explore any work topic with an overview, key points, insights, balanced pros and cons, recommendations and verification notes.",
      },
      { property: "og:title", content: "AI Research Assistant — WorkMate AI" },
      {
        property: "og:description",
        content: "Research topics and turn information into useful insights.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResearchPage,
});

type Depth = "Quick Overview" | "Detailed Research" | "In-depth Analysis";

function ResearchPage() {
  const run = useServerFn(researchTopic);
  const tool = useAiTool<{ topic: string; depth: Depth; questions: string }>((data) =>
    run({ data }),
  );

  const [topic, setTopic] = useState("");
  const [depth, setDepth] = useState<Depth>("Quick Overview");
  const [questions, setQuestions] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const submit = () => {
    if (!topic.trim()) {
      setFormError("Enter a research topic to get started.");
      return;
    }
    setFormError(null);
    void tool.generate({ topic, depth, questions });
  };

  const clear = () => {
    setTopic("");
    setDepth("Quick Overview");
    setQuestions("");
    setFormError(null);
    tool.reset();
  };

  return (
    <AppShell eyebrow="Research Assistant" title="AI Research Assistant 🔎">
      <div className="grid gap-6 xl:grid-cols-2">
        <FormCard title="What should WorkMate look into?">
          <Field label="Research Topic">
            <TextInput
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. The impact of artificial intelligence in the workplace"
            />
          </Field>
          <Field label="Research Depth">
            <SelectInput
              value={depth}
              onChange={(e) => setDepth(e.target.value as Depth)}
              options={["Quick Overview", "Detailed Research", "In-depth Analysis"]}
            />
          </Field>
          <Field
            label="What would you like to know?"
            hint="WorkMate has no live web access and will tell you what to verify."
          >
            <TextArea
              rows={6}
              value={questions}
              onChange={(e) => setQuestions(e.target.value)}
              placeholder="e.g. How does it affect junior roles? What should managers prepare for?"
            />
          </Field>
          {formError && <p className="text-sm text-destructive">{formError}</p>}
          <PrimaryButton onClick={submit} disabled={tool.loading} loading={tool.loading}>
            {tool.loading ? "Researching…" : "Research Topic"}
          </PrimaryButton>
        </FormCard>

        <AiOutput
          title="Research Results"
          copyLabel="Copy Research"
          emptyHint="Your overview, key points, insights, pros and cons, recommendations and verification notes will appear here."
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
