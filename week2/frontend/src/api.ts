import type { SessionState, Session } from "./types";

const API_BASE = "http://localhost:3000";

export async function createSession(): Promise<Session> {
  const res = await fetch(`${API_BASE}/api/sessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({})
  });
  if (!res.ok) {
    throw new Error("Failed to create session");
  }
  return res.json();
}

export async function fetchSession(id: string): Promise<SessionState> {
  const res = await fetch(`${API_BASE}/api/sessions/${id}`);
  if (!res.ok) {
    throw new Error("Session not found");
  }
  return res.json();
}
