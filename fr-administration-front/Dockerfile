FROM node:19 as build

WORKDIR /app

COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock


RUN yarn install
COPY . .
RUN yarn build

FROM nginx as prod

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/fr-administration-front /usr/share/nginx/html

FROM node:19 as dev

WORKDIR /app

COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
RUN yarn install
COPY . .
CMD [ "yarn", "run", "start" ]
