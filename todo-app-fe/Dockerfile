# Stage 1: Create the base stage
FROM node:16-alpine as base

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

# Stage 2: Create the dev stage
FROM base as dev

EXPOSE 3000

CMD [ "npm", "run", "dev" ]

# Stage 3: Create the build stage
FROM base as build

RUN npm run build

# Stage 4: Create the NGINX stage
FROM nginx:latest as production

ENV NODE_ENV production

# remove existing files from nginx directory
RUN rm -rf /usr/share/nginx/html/*

# copy built assets from 'builder' stage
COPY --from=build /app/out /usr/share/nginx/html

# add nginx config
COPY conf/nginx.conf /etc/nginx/conf.d/default.conf

# expose port 80 for nginx
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]



