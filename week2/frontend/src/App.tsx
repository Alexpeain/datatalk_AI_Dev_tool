import { useState } from "react";
import { createSession } from "./api";

function App() {
  const [link, setLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    setLoading(true);
    try {
      const session = await createSession();
      setLink(session.url);
    } catch (err) {
      console.error(err);
      alert("Failed to create session");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>Online Coding Interview Platform</h1>
      <button onClick={handleCreate} disabled={loading}>
        {loading ? "Creating..." : "Create session"}
      </button>
      {link && (
        <div style={{ marginTop: 16, display: 'flex', gap: 8, alignItems: 'center' }}>
          <div>
            <p style={{ margin: 0 }}>Share this link with your candidate:</p>
            <code style={{ display: 'block', marginTop: 6 }}>{link}</code>
          </div>
          <div>
            <button
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(link).catch(() => {
                    // fallback handled below
                  });
                } else {
                  const ta = document.createElement('textarea');
                  ta.value = link;
                  document.body.appendChild(ta);
                  ta.select();
                  try { document.execCommand('copy'); } catch {};
                  ta.remove();
                }
                alert('Link copied to clipboard');
              }}
            >
              Copy link
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
