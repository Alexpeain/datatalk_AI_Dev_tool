import React from "react";

interface ToolbarProps {
  language: string;
  onLanguageChange: (lang: string) => void;
  onRun: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  language,
  onLanguageChange,
  onRun
}) => {
  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        alignItems: "center",
        padding: 8,
        borderBottom: "1px solid #ddd"
      }}
    >
      <label>
        Language:{" "}
        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
        </select>
      </label>
      <button onClick={onRun}>Run</button>
    </div>
  );
};

export default Toolbar;
