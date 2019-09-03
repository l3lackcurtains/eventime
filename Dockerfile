FROM node:10.16.0

WORKDIR /app

COPY ./package.json .

CMD npm install -g yarn

COPY . .

RUN yarn

EXPOSE 3000

CMD yarn start