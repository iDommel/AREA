FROM nginx

WORKDIR /usr/share/react

RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -

RUN apt-get install -y nodejs

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN rm -rf /usr/share/nginx/html/*

RUN cp -a build/. /usr/share/nginx/html