FROM nginx:1.23.2 as dev
COPY ./nginx.dev.conf /etc/nginx/conf.d/default.conf

FROM nginx:1.23.2 as prod
COPY ./nginx.conf /etc/nginx/conf.d/default.conf