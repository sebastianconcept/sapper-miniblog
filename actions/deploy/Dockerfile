FROM node:10
LABEL maintainer="Sebastian Sastre"

RUN mkdir -p /opt/miniblog
WORKDIR /opt/miniblog

RUN apt-get update \
  && apt-get -y upgrade \
  && rm -rf /var/lib/apt/lists/* \
  && true

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./package*.json ./
RUN npm install

COPY . ./

RUN npm run build

EXPOSE 3000

STOPSIGNAL SIGTERM

COPY ./actions/service/start ../start

WORKDIR /opt/
CMD "./start"