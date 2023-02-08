FROM alpine

RUN apk add --update nodejs npm

# WORKDIR
RUN mkdir -p /usr/src/app

COPY . /usr/src/app

RUN cd /usr/src/app && npm install

EXPOSE 3000

CMD [ "node", "/usr/src/app/server.js" ]