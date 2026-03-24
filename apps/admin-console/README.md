# CineChat Admin Console

A modern administration dashboard for the CineChat platform, built with React Router 7, TypeScript, and Tailwind CSS.

## Overview

The CineChat Admin Console provides a robust interface for managing users, movies, and platform analytics. It features a secure authentication system, data visualization, and a responsive UI designed for administrative efficiency.

## Tech Stack

- **Framework:** React Router 7
- **Styling:** Tailwind CSS v4, Shadcn UI, Framer Motion
- **State Management:** Zustand & TanStack Query v5
- **Forms & Validation:** React Hook Form & Zod
- **Networking:** Axios with interceptors for token management
- **Data Display:** TanStack Table v8 & Recharts
- **Icons:** Lucide React

## Key Features

- **Authentication:** JWT-based login and registration with automated silent token refresh.
- **Route Protection:** Built-in AuthGuard and GuestGuard for access control.
- **Dashboard Overview:** Platform statistics visualized through interactive charts.
- **User Management:** Comprehensive management of user accounts and roles.
- **Movie Management:** Interface for cataloging and updating movie content.
- **Responsive Design:** Optimized layouts for various screen sizes.
- **Transitions:** Smooth UI interactions powered by Framer Motion.

## Project Structure

```text
app/
├── components/       # Reusable UI components (Shadcn UI, Animations)
├── features/         # Domain-driven feature modules (Auth, User)
├── hooks/            # Custom React hooks (useLogin, useLogout)
├── layouts/          # Layout wrappers (AdminLayout, AuthLayout)
├── lib/              # Shared utilities and API clients
├── queries/          # TanStack Query definitions
├── routes/           # Page components and route guards
├── services/         # API service layers
├── store/            # Global state (Zustand)
└── types/            # TypeScript interfaces and schemas
```

## Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- npm

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

### Building for Production

```bash
# Type-check and build the application
npm run build

# Start the production server
npm start
```

## Docker Support

Build and run the admin console using Docker:

```bash
docker build -t cinechat-admin .
docker run -p 3000:3000 cinechat-admin
```
