FROM node:14-alpine as build_static
ARG ENV
COPY package.json yarn.lock ./
RUN yarn install
COPY . ./
RUN yarn --max_old_space_size=4096 build-$ENV
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build_static /build /usr/share/nginx/html
