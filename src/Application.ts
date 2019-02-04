import * as express from 'express';
import { Config } from './Config';
import { logger } from './Logger';

export class Application {
    private expressInstance: express.Application;

    constructor(expressInstance: express.Application) {
        this.expressInstance = expressInstance;

        this.addRoute(this.routerWithDefaultEndpoints());
    }

    private routerWithDefaultEndpoints() {
        const router = express.Router();
        router.get('/health', (_, res) => {
            res.status(200).send('HEALTHY');
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
        logger.info('adding endpoint %s', route.stack.map(layer => layer.route.path));
        this.expressInstance.use(route);
    }
}
