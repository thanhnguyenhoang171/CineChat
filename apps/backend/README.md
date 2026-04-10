<div align="center">
  <h1>🎬 CineChat Backend Service</h1>
  <p>The core RESTful API service for CineChat</p>

  <img src="https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=nestjs&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=flat-square&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white" />
</div>

## 🚀 Tech Stack

- **Framework**: NestJS (Node.js)
- **Database**: MongoDB (via Mongoose)
- **Caching**: Redis (via `ioredis`)
- **Authentication**: Passport.js (JWT, Local, Google OAuth20)
- **Uploads & Storage**: Cloudinary
- **Shared Package**: `@cinechat/types` (from workspace)

## 📁 Environment Variables

Copy the `.env.example` file to `.env` in the `apps/backend` directory and fill in the necessary values:

```env
PORT=3001
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/cinechat
REDIS_HOST=localhost
REDIS_PORT=6379

JWT_SECRET=your_jwt_secret
```
*(Add your OAuth and Cloudinary keys as well)*

## 🛠️ Scripts

You can run these scripts from the **monorepo root** utilizing Turborepo:

- `pnpm dev:be` - Start the backend in watch mode
- `pnpm build:be` - Build the backend for production
- `pnpm type-check:be` - Run TypeScript type-checking
- `pnpm lint:be` - Lint the codebase
- `pnpm clean:be` - Clean the output directories

Or directly from this folder (`apps/backend`):
```bash
pnpm dev        # Starts `nest start --watch`
pnpm build      # Compiles the application
pnpm seed       # Runs the database seed script
pnpm test       # Runs jest tests
```

## 🧩 Database Seeding

To seed your local database with initial mock data:
```bash
pnpm seed
```

## 📚 API Documentation

When the backend server is running in development mode, you can view the fully interactive Swagger API documentation at:
```text
http://localhost:3001/api/docs
```
*(Port depends on your `.env` configuration)*
