import { HttpCodes } from '../helpers/httpCodesEnum';
import IException from '../interfaces/exceptions';

export class MovieAlreadyExists implements IException {
    status: boolean;
    message: string;
    errorCode: string;
    httpCode: number;

    constructor(message?: string) {
        this.status = false;
        this.message = message ? message : 'The same movie already exists...';
        this.errorCode = 'mv1';
        this.httpCode = HttpCodes.BAD_REQUEST;
    }
}

export class CouldNotCreateNewMovie implements IException {
    status: boolean;
    message: string;
    errorCode: string;
    httpCode: number;

    constructor(message?: string) {
        this.status = false;
        this.message = message ? message 
            : 'Error occurred while trying to create new movie. Please try again later...';
        this.errorCode = 'mv2';
        this.httpCode = HttpCodes.SERVER_ERROR;
    }
}

export class NoMovies implements IException {
    status: boolean;
    message: string;
    errorCode: string;
    httpCode: number;

    constructor(message?: string) {
        this.status = false;
        this.message = message ? message : 'There are no movies with the given criteria...';
        this.errorCode = 'mv3';
        this.httpCode = HttpCodes.NOT_FOUND;
    }
}