FROM node:alpine

WORKDIR /app/client

COPY package*.json .
RUN npm install

COPY tsconfig.json .
COPY vite.config.ts .
COPY index.html .

COPY src .

EXPOSE 3001

CMD $(npm bin)/vite --host
