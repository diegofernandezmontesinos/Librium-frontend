# Etapa 1: Build del frontend
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Servir con Nginx
FROM nginx:stable-alpine

# Copiamos la build del frontend
COPY --from=build /app/dist /usr/share/nginx/html

# 👇 Ajustamos la ruta del nginx.conf
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

