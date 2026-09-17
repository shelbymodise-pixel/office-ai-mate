import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";

import { AiOutput } from "@/components/AiOutput";
import { AppShell } from "@/components/AppShell";
import {
  Field,
  FormCard,
  GhostButton,
  PrimaryButton,
  SelectInput,
  TextArea,
  TextInput,
} from "@/components/Form";
import { useAiTool } from "@/hooks/useAiTool";
import { planTasks } from "@/lib/ai.functions";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — WorkMate AI" },
      {
        name: "description",
        content:
          "Add your tasks with deadlines and priorities, and get a prioritized list, a realistic schedule and planning tips.",
      },
      { property: "og:title", content: "AI Task Planner — WorkMate AI" },
      {
        property: "og:description",
        content: "Organize, prioritize, and schedule your tasks with WorkMate AI.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PlannerPage,
});

type Priority = "High" | "Medium" | "Low";
type Task = {
  id: number;
  name: string;
  description: string;
  deadline: string;
  estimate: string;
  priority: Priority;
};

const emptyTask = (id: number): Task => ({
  id,
  name: "",
  description: "",
  deadline: "",
  estimate: "",
  priority: "Medium",
});

function PlannerPage() {
  const run = useServerFn(planTasks);
  const tool = useAiTool<{
    horizon: "Daily schedule" | "Weekly schedule";
    tasks: Omit<Task, "id">[];
  }>((data) => run({ data }));

  const [tasks, setTasks] = useState<Task[]>([emptyTask(1)]);
  const [horizon, setHorizon] = useState<"Daily schedule" | "Weekly schedule">("Daily schedule");
  const [formError, setFormError] = useState<string | null>(null);

  const update = (id: number, patch: Partial<Task>) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));

  const submit = () => {
    const filled = tasks.filter((t) => t.name.trim());
    if (filled.length === 0) {
      setFormError("Add at least one task name before creating a schedule.");
      return;
    }
    setFormError(null);
    void tool.generate({
      horizon,
      tasks: filled.map(({ id: _id, ...rest }) => rest),
    });
  };

  const clear = () => {
    setTasks([emptyTask(Date.now())]);
    setHorizon("Daily schedule");
    setFormError(null);
    tool.reset();
  };

  return (
    <AppShell eyebrow="Task Planner" title="AI Task Planner 📅">
      <div className="grid gap-6 xl:grid-cols-2">
        <FormCard title="Your tasks">
          <Field label="Plan type">
            <SelectInput
              value={horizon}
              onChange={(e) => setHorizon(e.target.value as typeof horizon)}
              options={["Daily schedule", "Weekly schedule"]}
            />
          </Field>

          <div className="space-y-4">
            {tasks.map((task, index) => (
              <div key={task.id} className="glass rounded-2xl p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-accent">
                    Task {index + 1}
                  </span>
                  {tasks.length > 1 && (
                    <GhostButton
                      onClick={() => setTasks((prev) => prev.filter((t) => t.id !== task.id))}
                    >
                      Remove
                    </GhostButton>
                  )}
                </div>
                <div className="space-y-3">
                  <Field label="Task Name">
                    <TextInput
                      value={task.name}
                      onChange={(e) => update(task.id, { name: e.target.value })}
                      placeholder="e.g. Finish Q3 budget review"
                    />
                  </Field>
                  <Field label="Description">
                    <TextArea
                      rows={2}
                      value={task.description}
                      onChange={(e) => update(task.id, { description: e.target.value })}
                      placeholder="e.g. Check figures and send to finance"
                    />
                  </Field>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <Field label="Deadline">
                      <TextInput
                        value={task.deadline}
                        onChange={(e) => update(task.id, { deadline: e.target.value })}
                        placeholder="e.g. Friday 17:00"
                      />
                    </Field>
                    <Field label="Estimated Time">
                      <TextInput
                        value={task.estimate}
                        onChange={(e) => update(task.id, { estimate: e.target.value })}
                        placeholder="e.g. 2 hours"
                      />
                    </Field>
                    <Field label="Priority">
                      <SelectInput
                        value={task.priority}
                        onChange={(e) => update(task.id, { priority: e.target.value as Priority })}
                        options={["High", "Medium", "Low"]}
                      />
                    </Field>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <GhostButton onClick={() => setTasks((prev) => [...prev, emptyTask(Date.now())])}>
            + Add Task
          </GhostButton>

          {formError && <p className="text-sm text-destructive">{formError}</p>}
          <PrimaryButton onClick={submit} disabled={tool.loading} loading={tool.loading}>
            {tool.loading ? "Building your plan…" : "Create My Schedule"}
          </PrimaryButton>
        </FormCard>

        <AiOutput
          title="Your Plan"
          copyLabel="Copy Schedule"
          clearLabel="Clear Tasks"
          emptyHint="Your priority list, suggested schedule and planning tips will appear here."
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
