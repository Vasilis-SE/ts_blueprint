import { HttpCodes } from '../helpers/httpCodesEnum';
import IException from '../interfaces/exceptions';

export class UserAlreadyRated implements IException {
    status: boolean;
    message: string;
    errorCode: string;
    httpCode: number;

    constructor(message?: string) {
        this.status = false;
        this.message = message ? message : 'It seems you have already voted for that specific movie...';
        this.errorCode = 'rt1';
        this.httpCode = HttpCodes.BAD_REQUEST;
    }
}

export class FailedToRateMovie implements IException {
    status: boolean;
    message: string;
    errorCode: string;
    httpCode: number;

    constructor(message?: string) {
        this.status = false;
        this.message = message ? message : 'Error occurred while trying to rate the movie. Try again later...';
        this.errorCode = 'rt2';
        this.httpCode = HttpCodes.SERVER_ERROR;
    }
}

