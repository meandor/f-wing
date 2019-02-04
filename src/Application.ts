import * as express from 'express';
import { Config } from './Config';
import { logger } from './Logger';

export class Application {
    private expressInstance: express.Application;

    constructor(expressInstance: express.Application) {
        this.expressInstance = expressInstance;
    }

    public start() {
        const port = Config.getInstance().get('port', 8080);
        this.expressInstance.listen(port, () => {
            logger.info('Started application on port %s', port);
        });
    }

    public addRoute(route: express.Router) {
        this.expressInstance.use(route);
    }
}
