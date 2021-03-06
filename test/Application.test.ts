import { Application } from '../src';
import * as express from 'express';
import { Registry } from 'prom-client';

describe('Application', () => {
    let expressMock: express.Application;
    let mockRegistry: Registry;
    let testee: Application;
    const expressMockUse = jest.fn();

    beforeEach(() => {
        const expressMockApplication = jest.fn<any, any>(() => ({
            listen: jest.fn(),
            use: expressMockUse
        }));
        expressMock = new expressMockApplication();

        const metricsMockRegistry = jest.fn<any, any>(() => ({
            contentType: jest.fn(),
            metrics: jest.fn(),
            registerMetric: jest.fn(),
            registerCollector: jest.fn(),
            collectors: () => []
        }));
        mockRegistry = new metricsMockRegistry();

        testee = new Application(expressMock, mockRegistry);
    });

    it('should start up app instance on default port', () => {
        testee.start();

        expect(expressMock.listen).toHaveBeenCalledWith(8080, expect.any(Function));
    });

    it('should add empty express route ', () => {
        const route = express.Router();
        testee.addRoute(route);

        expect(expressMock.use).toHaveBeenCalledWith(route);
    });

    it('should add express route with path', () => {
        const route = express.Router();
        route.stack.push({name: 'foo', route: {path: '/bar'}});
        testee.addRoute(route);

        expect(expressMock.use).toHaveBeenCalledWith(route);
    });

    it('should add route with name and without path', () => {
        const route = express.Router();
        route.stack.push({name: 'foo', route: undefined});
        testee.addRoute(route);

        expect(expressMock.use).toHaveBeenCalledWith(route);
    });

    it('should have added healthy endpoint when started', () => {
        testee.start();
        const calledRouter = expressMockUse.mock.calls[0][0];
        const firstRegisteredEndpint = calledRouter.stack.map((layer: any) => layer.route.path)[0];

        expect(firstRegisteredEndpint).toBe('/health');
    });

    it('should have added metrics endpoint when started', () => {
        testee.start();
        const calledRouter = expressMockUse.mock.calls[0][0];
        const secondRegisteredEndpint = calledRouter.stack.map((layer: any) => layer.route.path)[1];

        expect(secondRegisteredEndpint).toBe('/metrics');
    });
});
