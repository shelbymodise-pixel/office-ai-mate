const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1/responses";
const MODEL = "openai/gpt-6-astra";

export const RESPONSIBLE_AI_RULES = `
Global rules you must always follow:
- Use ONLY the information the user provides. Never invent names, dates, companies, numbers, prices, sources or citations.
- When an important detail is missing, use neutral wording or a clearly marked placeholder such as [Manager] and briefly ask the user for that detail at the end.
- Clearly flag anything uncertain, estimated, or that should be verified.
- Write in professional, plain, easy-to-understand language.
- Format the answer in Markdown using headings, bullet points and tables exactly as instructed. Never wrap the whole answer in a code block.
`.trim();

export async function generateWithGateway(instructions: string, input: string): Promise<string> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) {
    throw new Error("The AI assistant is not configured yet. Please try again later.");
  }

  const res = await fetch(GATEWAY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Lovable-API-Key": apiKey,
      "X-Lovable-AIG-SDK": "fetch",
    },
    body: JSON.stringify({
      model: MODEL,
      instructions: `${instructions}\n\n${RESPONSIBLE_AI_RULES}`,
      input,
      stream: true,
      reasoning: { effort: "low" },
    }),
  });

  if (!res.ok || !res.body) {
    const detail = await res.text().catch(() => "");
    if (res.status === 429) {
      throw new Error("The assistant is busy right now. Please wait a moment and try again.");
    }
    if (res.status === 402) {
      throw new Error(
        "AI usage limit reached for this workspace. Please add credits to keep generating.",
      );
    }
    if (res.status === 403) {
      throw new Error("AI access is currently blocked for this workspace.");
    }
    console.error("AI gateway error", res.status, detail);
    throw new Error("The assistant could not complete this request. Please try again.");
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let text = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;
      const payload = trimmed.slice(5).trim();
      if (!payload || payload === "[DONE]") continue;
      try {
        const event = JSON.parse(payload) as {
          type?: string;
          delta?: string;
          response?: { output_text?: string };
        };
        if (event.type === "response.output_text.delta" && typeof event.delta === "string") {
          text += event.delta;
        } else if (event.type === "response.completed" && !text && event.response?.output_text) {
          text = event.response.output_text;
        }
      } catch {
        // ignore malformed keep-alive chunks
      }
    }
  }

  const output = text.trim();
  if (!output) {
    throw new Error("The assistant returned an empty answer. Please try again.");
  }
  return output;
}
