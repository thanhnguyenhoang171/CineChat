# Stage 1: Base image
FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g pnpm@10.33.0
RUN apk update && apk add --no-cache libc6-compat

# Stage 2: Prune workspace
FROM base AS builder
WORKDIR /app
RUN pnpm install -g turbo
COPY . .
RUN turbo prune backend --docker

# Stage 3: Install and Build
FROM base AS installer
WORKDIR /app

# Install dependencies based on the pruned lockfile
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install

# Copy the actual code and build
COPY --from=builder /app/out/full/ .
RUN pnpm turbo run build --filter=backend

# Stage 4: Production Runner
FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs
USER nestjs

# Copy all files from installer
COPY --from=installer --chown=nestjs:nodejs /app .

EXPOSE 3001
CMD ["node", "apps/backend/dist/main.js"]