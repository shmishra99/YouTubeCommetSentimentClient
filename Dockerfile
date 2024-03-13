FROM debian

RUN apt-get update
RUN apt-get install -y npm

ENV APP_HOME /app
WORKDIR $APP_HOME
COPY . ./

RUN npm install
RUN npm install -g @angular/cli

EXPOSE 8080

CMD ["ng", "serve", "--port", "8080"]
