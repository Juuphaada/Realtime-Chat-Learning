# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ARG VITE_SERVER_URL
ARG VITE_SOCKET_URL

ENV VITE_SERVER_URL=$VITE_SERVER_URL
ENV VITE_SOCKET_URL=$VITE_SOCKET_URL

RUN test -n "$VITE_SERVER_URL" || (echo "VITE_SERVER_URL is missing" && exit 1)
RUN test -n "$VITE_SOCKET_URL" || (echo "VITE_SOCKET_URL is missing" && exit 1)

RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]