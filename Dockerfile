# Stage 1: Build the client
FROM node:20-alpine AS builder

WORKDIR /app

COPY client/package*.json ./client/

RUN npm install --prefix client --omit=dev

COPY client/ ./client/

RUN npm run build --prefix client

# Stage 2: Set up the server
FROM node:20-alpine

WORKDIR /app

# Copy the built client files to /app/client/dist
RUN mkdir -p client/dist
COPY --from=builder /app/client/dist /app/client/dist

# Copy the server files to /app/server
RUN mkdir -p server
COPY server/ /app/server/

WORKDIR /app/server

COPY server/package*.json ./

RUN npm install --omit=dev

EXPOSE 5000

CMD ["node", "main.js"]
