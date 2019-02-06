import { Application } from './src/Application';
import * as express from 'express';
import { Registry } from 'prom-client';

const expressInstance = express();
const metricsRegistry = new Registry();
const app = new Application(expressInstance, metricsRegistry);
app.start();
