import React from "react";
import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  code: string;
  language: "javascript" | "python";
  onChange: (value: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, language, onChange }) => {
  return (
    <Editor
      height="100%"
      language={language} // Monaco supports "javascript" and "python"
      value={code}
      onChange={(value) => onChange(value ?? "")}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        automaticLayout: true,
        scrollBeyondLastLine: false,
        wordWrap: "on",
      }}
    />
  );
};

export default CodeEditor;
