import { Application } from './src/Application';
import * as express from 'express';

const expressInstance = express();
const app = new Application(expressInstance);
app.start();
