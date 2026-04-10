<div align="center">
  <h1>🎬💬 CineChat Monorepo</h1>
  <p>A professional full-stack monorepo for CineChat, powered by <b>Turborepo</b>, <b>pnpm</b>, and <b>TypeScript</b>.</p>

  <!-- Badges -->
  <img src="https://img.shields.io/badge/Node.js-v22+-green?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js version" />
  <img src="https://img.shields.io/badge/pnpm-v10-orange?style=for-the-badge&logo=pnpm&logoColor=white" alt="pnpm version" />
  <img src="https://img.shields.io/badge/Turborepo-v2.9-000000?style=for-the-badge&logo=turborepo&logoColor=white" alt="Turborepo" />
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React_Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="React Vite" />
</div>

## 🏗️ Project Architecture

This monorepo leverages Turborepo for lightning-fast build orchestrations and is structured into multiple applications and shared packages:

```text
.
├── apps/
│   ├── backend/          # NestJS API Service (Port 3001)
│   ├── admin-console/    # React + Vite Admin Dashboard (Port 3000)
│   └── user-console/     # Next.js User Application (Port 3000)
├── packages/
│   └── types/            # Shared TypeScript Interfaces & Enums
├── .github/workflows/    # CI/CD pipelines
├── .husky/               # Git Hooks (Linting before commit)
├── docker-compose.yml    # Docker cluster configuration
├── turbo.json            # Turborepo Configuration
└── pnpm-workspace.yaml   # pnpm Workspace Configuration
```

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v22 or higher)
- [pnpm](https://pnpm.io/) (v10)
- [Docker](https://www.docker.com/) (Optional: for running with containers)

### Installation

1. Clone the repository and install dependencies:
```bash
# Install dependencies for all apps and packages
pnpm install

# Initialize Git Hooks (Husky)
npx husky init
```

2. Environment Customization:
Copy the `.env.example` file in the root or respective apps and rename them to `.env`. Update the environment variables as required.

### 💻 Local Development

Turborepo makes running the entire stack seamless.

```bash
# Run all applications and packages simultaneously
pnpm dev

# Run specific applications
pnpm dev:be         # Start only the NestJS backend
pnpm dev:fe-user    # Start the Next.js user console
pnpm dev:fe-admin   # Start the React admin console
```

### 🐳 Running with Docker

We provide a complete Docker cluster that starts up Redis, the Backend, the Admin Console, and the User Console together.

```bash
docker-compose up --build -d
```

Once running, the services will be available at:
- **Backend**: http://localhost:4002
- **Admin Console**: http://localhost:4001
- **User Console**: http://localhost:4000
- **Redis**: localhost:6380

## 🛠️ Monorepo Workflow

### 1. Build & Type-Checking

You can build, type-check, and lint all applications from the root using Turborepo's parallel execution:

```bash
pnpm build        # Build all applications
pnpm type-check   # Run type-checking across the workspace
pnpm lint         # Lint all files
pnpm clean        # Clean all turbo caches, node_modules, and build outputs
```

To run tasks for a specific app, use the script variants like `pnpm build:be`, `pnpm lint:fe-user`, `pnpm type-check:fe-admin`, etc.

### 2. Sharing Types & Packages

All shared data structures (Users, Movies, API Responses) should be defined in `packages/types`. 
To use them in an app, import them directly from the shared package namespace.

### 3. Adding Dependencies

Always specify the exact app/package you want to add the dependency to:
```bash
# Example: Adding zod to the backend
pnpm add zod --filter backend

# Example: Adding a dev dependency to the admin-console
pnpm add -D tailwindcss --filter admin-console
```

### 4. Commit Convention

This repo uses **Commitlint** with the Conventional Commits specification. Every commit must follow the format:
`type(scope): description` 

Examples:
- `feat(backend): add authentication API`
- `fix(fe-user): resolve navigation bug`
- `chore: update dependencies`

---
<div align="center">
  Built with ❤️ by CineChat Team.
</div>
