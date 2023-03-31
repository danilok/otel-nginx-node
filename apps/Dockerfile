ARG NODE_IMAGE=node:16.13.1-alpine

FROM $NODE_IMAGE
WORKDIR /home/node/app
USER node

EXPOSE 8090
EXPOSE 8091
CMD [ "npm", "run", "start" ]
