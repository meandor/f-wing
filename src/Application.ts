import * as express from 'express';
import * as helmet from 'helmet';
import { Config } from './Config';
import { logger } from './logger';
import * as metrics from 'prom-client';
import { Registry } from 'prom-client';

export class Application {
    private expressInstance: express.Application;

    constructor(expressInstance: express.Application, metricsRegistry: Registry) {
        this.expressInstance = expressInstance;
        metrics.collectDefaultMetrics({register: metricsRegistry});
        this.addRoute(this.routerWithDefaultEndpoints(metricsRegistry));
        this.expressInstance.use(helmet());
    }

    private static getDescriptor(layer: any): string {
        if (layer.route) {
            return layer.route.path;
        } else {
            return layer.name;
        }
    }

    private routerWithDefaultEndpoints(metricsRegistry: Registry) {
        const router = express.Router();
        router.get('/health', (_, res) => {
            res.status(200).send('HEALTHY');
        });

        router.get('/metrics', (_, res) => {
            res.set('Content-Type', metricsRegistry.contentType);
            res.end(metricsRegistry.metrics());
        });

        return router;
    }

    public start() {
        const port = Config.getInstance().get('port', 8080);
        this.expressInstance.listen(port, () => {
            logger.info('Started application on port %s', port);
        });
    }

    public addRoute(route: express.Router) {
        logger.info('adding endpoint %s', route.stack.map(Application.getDescriptor));
        this.expressInstance.use(route);
    }
}
