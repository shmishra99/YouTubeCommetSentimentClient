FROM node:slim

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install -g @angular/cli
RUN npm install

COPY . ./

RUN npm run build

EXPOSE 8080

CMD exec ng serve --host 0.0.0.0 --port $PORT
