# Build stage
FROM node:23-alpine AS builder
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Build the app
COPY . .
RUN pnpm build

# Production stage
FROM nginx:1.25-alpine-slim
WORKDIR /usr/share/nginx/html

# Create nginx user and group with non-root privileges
RUN addgroup -g 101 -S nginx \
    && adduser -S -D -H -u 101 -h /var/cache/nginx -s /sbin/nologin -G nginx nginx \
    && rm -rf /usr/share/nginx/html/*

# Copy nginx configuration
COPY --chown=nginx:nginx nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files
COPY --from=builder --chown=nginx:nginx /app/dist .

# Use non-root user
USER nginx

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 