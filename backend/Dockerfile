# Base stage
FROM node:20-slim AS base
WORKDIR /app
RUN apt-get update -y && apt-get install -y openssl

# Dependencies stage
FROM base AS deps
COPY package.json ./
RUN npm install

# Build stage
FROM deps AS builder
COPY . .
RUN npx prisma generate
RUN npm run build

# Production stage
FROM base AS runner
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY package.json ./

EXPOSE 5000
CMD ["npm", "run", "start"]
