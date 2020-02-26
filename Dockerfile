FROM node:12
LABEL maintainer="Sebastian Sastre"

RUN mkdir -p /opt/miniblog
WORKDIR /opt/miniblog

ENV PORT 8080
ENV HOST 0.0.0.0

RUN apt-get update && \
  apt-get -y upgrade && \
  rm -rf /var/lib/apt/lists/* && \
  true

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./package*.json ./
#RUN npm install --only=production
RUN npm install

COPY . ./

RUN npm run build

EXPOSE 8080
EXPOSE 3000

STOPSIGNAL SIGTERM

# Run the web service on container startup.
CMD [ "npm", "start" ]
