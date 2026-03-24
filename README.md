# CineChat Monorepo 🎬💬

A professional full-stack monorepo for CineChat, managed by **Turborepo**, **pnpm**, and **TypeScript**.

## 🏗️ Project Structure

```text
.
├── apps/
│   ├── backend/          # NestJS API Service
│   ├── admin-console/    # React Router Admin Dashboard
│   └── user-console/     # Next.js User Application
├── packages/
│   └── shared-types/     # Shared TypeScript Interfaces & Enums
├── .husky/               # Git Hooks (Linting before commit)
├── turbo.json            # Turborepo Configuration
└── pnpm-workspace.yaml   # pnpm Workspace Configuration
```

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/) (v9+)

### Installation
```bash
# Install dependencies for all apps/packages
pnpm install

# Initialize Git Hooks
npx husky init
```

### Development
```bash
# Run all applications simultaneously
pnpm dev

# Run a specific application
pnpm dev --filter backend
pnpm dev --filter admin-console
pnpm dev --filter user-console
```

### Build & Type-check
```bash
# Build all applications
pnpm build

# Run type-checking for the entire project
pnpm type-check

# Lint all files
pnpm lint
```

## 🛠️ Monorepo Workflow

### 1. Sharing Types
All shared data structures (Users, Movies, API Responses) should be defined in `packages/shared-types`. 
To use them in an app, import from `@cinechat/types`.

### 2. Adding Dependencies
Always specify the package you want to add the dependency to:
```bash
pnpm add <package-name> --filter <app-name>
```

### 3. Commit Convention
This repo uses **Commitlint**. Every commit must follow the format:
`type(scope): description` (e.g., `feat(backend): add auth api`)

---
Built with ❤️ by CineChat Team.
