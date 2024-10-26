# Use an official Node.js 20 runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

ENV NODE_ENV=development

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (production only) and install PM2 globally in one RUN command
RUN npm install && npm install -g pm2

# Copy transpiled JavaScript files and other necessary files
COPY dist/ ./dist
COPY .env ./

# Debug: List files to ensure they were copied correctly
RUN ls -la /app/dist


# Expose the port on which the app will run
EXPOSE 3000

# Start the application using PM2
CMD ["pm2-runtime", "dist/index.js"]
