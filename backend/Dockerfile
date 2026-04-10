# Use official Node.js image
FROM node:25-alpine3.22

# Set working directory
WORKDIR /usr/src/app

# Copy dependency manifests
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the NestJS application
RUN npm run build

# Expose port (default NestJS is 3000)
EXPOSE 3000

# Run the application
CMD ["npm", "run", "start:prod"]
