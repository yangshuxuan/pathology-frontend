#!/bin/sh --login

cp -r /usr/share/nginx/html/static/* /app/static
nginx -g "daemon off;"
