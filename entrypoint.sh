#!/bin/sh --login

yes | cp -rf /usr/share/nginx/html/static/* /app/static
nginx -g "daemon off;"
