# CineChat Backend

A NestJS-based backend API for the CineChat application, providing authentication, role-based access control (RBAC), and user management.

## Features

- Modular NestJS architecture.
- JWT-based authentication with Access and Refresh tokens.
- Role-Based Access Control (RBAC) with Users, Roles, and Permissions.
- MongoDB integration using Mongoose.
- Global validation pipes and transformation interceptors.
- Automated API documentation with Swagger.
- Configurable security headers, CORS, and versioning.

## Technology Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: MongoDB
- **Authentication**: Passport.js (Local and JWT)
- **Validation**: class-validator and Joi
- **Documentation**: Swagger

## Setup and Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd CineChat/backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Configuration**:
   Create a `.env` file in the root directory and define the following variables:
   ```env
   HOST=0.0.0.0
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/cinechat
   JWT_PUBLIC_KEY="your-rsa-public-key"
   JWT_PRIVATE_KEY="your-rsa-private-key"
   JWT_EXPIRES_IN=1h
   JWT_REFRESH_EXPIRES_IN=7d
   ```

4. **Initialize Database**:
   Run the seed script to populate initial roles and permissions:
   ```bash
   npm run seed
   ```

## Running the Application

- **Development**: `npm run dev`
- **Build**: `npm run build`
- **Production**: `npm run start:prod`
- **Linting**: `npm run lint`

## API Documentation

Once the server is running, the Swagger UI is accessible at:
`http://localhost:3000/api/docs`

## Testing

- **Unit tests**: `npm run test`
- **E2E tests**: `npm run test:e2e`
- **Coverage**: `npm run test:cov`

## License

This project is UNLICENSED.
