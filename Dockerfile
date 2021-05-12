FROM node:14-slim as prod
ENV NODE_ENV=production
WORKDIR /node
COPY package*.json ./
RUN npm install && npm cache clean --force
ENV PATH /node/node_modules/.bin:$PATH
WORKDIR /node/app
COPY . .
RUN npm run build
CMD ["node", "build/server"]

FROM node:14-slim as dev
ENV NODE_ENV=development
WORKDIR /node
COPY package*.json ./
RUN npm install
ENV PATH /node/node_modules/.bin:$PATH
WORKDIR /node/app
COPY . .
# CMD [ "chown", "node:node", "/node", "-R" ]
# The -L enforces Chokidar polling, which is needed to watch for file changes in our container.
CMD [ "nodemon", "src/server.ts", "-L" ]  

FROM dev as test
ENV NODE_ENV=development
CMD [ "npm", "test" ]