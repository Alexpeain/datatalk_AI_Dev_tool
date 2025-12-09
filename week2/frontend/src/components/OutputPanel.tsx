import React from "react";

interface OutputPanelProps {
  output: string;
  error: string | null;
}

const OutputPanel: React.FC<OutputPanelProps> = ({ output, error }) => {
  return (
    <div
      style={{
        borderTop: "1px solid #ddd",
        padding: 8,
        fontFamily: "monospace",
        height: 150,
        overflow: "auto",
        background: "#111",
        color: "#eee"
      }}
    >
      {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
      {output && <pre>{output}</pre>}
      {!output && !error && <span>No output yet</span>}
    </div>
  );
};

export default OutputPanel;
