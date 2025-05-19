# Use official Node.js 18 image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the app source code
COPY . .

RUN npm run build

# Expose your app port
EXPOSE 8080

# Start the app (adjust start script as needed)
CMD ["npm", "run", "start"]

