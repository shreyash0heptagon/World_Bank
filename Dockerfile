# Pull Node Image from Docker Hub
FROM node:15.1-alpine AS build

# Set Working Directory in Docker
WORKDIR /usr/src/app

# Copy the Source Files in to Docker Working Directory
COPY . /usr/src/app

# Install Node Modules
RUN npm install

#RUN CI=true npm test

RUN npm run build

# Pull the Nginx Image from Docker Hub
FROM nginx:1.17.1-alpine

# Copy Nginx Config File from Source to Docker 
COPY nginx.conf /etc/nginx/nginx.conf

# Copy Builded Source File in to Nginx DocRoot Path(Inside Docker)
COPY --from=build /usr/src/app/build/ /usr/share/nginx/html

EXPOSE 80