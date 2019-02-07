import * as winston from 'winston';
import { Logger } from 'winston';
import { Config } from './Config';

let loggerState: Logger;

function initLogger() {
    const fileFormat = winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple(),
        winston.format.json()
    );
    loggerState = winston.createLogger({
        level: String(Config.getInstance().get('log-level', 'info')),
        format: winston.format.combine(
            winston.format.splat(),
            winston.format.colorize(),
            winston.format.timestamp(),
            winston.format.printf((info: any) => {
                    return `${info.timestamp} [${info.level}]: ${info.message}`;
                }
            )
        ),
        defaultMeta: {service: Config.getInstance().get('app-name')},
        transports: [
            new winston.transports.File({filename: 'error.log', level: 'error', format: fileFormat}),
            new winston.transports.File({filename: 'info.log', format: fileFormat}),
            new winston.transports.Console()
        ]
    });
}

function getLogger() {
    if (loggerState === undefined) {
        initLogger();
    }
    return loggerState;
}

export const logger = getLogger();
