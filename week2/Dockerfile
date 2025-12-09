# ---------- Base build stage ----------
FROM node:22 AS base
WORKDIR /app
COPY package*.json ./

# ---------- Backend build ----------
FROM base AS backend-build
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ .
RUN npm run build

# ---------- Frontend build ----------
FROM base AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# ---------- Production stage ----------
FROM node:22-alpine AS production
WORKDIR /app

# Copy backend build + dependencies
COPY --from=backend-build /app/backend /app/backend

# Copy frontend build output
COPY --from=frontend-build /app/frontend/dist /app/frontend/dist

# Install only production deps for backend
WORKDIR /app/backend
RUN npm ci --only=production

# Expose backend port
EXPOSE 3000

CMD ["npm", "start"]
