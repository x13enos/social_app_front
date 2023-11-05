# Dockerfile for creating an app vue3 with vite and volume persitent
 
# Set the base image
FROM --platform=linux/amd64 node:18.5.0-alpine as build-stage
 
# Maintainer
LABEL maintainer="Andres Sild <andres.t.sild@gmail.com>"

SHELL ["/bin/sh", "-c"]

# Set environment variables
ENV APP_DIR=/app
ENV VUE_APP_API_URL=http://localhost:3000
 
# Create app directory
RUN mkdir -p $APP_DIR
WORKDIR $APP_DIR
 
# Install vite
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"

RUN npm install --global pnpm
RUN pnpm install -g vite
 
# Copy the source code
COPY . $APP_DIR

# Remove node_modules
RUN rm -rf node_modules
 
# Install dependencies
RUN pnpm install
 
RUN pnpm build

# Stage 2: Serve Vue app with Nginx
FROM --platform=linux/amd64 nginx:1.25.1 as prod-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]