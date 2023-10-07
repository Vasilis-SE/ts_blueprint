import path from 'path';

import winston from 'winston';
import { format } from 'date-fns';

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

const level = () => {
    const env = process.env.NODE_ENV || 'development';
    return env === 'development' ? 'debug' : 'warn';
};

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
};

winston.addColors(colors);

const winstonFormat = winston.format.combine(
    winston.format.timestamp({ format: 'HH:mm:ss' }),
    winston.format.printf((info) => {
        const logFilePath = path.basename(info[Symbol.for('splat')][0]);
        return `[${info.timestamp}|${logFilePath}] ${info.level.toUpperCase()}: ${info.message}`;
    }),
);

const transports = [
    new winston.transports.Console(),
    new winston.transports.File({
        filename: `logs/log_error_${format(new Date(), 'dd-MM-yyyy')}.log`,
        level: 'error',
    }),
    new winston.transports.File({
        filename: `logs/log_${format(new Date(), 'dd-MM-yyyy')}.log`,
    }),
];

const Logger = winston.createLogger({
    level: level(),
    levels,
    format: winstonFormat,
    transports,
});

export default Logger;
