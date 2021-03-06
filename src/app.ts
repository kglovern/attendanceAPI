import * as bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import Knex from 'knex';
import { Model } from 'objection';
import { MainRoutes } from './routes';

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.configApp();
    this.configRoutes();
  }

  private async configApp(): Promise<void> {
    /* Configure ENV variables */
    require('dotenv').config();

    /* Configure bodyparser middleware for JSON requests */
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));

    this.app.use(cors());

    /* Add persistence layer */
    const dbConfig = require('../knexfile');
    const knex = Knex(dbConfig.development);
    // Build database if it doesn't exist
    await knex.migrate.latest();
    Model.knex(knex);
  }

  private configRoutes(): void {
    const router = express.Router();
    this.app.use('/v1', MainRoutes);
    this.app.use('/', router);
  }
}

export default new App().app;
