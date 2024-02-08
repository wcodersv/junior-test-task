# Install dependencies only when needed
FROM docker.io/node:19-alpine as build-stage
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY apps/ads-api apps/ads-api
COPY package*.json .
COPY tsconfig.base.json .
RUN npm install

RUN npm install -g nx
COPY nx.json .
RUN nx run ads-api:build


# image to install production-only node dependencies
FROM docker.io/node:19-alpine as install-stage
WORKDIR /app
COPY --from=build-stage /app/dist/apps/ads-api/package*.json .
RUN npm install --omit=dev


# Production image, copy all the files and run the app
FROM docker.io/node:19-alpine as runner
RUN apk update
RUN apk add --no-cache jq dumb-init

WORKDIR /app

COPY --from=build-stage /app/dist/apps/ads-api/main.* .
COPY --from=build-stage /app/dist/apps/ads-api/package*.json .
COPY --from=install-stage /app/node_modules node_modules

ENV PORT=80
EXPOSE 80

CMD [ "dumb-init", "node", "main.js" ]
