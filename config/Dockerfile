FROM node:23-bullseye AS base

RUN mkdir /app
COPY package.json /app/

WORKDIR /app
RUN ls /app && npm install

COPY . .

HEALTHCHECK CMD curl --fail http://localhost:3000/ || exit 1
