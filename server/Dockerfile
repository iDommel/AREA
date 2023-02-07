FROM node:17

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install typescript -g

RUN npm install -g prettier

COPY . ./

RUN npm run build

CMD [ "node", "build/server.js" ]