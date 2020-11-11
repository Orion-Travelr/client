FROM node:14 as builder
WORKDIR /var/www
COPY . .
RUN npm ci
RUN npm run build

# This step is unnecessary as weback is used and therefore caching npm is unnecessary
#FROM node:14 as builder
#WORKDIR /var/www
#RUN chown node:node .
#USER node
#COPY package*.json ./
#RUN npm install

FROM nginx:latest as production
WORKDIR /var/www
COPY --from=builder /var/www/dist/ .
ADD docker/vhost.conf /etc/nginx/conf.d/default.conf
