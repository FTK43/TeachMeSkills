# stage 1
FROM node:20 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .

# stage 2
FROM node:20-alpine
WORKDIR /app
COPY --from=build /app ./
EXPOSE 3000

CMD [ "node", "index.js" ]