# Build stage
FROM node:23-alpine AS builder
WORKDIR /app

# Configure pnpm and network settings
ENV PNPM_TIMEOUT=1200000 \
    PNPM_FETCH_RETRIES=10 \
    PNPM_REGISTRY=https://registry.npmjs.cf \
    NODE_OPTIONS="--max-old-space-size=4096" \
    NODE_TLS_REJECT_UNAUTHORIZED=0 \
    NODE_DNS_LOOKUP_TIMEOUT=120000 \
    NODE_DNS_LOOKUP_RETRIES=10 \
    NPM_CONFIG_REGISTRY=https://registry.npmjs.cf \
    NPM_CONFIG_FETCH_RETRIES=10 \
    NPM_CONFIG_FETCH_RETRY_FACTOR=2 \
    NPM_CONFIG_FETCH_RETRY_MINTIMEOUT=10000 \
    NPM_CONFIG_FETCH_RETRY_MAXTIMEOUT=60000

# Install pnpm with retry mechanism
RUN corepack enable && \
    for i in {1..3}; do \
        corepack prepare pnpm@latest --activate && break || \
        if [ $i -eq 3 ]; then exit 1; fi; \
        echo "Retrying pnpm installation..."; \
        sleep 5; \
    done

# Install dependencies with retry mechanism and cache
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    for i in {1..3}; do \
        pnpm install --no-frozen-lockfile --prefer-offline && break || \
        if [ $i -eq 3 ]; then exit 1; fi; \
        echo "Retrying dependency installation..."; \
        sleep 10; \
    done

# Build the app
COPY . .
RUN pnpm build

# Production stage
FROM nginx:1.25-alpine-slim
WORKDIR /usr/share/nginx/html

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