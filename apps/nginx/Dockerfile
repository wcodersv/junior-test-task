FROM nginx:latest

COPY apps/nginx/nginx.conf.template /etc/nginx/conf.d/default.conf
COPY apps/nginx/proxy_params /etc/nginx/proxy_params


CMD ["nginx", "-g", "daemon off;"]
