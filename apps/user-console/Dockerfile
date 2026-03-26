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
RUN turbo prune user-console --docker

# Stage 3: Install and Build
FROM base AS installer
WORKDIR /app

# Install dependencies based on the pruned lockfile
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install

# Copy the actual code and build
COPY --from=builder /app/out/full/ .
RUN pnpm turbo run build --filter=user-console

# Stage 4: Production Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer --chown=nextjs:nodejs /app/apps/user-console/public ./apps/user-console/public
# The standalone build outputs monorepo structure
COPY --from=installer --chown=nextjs:nodejs /app/apps/user-console/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/user-console/.next/static ./apps/user-console/.next/static

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "apps/user-console/server.js"]