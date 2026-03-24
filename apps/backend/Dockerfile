### Stage 1: Build
FROM node:22-alpine AS builder

# Update system package and Patch security vulnerabilities
RUN apk update && apk upgrade && apk add --no-cache libc6-compat

WORKDIR /app

# Copy package.json and lock file
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy all source code (Docker will ignore files in .dockerignore)
COPY . .

# Build project
RUN npm run build

### Stage 2: Production
FROM node:22-alpine

# Update system package and Patch security vulnerabilities
RUN apk update && apk upgrade && apk add --no-cache libc6-compat

WORKDIR /app

# Copy builded files and package.json from stage builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Only install necessary libraries for Production (not install devDependencies)
RUN npm install --legacy-peer-deps --only=production

# Open port 8088
EXPOSE 8088

# Command run application
CMD [ "node", "dist/main" ]
