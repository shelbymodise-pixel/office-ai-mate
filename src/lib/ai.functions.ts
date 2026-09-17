import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { generateWithGateway } from "./ai.server";

const EmailInput = z.object({
  purpose: z.string().min(1),
  recipient: z.string().optional().default(""),
  details: z.string().min(1),
  tone: z.enum(["Formal", "Friendly", "Persuasive"]),
  length: z.enum(["Short", "Medium", "Detailed"]),
});

export const generateEmail = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => EmailInput.parse(data))
  .handler(async ({ data }) => {
    const instructions = `
You are WorkMate AI's Smart Email Generator. You write clear, professional workplace emails.
Output format (Markdown, nothing else):
### Subject
One single subject line.

### Email Body
The full email, including greeting, body paragraphs and sign-off.

Respect the requested tone and length (Short = under 90 words, Medium = 100-180 words, Detailed = 200-300 words).
Use placeholders like [Your name] or [Manager] when a name was not given.
If something important is missing, add a final short section "### Before you send" listing what to confirm.`.trim();

    const input = `Email purpose: ${data.purpose}
Recipient: ${data.recipient || "(not specified)"}
Tone: ${data.tone}
Length: ${data.length}
Key information provided by the user:
${data.details}`;

    return { text: await generateWithGateway(instructions, input) };
  });

const NotesInput = z.object({
  title: z.string().optional().default(""),
  notes: z.string().min(1),
});

export const summarizeNotes = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => NotesInput.parse(data))
  .handler(async ({ data }) => {
    const instructions = `
You are WorkMate AI's Meeting Notes Summarizer. You condense raw meeting notes into a structured record.
Only report what is actually present in the notes. Never invent decisions, names, owners or deadlines.
Output exactly these Markdown sections in this order:

### Meeting Summary
A concise paragraph.

### Key Discussion Points
Bullet list of the main topics.

### Decisions Made
Bullet list of decisions explicitly mentioned. If none, write "No decisions were recorded in these notes."

### Action Items
A Markdown table with columns: Task | Responsible Person | Deadline.
Use "Not specified" where the notes do not say.

### Important Dates
Bullet list of dates and deadlines mentioned. If none, say so.`.trim();

    const input = `Meeting title: ${data.title || "(not specified)"}
Meeting notes:
${data.notes}`;

    return { text: await generateWithGateway(instructions, input) };
  });

const TaskSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional().default(""),
  deadline: z.string().optional().default(""),
  estimate: z.string().optional().default(""),
  priority: z.enum(["High", "Medium", "Low"]),
});

const PlannerInput = z.object({
  horizon: z.enum(["Daily schedule", "Weekly schedule"]),
  tasks: z.array(TaskSchema).min(1),
});

export const planTasks = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => PlannerInput.parse(data))
  .handler(async ({ data }) => {
    const instructions = `
You are WorkMate AI's Task Planner. You turn a task list into a realistic, achievable plan.
Consider deadlines and priorities, flag urgent work, avoid overloading any single block, and include short breaks where sensible.
Where a time estimate was not given, make a reasonable estimate and mark it "(estimated)".
Output exactly these Markdown sections:

### My Priority List
Table with columns: Priority | Task | Deadline.

### Suggested Schedule
Table with columns: Time | Task | Priority. Keep the plan realistic for the requested horizon.

### Planning Tips
3 to 5 short, practical bullet points.`.trim();

    const input = `Requested plan type: ${data.horizon}
Tasks:
${data.tasks
  .map(
    (t, i) =>
      `${i + 1}. Task: ${t.name}
   Description: ${t.description || "(none)"}
   Deadline: ${t.deadline || "(not specified)"}
   Estimated time: ${t.estimate || "(not specified)"}
   Priority: ${t.priority}`,
  )
  .join("\n")}`;

    return { text: await generateWithGateway(instructions, input) };
  });

const ResearchInput = z.object({
  topic: z.string().min(1),
  depth: z.enum(["Quick Overview", "Detailed Research", "In-depth Analysis"]),
  questions: z.string().optional().default(""),
});

export const researchTopic = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => ResearchInput.parse(data))
  .handler(async ({ data }) => {
    const instructions = `
You are WorkMate AI's Research Assistant. You explain topics clearly and even-handedly.
You have no live web access, so never fabricate sources, links, studies or statistics. Only name a source if you are confident it genuinely exists, and say when information may be outdated and should be verified.
Match the requested depth (Quick Overview = brief, In-depth Analysis = thorough).
Output exactly these Markdown sections:

### Research Overview
### Key Points
### Insights
### Advantages and Disadvantages
(Use a table with columns: Advantages | Disadvantages, where appropriate.)
### Recommendations
### Sources / Verification
State plainly what should be verified and where the user could check it.`.trim();

    const input = `Research topic: ${data.topic}
Requested depth: ${data.depth}
Specific questions from the user: ${data.questions || "(none given — cover the topic broadly)"}`;

    return { text: await generateWithGateway(instructions, input) };
  });
