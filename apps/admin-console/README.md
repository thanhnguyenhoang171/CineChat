<div align="center">
  <h1>🎬 CineChat Admin Console</h1>
  <p>The centralized administration dashboard for CineChat operators</p>

  <img src="https://img.shields.io/badge/React_Router_7-CA4245?style=flat-square&logo=react-router&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Radix_UI-161618?style=flat-square&logo=radix-ui&logoColor=white" />
  <img src="https://img.shields.io/badge/Zustand-4A3C29?style=flat-square&logo=react&logoColor=white" />
</div>

## 🚀 Tech Stack

- **Framework**: React Router v7 (React 19)
- **Bundler**: Vite
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI
- **State Management**: Zustand
- **Data Fetching/Caching**: TanStack React Query v5
- **Animations**: Framer Motion
- **Shared Package**: `@cinechat/types` (from workspace)

## 📁 Environment Variables

Copy the `.env.example` file to `.env` in the `apps/admin-console` directory and populate it:

```env
VITE_API_URL=http://localhost:3001/api
PORT=3000
```

## 🛠️ Scripts

You can run these scripts from the **monorepo root** utilizing Turborepo:

- `pnpm dev:fe-admin` - Start the Vite development server
- `pnpm build:fe-admin` - Build the admin application
- `pnpm type-check:fe-admin` - Pre-compile routes & run TypeScript type-checking
- `pnpm lint:fe-admin` - Lint the codebase
- `pnpm clean:fe-admin` - Clean the output directories

Or directly from this folder (`apps/admin-console`):
```bash
pnpm dev        # Start the dev server
pnpm build      # Build the application
pnpm start      # Serve the built application with React Router Serve
pnpm typecheck  # Trigger route generation and type validations
```
