FROM node as build

WORKDIR /app

COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock


RUN yarn install
COPY . .
RUN yarn build

FROM nginx

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/fr-administration-front /usr/share/nginx/html

# how to build
# docker build -t web_build .

# how to run
# docker run -it --rm -d -p 8080:80 --name web web_build 