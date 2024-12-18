# Stage 1: Build the application
FROM node:20-alpine as build
WORKDIR /ams
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build  # Build the production-ready files

# Stage 2: Serve the application with NGINX
FROM nginx:alpine
COPY --from=build /ams/dist /usr/share/nginx/html  
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
