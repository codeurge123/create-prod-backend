export const dockerignoreTemplate = () => `
node_modules/
npm-debug.log
yarn-error.log

.git
.gitignore

.env
.env.local

Dockerfile
docker-compose.yml
.dockerignore

coverage
dist
build

.vscode
.idea

*.log
`