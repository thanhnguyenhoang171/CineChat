<div align="center">
  <h1>🎬 CineChat User Console</h1>
  <p>The primary customer-facing platform for CineChat audience members</p>

  <img src="https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Radix_UI-161618?style=flat-square&logo=radix-ui&logoColor=white" />
</div>

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Framework**: React 19 (Includes React Compiler plugin)
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI
- **Animations**: Motion (Framer)
- **Shared Package**: `@cinechat/types` (from workspace)

## 📁 Environment Variables

Create `.env.local` or `.env` in the `apps/user-console` directory and populate it:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## 🛠️ Scripts

You can run these scripts from the **monorepo root** utilizing Turborepo:

- `pnpm dev:fe-user` - Start the Next.js development server
- `pnpm build:fe-user` - Build the application for production
- `pnpm type-check:fe-user` - Run TypeScript type-checking
- `pnpm lint:fe-user` - Lint the codebase
- `pnpm clean:fe-user` - Clean the `.next` and output directories

Or directly from this folder (`apps/user-console`):
```bash
pnpm dev        # Start the Next.js dev server
pnpm build      # Compile the application for production
pnpm start      # Start the Next.js production server
pnpm type-check # Run type validations
```
