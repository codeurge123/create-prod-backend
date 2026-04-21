export const dockerfileTemplate = () => `
# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Start server
ENTRYPOINT ["node", "src/index.js"]
`;