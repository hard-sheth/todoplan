FROM node:20-alpine

WORKDIR todoplan

COPY package*.json ./

RUN npm ci

RUN npm install pm2 -g

COPY . .

RUN npm run build

CMD node ./dist/main.js
# CMD [ "pm2-runtime", "./dist/main.js" ]


EXPOSE 4000


# docker run -e PORT=8080 -p $PORT:$PORT --expose $PORT -it your-image-name
