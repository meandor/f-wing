import { Application } from '../src/Application';
import * as express from 'express';

jest.mock('express');

test('should start up app instance on default port', () => {
    const expressMockApplication = jest.fn<express.Application>(() => ({
        listen: jest.fn()
    }));
    const expressMock = new expressMockApplication();
    const app = new Application(expressMock);

    app.start();
    expect(expressMock.listen).toHaveBeenCalledWith(8080, expect.any(Function));
});
