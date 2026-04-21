export const dockercomposeTemplate = () => {
    return `
version: "3.8"

services:
  app:
    build: .
    container_name: node_app
    ports:
      - "5000:5000"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - PORT=5000
    command: npm run dev
`;
};