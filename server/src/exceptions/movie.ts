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