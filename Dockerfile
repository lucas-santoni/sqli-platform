FROM node:10-alpine

WORKDIR /app

COPY srcs ./srcs/
COPY _public ./_public/
COPY package.json .
COPY yarn.lock .

RUN yarn install
ENTRYPOINT [ "node", "srcs/index.js" ]