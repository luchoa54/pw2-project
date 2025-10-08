FROM node:22-trixie-slim as build
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-trixie-slim as production
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json .
RUN npm ci --omit=dev
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/next.config.mjs ./next.config.mjs
EXPOSE 3000
CMD [ "npm", "start" ]

FROM node:22-trixie-slim AS development
WORKDIR /app
ENV NODE_ENV=development
COPY package*.json ./
RUN npm install
EXPOSE 3000
CMD [ "npm", "run", "dev"]