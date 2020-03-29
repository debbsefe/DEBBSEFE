const http = require('http');

const routes = require('./app')
const server = http.createServer(routes.handler);

server.listen(8080);