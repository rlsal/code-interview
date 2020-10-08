import { Express } from "express";

import bodyParser from "body-parser";

const setupMiddlewares = (app: Express): void => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
};

export { setupMiddlewares };
