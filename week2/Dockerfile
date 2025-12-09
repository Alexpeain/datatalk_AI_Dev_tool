# Base image: Node.js LTS
FROM node:22-alpine AS build

# Set working directory
WORKDIR /app

# Copy root package.json and install concurrently
COPY package*.json ./
RUN npm install

# Copy backend and frontend source
COPY backend ./backend
COPY frontend ./frontend

# Install dependencies for backend and frontend
RUN npm install --prefix backend
RUN npm install --prefix frontend

# Build frontend
RUN npm run build --prefix frontend

# Production stage
FROM node:22-alpine AS production

WORKDIR /app

# Copy backend code
COPY --from=build /app/backend ./backend

# Copy built frontend into backend's public folder
COPY --from=build /app/frontend/dist ./backend/public

# Install only production dependencies