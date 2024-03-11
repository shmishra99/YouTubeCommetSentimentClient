FROM debian

RUN apt-get update
RUN apt-get install -y npm

ENV APP_HOME /app
WORKDIR $APP_HOME
COPY . ./

WORKDIR /app

RUN npm install
RUN npm install -g @angular/cli

EXPOSE 4200

CMD ["ng", "serve"]
