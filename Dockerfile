FROM node:lts-alpine

WORKDIR /app

COPY package.json ./
RUN npm install --only=production

COPY public/ public/
COPY src/ src/
COPY .env ./

USER node
CMD ["npm", "start"]
EXPOSE 8000

