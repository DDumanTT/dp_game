FROM node:alpine

WORKDIR /app/server

COPY ./package*.json .
RUN npm install

COPY src .

EXPOSE 3000

CMD npm run start
