const { errors } = require('celebrate');
const cors = require('cors');
const express = require('express');
const http = require('http');

const routes = require('./routes');

class Server {
  constructor() {
    this.express = express();

    this.server = new (http.Server)(this.express);

    this.middlewares();
  }

  middlewares() {
    this.express.use(cors({ exposedHeaders: 'X-Total-Pages' }));
    this.express.use(express.json({ limit: '50mb' }));
    this.express.use(routes);
    this.express.use(errors());
  }
}

module.exports = new Server().server;
