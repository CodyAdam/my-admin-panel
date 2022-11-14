FROM node:19

WORKDIR /app
COPY . .

RUN npm install --production
RUN npm run build
EXPOSE 3000
CMD [ "node", "dist/main.js" ]