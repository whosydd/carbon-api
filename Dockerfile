FROM zenika/alpine-chrome:with-playwright

USER root
WORKDIR /app

ENV PORT=10000

COPY package.json ./
RUN yarn

COPY . .

EXPOSE 10000
CMD [ "yarn" ,"start"]