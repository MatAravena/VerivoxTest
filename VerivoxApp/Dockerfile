
# Use Node.js as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the default Angular port
EXPOSE 4200

# Start the Angular development server
CMD ["npm", "start"]



# The rest of the commands are failed attempts as I wanted to create a virtual production env
# # Stage 1: Build the Angular application
# FROM node:16 AS build-stage

# # Set the working directory inside the container
# WORKDIR /VerivoxApp/src/app

# # Install first angular-cli
# #RUN npm install -g @angular/cli

# # Copy the package.json and package-lock.json files to install dependencies
# COPY package*.json ./
# RUN npm install

# # Copy the rest of the application files
# COPY . /VerivoxApp/src/app

# # Build the Angular application for production
# RUN npm run build -- --configuration=production

# # Stage 2: Serve the application using Nginx
# FROM nginx:1.21-alpine AS production-stage

# # Copy the Angular application build output from the previous stage
# COPY --from=build-stage /app/dist/verivox-app /usr/share/nginx/html

# # Expose port 80
# EXPOSE 80

# # Start Nginx server
# CMD ["nginx", "-g", "daemon off;"]

# FROM node:16

# WORKDIR /VerivoxApp/src/app

# COPY . /VerivoxApp/src/app

# RUN npm install -g @angular/cli

# RUN npm install

# CMD ["ng", "serve", "--host", "0.0.0.0"]

