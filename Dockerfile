FROM zenika/alpine-chrome:with-playwright

USER root
WORKDIR /app

COPY package.json ./
RUN yarn

COPY . .

EXPOSE 8080
CMD [ "yarn" ,"start"]