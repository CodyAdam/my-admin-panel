FROM node

WORKDIR /app

COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock

RUN yarn install
COPY . .
RUN yarn build

EXPOSE 3000

CMD ["node", "dist/main.js"]


# how to build
# docker build -t back_build .

# how to run
# docker run --rm -d -p 8081:3000 --name back back_build