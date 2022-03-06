"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidTokenProvided = exports.FailedToRenderHash = void 0;
const httpCodesEnum_1 = require("../helpers/httpCodesEnum");
class FailedToRenderHash {
    constructor(message) {
        this.status = false;
        this.message = message ? message : 'Could not render hash for password...';
        this.errorCode = 'es1';
        this.httpCode = httpCodesEnum_1.HttpCodes.SERVER_ERROR;
    }
}
exports.FailedToRenderHash = FailedToRenderHash;
class InvalidTokenProvided {
    constructor(message) {
        this.status = false;
        this.message = message ? message : 'Invalid token provided on request header...';
        this.errorCode = 'es2';
        this.httpCode = 400;
    }
}
exports.InvalidTokenProvided = InvalidTokenProvided;
