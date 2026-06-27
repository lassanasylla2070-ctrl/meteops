FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --network-timeout 600000

COPY . .

RUN yarn build

FROM node:20-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --production --network-timeout 600000

COPY --from=builder /app/dist ./dist

EXPOSE 3001

CMD ["node", "dist/main"]
