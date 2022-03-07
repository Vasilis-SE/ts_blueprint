import { HttpCodes } from '../helpers/httpCodesEnum';
import IException from '../interfaces/exceptions';

export class InvalidTokenProvided implements IException {
    status: boolean;
    message: string;
    errorCode: string;
    httpCode: number;

    constructor(message?: string) {
        this.status = false;
        this.message = message ? message : 'The token you have provided is invalid...';
        this.errorCode = 'au1';
        this.httpCode = HttpCodes.BAD_REQUEST;
    }
}
