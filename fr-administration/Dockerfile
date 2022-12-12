FROM node:19 AS prod

WORKDIR /app
COPY . .

RUN npm install --production
RUN npm run build
EXPOSE 3000
CMD [ "node", "dist/main.js" ]

FROM node:19 AS dev
WORKDIR /app
EXPOSE 3000
CMD [ "npm", "run", "start:dev" ]