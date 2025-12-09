import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import {
  createSession,
  getSession,
  updateSessionCode,
  updateSessionLanguage
} from "./sessions";

const app = express();
const server = http.createServer(app);

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5173";

const io = new Server(server, {
  cors: {
    origin: FRONTEND_ORIGIN,
    methods: ["GET", "POST"]
  }
});

app.use(cors({ origin: FRONTEND_ORIGIN }));
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Coding interview backend");
});

// Create new session
app.post("/api/sessions", (req, res) => {
  const { language, code } = req.body || {};
  const session = createSession(language, code);
  res.json({
    id: session.id,
    url: `${FRONTEND_ORIGIN}/session/${session.id}`
  });
});

// Get session state
app.get("/api/sessions/:id", (req, res) => {
  const session = getSession(req.params.id);
  if (!session) {
    return res.status(404).json({ error: "Session not found" });
  }
  res.json(session);
});

// Real-time updates
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("join_session", ({ sessionId }) => {
    const session = getSession(sessionId);
    if (!session) {
      socket.emit("session_error", { message: "Session not found" });
      return;
    }

    socket.join(`session:${sessionId}`);
    socket.emit("session_state", {
      code: session.code,
      language: session.language
    });
  });

  socket.on("code_change", ({ sessionId, code }) => {
    updateSessionCode(sessionId, code);
    socket.to(`session:${sessionId}`).emit("remote_code_change", { code });
  });

  socket.on("language_change", ({ sessionId, language }) => {
    updateSessionLanguage(sessionId, language);
    io.to(`session:${sessionId}`).emit("language_updated", { language });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
