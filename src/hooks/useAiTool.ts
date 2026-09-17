import { useCallback, useRef, useState } from "react";

export function useAiTool<TInput>(run: (input: TInput) => Promise<{ text: string }>) {
  const [text, setText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const lastInput = useRef<TInput | null>(null);

  const generate = useCallback(
    async (input: TInput) => {
      lastInput.current = input;
      setLoading(true);
      setError(null);
      try {
        const result = await run(input);
        setText(result.text);
      } catch (err) {
        console.error(err);
        setText(null);
        setError(
          err instanceof Error && err.message
            ? err.message
            : "Something went wrong. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    },
    [run],
  );

  const regenerate = useCallback(() => {
    if (lastInput.current) void generate(lastInput.current);
    else setError("Fill in the form above first, then press generate.");
  }, [generate]);

  const reset = useCallback(() => {
    setText(null);
    setError(null);
    lastInput.current = null;
  }, []);

  return { text, error, loading, generate, regenerate, reset };
}
