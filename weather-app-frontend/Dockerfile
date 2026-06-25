ARG NODE_TAG="12.18.3-alpine"
ARG NGINX_TAG="stable-alpine"

FROM node:${NODE_TAG} as yarnBuild
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

FROM nginx:1.19-alpine
COPY --from=yarnBuild /usr/src/app/build /usr/share/nginx/html
COPY .server/nginx /etc/nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
