### STAGE 1:BUILD ###
# Defining a node image to be used as giving it an alias of "build"
# Which version of Node image to use depends on project dependencies
# This is needed to build and compile our code
# while generating the docker image
FROM node:16.16.0-alpine AS build
# Create a Virtual directory inside the docker image
WORKDIR /source/app
# clean npm cache
RUN npm cache clean --force
# Copy package files to virtual directory
COPY package.json package-lock.json ./
# Install packages
RUN npm ci
# Copy files from local machine to virtual directory in docker image
COPY . .
# Build the app
RUN npm run build --prod


### STAGE 2:RUN ###
# Defining nginx image to be used
FROM nginx:1.22.0-alpine AS nginx
# Copying compiled code and nginx config to different folder
# NOTE: This path may change according to your project's output folder
COPY --from=build /source/app/dist/notalone /usr/share/nginx/html
COPY /config/nginx.conf  /etc/nginx/conf.d/default.conf
# Exposing a port, here it means that inside the container
# the app will be using Port 80 while running
EXPOSE 80
