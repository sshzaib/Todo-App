FROM node:22-alpine3.19

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn 

COPY . .

RUN npx prisma generate
CMD ["yarn", "dev"]
