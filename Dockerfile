FROM node:10.16.0

WORKDIR /app

COPY ./package.json .

COPY . .

CMD npm install -g yarn serve

RUN yarn build

EXPOSE 5000

CMD serve -s build