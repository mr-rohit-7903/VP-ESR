# Frontend Dockerfile - Multi-stage build for production optimization
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Build stage
FROM base AS builder
WORKDIR /app

# Accept build arguments
ARG VITE_APP_API_PREFIX
ENV VITE_APP_API_PREFIX=$VITE_APP_API_PREFIX

# Copy package files first
COPY package.json package-lock.json* ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Create production build
RUN npm run build

# Production stage with nginx
FROM nginx:alpine AS production

# Install security updates
RUN apk update && apk upgrade && \
   apk add --no-cache ca-certificates tzdata && \
   rm -rf /var/cache/apk/*

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Remove default nginx config to prevent conflicts
RUN rm -f /etc/nginx/conf.d/default.conf

# Copy built app from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
   CMD wget --no-verbose --tries=1 --spider http://localhost:8080/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]