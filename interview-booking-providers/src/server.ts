
import bodyParser from "body-parser";
import express, { Application } from "express";
import { RoutesConfig } from "./config/routes.config";
import http, { Server } from "http";
import { printRequest } from "./utils/functions";
require('dotenv').config()

export class ServerBoot {
  private readonly port: number = +process.env.PORT;
  private app: Application;
  public server: Server;

  constructor() {
    this.app = express();
    this.server = this.createServer();
    this.listen();
  }

  private createServer(): Server {
    return http.createServer(this.app);
  }

  private listen(): void {
    this.loadMiddlewares();
    this.configModules();
    
    this.server.listen(this.port, () => {
      console.log(`Our app server is running on http://localhost:${this.port}`);
    });
  }

  private configModules(): void {
    RoutesConfig(this.app);
  }

  private loadMiddlewares(): void {
    this.app.use( bodyParser.json() );
    this.app.use( bodyParser.urlencoded({ extended: true }) );
    this.app.use( printRequest );
  }
} 


// Running the server
const serverInstance: ServerBoot = new ServerBoot();
