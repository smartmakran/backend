FROM node:16-alpine

RUN apk add --no-cache tzdata git
ENV TZ Asia/Tehran

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV production

RUN npm run build

EXPOSE 80

CMD ["node", "dist/main.js"]
