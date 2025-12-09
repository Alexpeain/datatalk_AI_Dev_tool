import { useEffect, useRef, useState } from "react";

export function useJsSandbox() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [result, setResult] = useState<{ output: string; error: string | null }>(
    { output: "", error: null }
  );
  const runIdRef = useRef(0);
  const pendingTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const listener = (event: MessageEvent) => {
      const data = event.data;
      if (!data || data.type !== "js_result") return;
      // Only accept results for the latest run
      if (typeof data.runId === 'number' && data.runId !== runIdRef.current) return;
      if (pendingTimerRef.current) {
        clearTimeout(pendingTimerRef.current as unknown as number);
        pendingTimerRef.current = null;
      }
      setResult({
        output: data.output || "",
        error: data.error || null
      });
    };
    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }, []);

  const runCode = (code: string) => {
    setResult({ output: "", error: null });
    // increment run id
    const runId = ++runIdRef.current;

    // send code with runId
    iframeRef.current?.contentWindow?.postMessage(
      {
        type: "execute_js",
        code,
        runId
      },
      "*"
    );

    // set watchdog timeout: reload iframe if no result in 3000ms
    if (pendingTimerRef.current) {
      clearTimeout(pendingTimerRef.current as unknown as number);
      pendingTimerRef.current = null;
    }
    pendingTimerRef.current = window.setTimeout(() => {
      setResult({ output: "", error: "Execution timed out" });
      // reload iframe to ensure a clean state
      try {
        if (iframeRef.current) {
          const src = iframeRef.current.src;
          iframeRef.current.src = src;
        }
      } catch (e) {
        // ignore
      }
      pendingTimerRef.current = null;
    }, 3000);
  };

  return { iframeRef, runCode, result };
}
