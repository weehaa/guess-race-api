FROM node:14-slim as prod
ENV NODE_ENV=production
WORKDIR /node
COPY package*.json ./
RUN npm install --only=production && npm cache clean --force
ENV PATH /node/node_modules/.bin:$PATH
WORKDIR /node/app
COPY . .
CMD ["node", "server.js"]

FROM prod as dev
ENV NODE_ENV=development
WORKDIR /node
RUN npm install --only=development
WORKDIR /node/app
# CMD [ "chown", "node:node", "/node", "-R" ]
CMD [ "nodemon", "server", "-L" ]

FROM dev as test
ENV NODE_ENV=development
CMD [ "npm", "test" ]