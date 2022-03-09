"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnableToLogout = exports.UserCreationFailed = exports.UserAlreadyExists = exports.CouldNotFindUser = void 0;
const httpCodesEnum_1 = require("../helpers/httpCodesEnum");
class CouldNotFindUser {
    constructor(message) {
        this.status = false;
        this.message = message ? message : 'Could not find any user(-s) with the given input...';
        this.errorCode = 'eu1';
        this.httpCode = httpCodesEnum_1.HttpCodes.NOT_FOUND;
    }
}
exports.CouldNotFindUser = CouldNotFindUser;
class UserAlreadyExists {
    constructor(message) {
        this.status = false;
        this.message = message ? message : 'User already exists with the given criteria...';
        this.errorCode = 'eu2';
        this.httpCode = httpCodesEnum_1.HttpCodes.BAD_REQUEST;
    }
}
exports.UserAlreadyExists = UserAlreadyExists;
class UserCreationFailed {
    constructor(message) {
        this.status = false;
        this.message = message ? message : 'Error occurred while trying to create new user...';
        this.errorCode = 'eu3';
        this.httpCode = httpCodesEnum_1.HttpCodes.SERVER_ERROR;
    }
}
exports.UserCreationFailed = UserCreationFailed;
class UnableToLogout {
    constructor(message) {
        this.status = false;
        this.message = message ? message : 'Error occurred while trying to logout...';
        this.errorCode = 'eu4';
        this.httpCode = httpCodesEnum_1.HttpCodes.SERVER_ERROR;
    }
}
exports.UnableToLogout = UnableToLogout;
