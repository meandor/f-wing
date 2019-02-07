# f-wing

[![CircleCI](https://circleci.com/bb/dschruhl/f-wing.svg?style=svg)](https://circleci.com/bb/dschruhl/f-wing)

> "Lets test these F-wings..."
>
> "Wait master I hate...flying."
>
> -- Qui-Gon Jin to Obi-Wan Kenobi

A base for Node.js microservices.

## Install
```bash
npm install
```

## Test
```bash
npm test
``` 

## Usage
You can use this library in your index.ts like this:
```typescript
import { Application } from 'f-wing';
import * as express from 'express';
import { Registry } from 'prom-client';

const expressInstance = express();
const metricsRegistry = new Registry();
const app = new Application(expressInstance, metricsRegistry);
// add routes here: app.addRoute(...)
app.start();
```
