FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock ./
COPY node_modules ./node_modules
COPY . .
RUN yarn build

FROM node:20-alpine
WORKDIR /app
COPY package.json yarn.lock ./
COPY node_modules ./node_modules
COPY --from=builder /app/dist ./dist
EXPOSE 3001
CMD ["node", "dist/main"]
