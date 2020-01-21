# build stage
FROM node:lts-alpine as build-stage

# set working directory
WORKDIR /app

# copy both 'package.json' (if available)
COPY package.json ./

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# build app for production with minification
RUN npm run build-prod


# production stage
FROM nginx:stable-alpine as production-stage

# Copy build result to nginx/html
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Nginx config
RUN rm /etc/nginx/conf.d/default.conf
COPY docker/nginx/conf.d/app.conf /etc/nginx/conf.d

# Set permission
RUN set -x ; \
  addgroup -g 82 -S www-data ; \
  adduser -u 82 -D -S -G www-data www-data && exit 0 ; exit 1
  
RUN chown -R www-data:www-data /usr/share/nginx/html/
RUN chmod -R 0755 /usr/share/nginx/html/

# Expose port 80 and start nginx server
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]