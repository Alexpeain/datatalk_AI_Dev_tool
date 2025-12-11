# End-to-End Application Development

# Tasks for this project

**Create a link and share it with candidates
Allow everyone who connects to edit code in the code panel
Show real-time updates to all connected users
Support syntax highlighting for multiple languages
Execute code safely in the browser**

# Coding Interview Platform

A full‑stack project with a Node.js backend and a Vite frontend.

# Week 2 – Coding Interview Platform

This project is a **full‑stack coding interview platform** built as part of Week 2 of the Datatalk learning journey. It provides an environment where candidates can solve coding problems with syntax highlighting, run code securely, and demonstrate their skills in real time.

---

## 🚀 Features

- **Frontend**

  - Built with React
  - Monaco Editor for syntax highlighting (supports JavaScript & Python)
  - Responsive UI for interview sessions

- **Backend**

  - Node.js + Express
  - REST APIs for problem management and submissions
  - Integration tests with Jest & Supertest

- **Testing**

  - End‑to‑end tests with Playwright
  - Automated workflows for reliability

- **Execution**

  - Pyodide integration for secure, browser‑based Python execution
  - No backend calls required for Python code execution

- **Deployment**
  - Dockerized setup for easy containerization
  - Works seamlessly in GitHub Codespaces

---

## 🛠 Tech Stack

- **Frontend:** React, TypeScript, Monaco Editor
- **Backend:** Node.js, Express
- **Testing:** Jest, Supertest, Playwright
- **Containerization:** Docker
- **Environment:** GitHub Codespaces

---

## 📂 Project Structure
```
week2/
├── backend/
│ ├── src/
│ ├── tests/
│ └── package.json
├── frontend/
│ ├── src/
│ ├── public/
│ └── package.json
├── Dockerfile
└── README.md
```

## 📦 Installation

Install all dependencies:

```bash
npm run install:all
```

# 🚀 Running the Project

Start backend:

```bash
npm run dev:backend
```

Backend runs on: http://localhost:5000

Start frontend:

```bash
npm run dev:frontend
```

Frontend runs on: http://localhost:5173

# ✅ Testing

Run backend tests:

```bash
npm test --prefix backend
```
