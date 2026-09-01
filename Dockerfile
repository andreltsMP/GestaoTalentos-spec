FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json .npmrc ./
RUN npm ci

FROM node:20-alpine AS build
WORKDIR /app
COPY package.json .npmrc tsconfig.json next.config.ts tailwind.config.ts postcss.config.js ./
COPY --from=deps /app/node_modules ./node_modules
COPY src ./src
COPY public ./public
RUN npm run build

FROM node:20-alpine AS runtime
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
WORKDIR /app

COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

USER appuser
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
