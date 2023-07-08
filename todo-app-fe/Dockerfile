FROM node:16-alpine as base

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

FROM base as dev

EXPOSE 3000

CMD [ "npm", "run", "dev" ]

FROM base as build

RUN npm run build

FROM nginx:alpine as production


ENV NODE_ENV production

# remove existing files from nginx directory
RUN rm -rf /usr/share/nginx/html/*

# Copy the built Next.js app from the previous stage
COPY --from=build /app/.next /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]



