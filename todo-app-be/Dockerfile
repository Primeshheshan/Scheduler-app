FROM node:alpine as build

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

ENV DB_PASSWORD=a00ZdWBRGveUQZzz \
    DB_USERNAME=primeshwork \
    ACCESS_TOKEN_SECRET=1b6b6832c8d7b2a5e52da1e020a6be57f9b476fd4af1c0876ea351d5ea92df8bd55ffc165ca5336e58e501ee15ad0f029cf6be8143fa0db82eda42ef988cda25 \
    REFRESH_TOKEN_SECRET=476dd0a5f12d92f10db0efc2db09e7e6444b9e90d200c8c0e4bc85e3a79ec9e7e46760dc6f83a4125a8df646ecfc32b7bbde3a8f7c1263ec261a153deefe6615 

EXPOSE 8080

CMD [ "npm", "run", "start"]