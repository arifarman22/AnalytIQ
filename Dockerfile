# Frontend Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the application (optional for production)
RUN npm run build

# Expose port
EXPOSE 5173

# Serve the app in dev mode
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
