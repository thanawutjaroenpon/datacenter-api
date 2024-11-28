FROM node:20-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install pm2 -g
RUN pm2 install pm2-logrotate
RUN pm2 set pm2-logrotate:rotateInterval '0 0 * * *'
COPY . .
RUN npm run build
EXPOSE 3000
CMD [ "pm2-runtime", "ecosystem.config.js"]