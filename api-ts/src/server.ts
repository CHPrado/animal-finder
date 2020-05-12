import { errors } from 'celebrate';
import cors from 'cors';
import express from 'express';
import http from 'http';

import routes from './routes';

class Server {
  public server: http.Server;

  private express: express.Application;

  public constructor() {
    this.express = express();

    this.server = new (http.Server)(this.express);

    this.middlewares();
  }

  private middlewares(): void {
    this.express.use(cors({ exposedHeaders: 'X-Total-Pages' }));
    this.express.use(express.json({ limit: '50mb' }));
    this.express.use(routes);
    this.express.use(errors());
  }
}

export default new Server().server;
