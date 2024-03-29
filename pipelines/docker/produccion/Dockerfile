FROM nginx:1.18-alpine

ARG APP=internal-management

COPY ./$APP /usr/share/nginx/html
COPY ./pipelines/docker/produccion/nginx.conf /etc/nginx/nginx.conf
