FROM node:20-alpine

WORKDIR /var/www/html/todoplan

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

CMD node dist/src/main.js

EXPOSE $PORT


# docker run -e PORT=8080 -p $PORT:$PORT --expose $PORT -it your-image-name
