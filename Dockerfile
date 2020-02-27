FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001
RUN npm run prod:build

CMD [ "npm", "run", "prod:start" ]
