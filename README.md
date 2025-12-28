# CineChat

CineChat is a personal project designed as a comprehensive platform for movie enthusiasts. It consists of a robust backend API and a modern admin console for management.

## Project Overview

The repository is monorepo-style, organized into two main distinct applications:

### 1. Backend API
Located in [`/backend`](./backend), this is a scalable RESTful API built with **NestJS**.

*   **Tech Stack:** NestJS, TypeScript, MongoDB (Mongoose), Passport.js.
*   **Key Features:**
    *   JWT Authentication (Access & Refresh Tokens).
    *   Role-Based Access Control (RBAC) for granular permission management.
    *   Global validation and error handling.
    *   Automated Swagger API documentation.

### 2. Admin Console
Located in [`/frontend/admin-console`](./frontend/admin-console), this is a modern administration dashboard built with **React Router 7**.

*   **Tech Stack:** React Router 7, TypeScript, Tailwind CSS v4, Shadcn UI, Zustand, TanStack Query.
*   **Key Features:**
    *   Secure Authentication flows with silent refresh.
    *   Dashboard analytics and data visualization.
    *   Comprehensive management interfaces for Users and other resources.
    *   Responsive and animated UI.

## Getting Started

To set up and run the applications, please refer to the detailed `README.md` files in each directory:

*   [Backend Setup Guide](./backend/README.md)
*   [Admin Console Setup Guide](./frontend/admin-console/README.md)