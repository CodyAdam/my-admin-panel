FROM node:19 AS prod

WORKDIR /app
COPY package.json package.json

RUN npm install -g @nestjs/cli
RUN npm install --production
COPY . .
RUN npm run build
EXPOSE 3000
CMD [ "node", "dist/main.js" ]

FROM node:19 AS dev
WORKDIR /app
EXPOSE 3000
CMD [ "npm", "run", "start:dev" ]