import { Application } from '../src/Application';
import * as express from 'express';

jest.mock('express');

describe('Application tests', () => {
    let expressMock: express.Application;
    let testee: Application;

    beforeEach(() => {
        const expressMockApplication = jest.fn<express.Application>(() => ({
            listen: jest.fn(),
            use: jest.fn()
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
});
