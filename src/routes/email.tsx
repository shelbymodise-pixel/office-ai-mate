import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";

import { AiOutput } from "@/components/AiOutput";
import { AppShell } from "@/components/AppShell";
import { Field, FormCard, PrimaryButton, SelectInput, TextArea, TextInput } from "@/components/Form";
import { useAiTool } from "@/hooks/useAiTool";
import { generateEmail } from "@/lib/ai.functions";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — WorkMate AI" },
      {
        name: "description",
        content:
          "Write professional workplace emails in seconds. Choose purpose, recipient, tone and length, then copy the generated draft.",
      },
      { property: "og:title", content: "Smart Email Generator — WorkMate AI" },
      {
        property: "og:description",
        content: "Create professional emails in seconds with WorkMate AI.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EmailPage,
});

type Tone = "Formal" | "Friendly" | "Persuasive";
type Length = "Short" | "Medium" | "Detailed";

function EmailPage() {
  const run = useServerFn(generateEmail);
  const tool = useAiTool<{
    purpose: string;
    recipient: string;
    details: string;
    tone: Tone;
    length: Length;
  }>((data) => run({ data }));

  const [purpose, setPurpose] = useState("");
  const [recipient, setRecipient] = useState("");
  const [details, setDetails] = useState("");
  const [tone, setTone] = useState<Tone>("Formal");
  const [length, setLength] = useState<Length>("Medium");
  const [formError, setFormError] = useState<string | null>(null);

  const submit = () => {
    if (!purpose.trim() || !details.trim()) {
      setFormError("Please add the email purpose and the key information you want to communicate.");
      return;
    }
    setFormError(null);
    void tool.generate({ purpose, recipient, details, tone, length });
  };

  const clear = () => {
    setPurpose("");
    setRecipient("");
    setDetails("");
    setTone("Formal");
    setLength("Medium");
    setFormError(null);
    tool.reset();
  };

  return (
    <AppShell eyebrow="Email Generator" title="Smart Email Generator ✉️">
      <div className="grid gap-6 xl:grid-cols-2">
        <FormCard title="Tell WorkMate what to write">
          <Field label="Email Purpose">
            <TextInput
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="e.g. Requesting leave from my manager"
            />
          </Field>
          <Field label="Recipient">
            <TextInput
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="e.g. Manager"
            />
          </Field>
          <Field label="Key Information" hint="Only what you write here will be used in the email.">
            <TextArea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={7}
              placeholder="e.g. I need leave on 12–14 November. My tasks are up to date and Sam can cover urgent work."
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Tone">
              <SelectInput
                value={tone}
                onChange={(e) => setTone(e.target.value as Tone)}
                options={["Formal", "Friendly", "Persuasive"]}
              />
            </Field>
            <Field label="Length">
              <SelectInput
                value={length}
                onChange={(e) => setLength(e.target.value as Length)}
                options={["Short", "Medium", "Detailed"]}
              />
            </Field>
          </div>
          {formError && <p className="text-sm text-destructive">{formError}</p>}
          <PrimaryButton onClick={submit} disabled={tool.loading} loading={tool.loading}>
            {tool.loading ? "Generating…" : "Generate Email"}
          </PrimaryButton>
        </FormCard>

        <AiOutput
          title="Generated Email"
          copyLabel="Copy Email"
          emptyHint="Your generated email will appear here with a subject line and full body."
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
