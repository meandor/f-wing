import { Application } from '../src/Application';
import * as express from 'express';

describe('Application', () => {
    let expressMock: express.Application;
    let testee: Application;
    const expressMockUse = jest.fn();

    beforeEach(() => {
        const expressMockApplication = jest.fn<express.Application>(() => ({
            listen: jest.fn(),
            use: expressMockUse
        }));
        expressMock = new expressMockApplication();
        testee = new Application(expressMock);
    });

    it('should start up app instance on default port', () => {
        testee.start();

        expect(expressMock.listen).toHaveBeenCalledWith(8080, expect.any(Function));
    });

    it('should add express route ', () => {
        const route = express.Router();
        testee.addRoute(route);

        expect(expressMock.use).toHaveBeenCalledWith(route);
    });

    it('should have added healthy endpoint when started', () => {
        testee.start();
        const calledRouter = expressMockUse.mock.calls[0][0];
        const firstRegisteredEndpint = calledRouter.stack.map((layer: any) => layer.route.path)[0];

        expect(firstRegisteredEndpint).toBe('/health');
    });
});
