export interface Session {
  id: string;
  language: string;
  code: string;
  createdAt: Date;
}

const sessions = new Map<string, Session>();

function generateSessionId() {
  return Math.random().toString(36).slice(2, 8);
}

export function createSession(language = "javascript", code = ""): Session {
  const id = generateSessionId();
  const session: Session = {
    id,
    language,
    code,
    createdAt: new Date()
  };
  sessions.set(id, session);
  return session;
}

export function getSession(id: string): Session | undefined {
  return sessions.get(id);
}

export function updateSessionCode(id: string, code: string) {
  const session = sessions.get(id);
  if (!session) return;
  session.code = code;
}

export function updateSessionLanguage(id: string, language: string) {
  const session = sessions.get(id);
  if (!session) return;
  session.language = language;
}
