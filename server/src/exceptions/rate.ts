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

export class NoRatingFound implements IException {
    status: boolean;
    message: string;
    errorCode: string;
    httpCode: number;

    constructor(message?: string) {
        this.status = false;
        this.message = message ? message : 'Could not find the rating you have made on the movie...';
        this.errorCode = 'rt3';
        this.httpCode = HttpCodes.NOT_FOUND;
    }
}

export class InvalidRating implements IException {
    status: boolean;
    message: string;
    errorCode: string;
    httpCode: number;

    constructor(message?: string) {
        this.status = false;
        this.message = message ? message : 'Invalid rating that is beeing sent...';
        this.errorCode = 'rt4';
        this.httpCode = HttpCodes.BAD_REQUEST;
    }
}

export class CannotRateYourOwnMovie implements IException {
    status: boolean;
    message: string;
    errorCode: string;
    httpCode: number;

    constructor(message?: string) {
        this.status = false;
        this.message = message ? message : 'You cannot rate movies that you have created...';
        this.errorCode = 'rt5';
        this.httpCode = HttpCodes.FORBIDDEN;
    }
}