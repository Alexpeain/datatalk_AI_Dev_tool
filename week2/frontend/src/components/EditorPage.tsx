import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSession } from "../api";
import { getSocket } from "../socket";
import CodeEditor from "./CodeEditor";
import Toolbar from "./Toolbar";
import OutputPanel from "./OutputPanel";
import { useJsSandbox } from "./jsSandbox/useJsSandbox";
import { usePyodideRunner } from "./python/usePyodideRunner";

const EditorPage: React.FC = () => {
  const { id: sessionId } = useParams();
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState<"javascript" | "python">("javascript");
  const [connected, setConnected] = useState(false);

  const isRemoteChange = useRef(false);

  const { iframeRef, runCode: runJs, result: jsResult } = useJsSandbox();
  const { ready: pyReady, runCode: runPy, result: pyResult } = usePyodideRunner();

  useEffect(() => {
    if (!sessionId) return;

    fetchSession(sessionId)
      .then((session) => {
        setCode(session.code);
        setLanguage(session.language as "javascript" | "python");
      })
      .catch((err) => {
        console.error(err);
        alert("Session not found");
      });

    const socket = getSocket();

    socket.on("connect", () => {
      setConnected(true);
      socket.emit("join_session", { sessionId });
    });

    socket.on("session_state", (state) => {
      isRemoteChange.current = true;
      setCode(state.code);
      setLanguage(state.language as "javascript" | "python");
    });

    socket.on("remote_code_change", ({ code }) => {
      isRemoteChange.current = true;
      setCode(code);
    });

    socket.on("language_updated", ({ language }) => {
      setLanguage(language as "javascript" | "python");
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });

    return () => {
      socket.off("session_state");
      socket.off("remote_code_change");
      socket.off("language_updated");
    };
  }, [sessionId]);

  const handleCodeChange = (value: string) => {
    setCode(value);
    const socket = getSocket();
    if (!isRemoteChange.current && sessionId) {
      socket.emit("code_change", { sessionId, code: value });
    }
    isRemoteChange.current = false;
  };

  const handleLanguageChange = (lang: string) => {
    const casted = lang as "javascript" | "python";
    setLanguage(casted);
    if (sessionId) {
      const socket = getSocket();
      socket.emit("language_change", { sessionId, language: casted });
    }
  };

  const handleRun = async () => {
    if (language === "javascript") {
      runJs(code);
    } else {
      await runPy(code);
    }
  };

  const output = language === "javascript" ? jsResult.output : pyResult.output;
  const error = language === "javascript" ? jsResult.error : pyResult.error;

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Hidden sandbox iframe for JS */}
      <iframe
        ref={iframeRef}
        src="/iframe-runner.html"
        style={{ display: "none" }}
        sandbox="allow-scripts"
        title="js-sandbox"
      />

      <Toolbar
        language={language}
        onLanguageChange={handleLanguageChange}
        onRun={handleRun}
      />
      <div style={{ padding: 8, fontSize: 12 }}>
        <span style={{ color: connected ? "green" : "red", marginRight: 16 }}>
          {connected ? "Connected" : "Disconnected"}
        </span>
        {language === "python" && (
          <span>{pyReady ? "Python ready" : "Loading Python (Pyodide)..."}</span>
        )}
      </div>
      <div style={{ flex: 1 }}>
        <CodeEditor code={code} language={language} onChange={handleCodeChange} />
      </div>
      <OutputPanel output={output} error={error} />
    </div>
  );
};

export default EditorPage;
