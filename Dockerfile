FROM node:22-alpine

WORKDIR /app

COPY . .

RUN npm install
RUN npm cache clean --force
RUN npm run build

CMD ["npm", "run", "serve"]

EXPOSE 5173