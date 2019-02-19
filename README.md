# f-wing
[![NPM Version](https://img.shields.io/npm/v/f-wing.svg)](https://npmjs.org/package/f-wing)
[![NPM Downloads](https://img.shields.io/npm/dm/f-wing.svg)](https://npmjs.org/package/f-wing)
[![CircleCI](https://circleci.com/gh/meandor/f-wing.svg?style=svg)](https://circleci.com/gh/meandor/f-wing)

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
import { Application, defaultMetricsRegistry } from 'f-wing';
import * as express from 'express';

const expressInstance = express();
const app = new Application(expressInstance, defaultMetricsRegistry);
// add routes here: app.addRoute(...)
app.start();
```
