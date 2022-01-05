FROM node:14.18-alpine3.12
RUN npm -v
RUN node -v
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm","start"]
