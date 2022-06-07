# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install --test
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d
RUN mkdir /var/www &&\
    mkdir /var/www/html
COPY ./error404/error404.html ./error404/favicon.ico /var/www/html/
RUN mkdir /etc/nginx/snippets/
COPY ./custom-error-page.conf /etc/nginx/snippets/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]