# Backend Dockerfile
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy application source code
COPY . .

# Expose the backend port (e.g., 5000)
EXPOSE 3000

# Start the backend server
CMD ["npm", "run","start:dev"]
