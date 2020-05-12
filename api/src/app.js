const server = require('./server');

const port = process.env.SERVER_PORT ? process.env.SERVER_PORT : 3333;

server.listen(port);
