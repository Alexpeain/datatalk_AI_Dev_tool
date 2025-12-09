import { useEffect, useRef, useState } from "react";

// Lazy-load Pyodide from CDN
declare global {
  interface Window {
    loadPyodide?: any;
  }
}

export function usePyodideRunner() {
  const workerRef = useRef<Worker | null>(null);
  const cancelledRef = useRef(false); // track cancellation across lifecycle
  const [ready, setReady] = useState(false);
  const [result, setResult] = useState<{ output: string; error: string | null }>(
    { output: "", error: null }
  );

  useEffect(() => {
    cancelledRef.current = false;

    try {
      const w = new Worker("/pyodide-worker.js");
      workerRef.current = w;

      w.addEventListener("message", (evt) => {
        if (cancelledRef.current) return; // ✅ ignore messages after cancellation
        const data = evt.data || {};
        if (data.type === "py_ready") {
          setReady(true);
        }
        if (data.type === "py_result") {
          setResult({ output: data.output || "", error: data.error || null });
        }
      });

      // ask worker to init
      w.postMessage({ type: "init" });
    } catch (e) {
      if (!cancelledRef.current) {
        console.error("Failed to create pyodide worker", e);
      }
    }

    return () => {
      cancelledRef.current = true; // ✅ mark cancelled
      try {
        workerRef.current?.terminate();
      } catch (_) {}
      workerRef.current = null;
    };
  }, []);

  const runCode = async (code: string) => {
    setResult({ output: "", error: null });
    if (cancelledRef.current) {
      setResult({ output: "", error: "Execution cancelled." });
      return;
    }
    if (!workerRef.current) {
      setResult({ output: "", error: "Python worker not available." });
      return;
    }
    // send run request to worker
    workerRef.current.postMessage({ type: "run", code });
  };

  return { ready, runCode, result };
}
