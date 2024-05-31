FROM node:20-alpine

WORKDIR /var/www/html/todoplan

COPY package*.json ./

RUN npm ci

COPY . .

CMD [ "executable" ]

EXPOSE $PORT