FROM node:14.18-alpine3.12  AS builder
#WORKDIR /app
#COPY package*.json ./
#RUN npm install
#COPY . .
#EXPOSE 3000
#CMD ["npm","start"]
WORKDIR /app
# Copy all files from current directory to working dir in image
# install node modules and build assets
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# nginx state for serving content
FROM nginx:alpine
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /app/build .
# Containers run nginx with global directives and daemon off
#ENTRYPOINT ["nginx", "-g", "daemon off;"]
COPY entrypoint.sh ./
RUN chmod u+x ./entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]
