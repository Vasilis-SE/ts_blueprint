"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidParameterFormat = exports.RequestBodyIsEmpty = exports.InvalidPassword = exports.InvalidParameterType = exports.InputExceedMaxLimit = exports.PasswordIsWeak = exports.ContainsInvalidChars = exports.ExcessiveBodyProperties = exports.InvalidPropertyType = exports.PropertyIsMissing = void 0;
const httpCodesEnum_1 = require("../helpers/httpCodesEnum");
class PropertyIsMissing {
    constructor(message, p) {
        this.status = false;
        this.message = message ? message : 'Property is missing from the request...';
        this.errorCode = 'ev1';
        this.httpCode = httpCodesEnum_1.HttpCodes.NOT_FOUND;
        this.property = p;
    }
}
exports.PropertyIsMissing = PropertyIsMissing;
class InvalidPropertyType {
    constructor(message, p, ex) {
        this.status = false;
        this.message = message ? message : 'Invalid property type give...';
        this.errorCode = 'ev2';
        this.httpCode = httpCodesEnum_1.HttpCodes.BAD_REQUEST;
        this.property = p;
        this.expected = ex;
    }
}
exports.InvalidPropertyType = InvalidPropertyType;
class ExcessiveBodyProperties {
    constructor(message) {
        this.status = false;
        this.message = message ? message : 'Excessive properties found inside request body. Check your payload...';
        this.errorCode = 'ev3';
        this.httpCode = httpCodesEnum_1.HttpCodes.BAD_REQUEST;
    }
}
exports.ExcessiveBodyProperties = ExcessiveBodyProperties;
class ContainsInvalidChars {
    constructor(message, p) {
        this.status = false;
        this.message = message ? message : 'Contains invalid characters...';
        this.errorCode = 'ev5';
        this.httpCode = httpCodesEnum_1.HttpCodes.BAD_REQUEST;
        this.property = p;
    }
}
exports.ContainsInvalidChars = ContainsInvalidChars;
class PasswordIsWeak {
    constructor(message) {
        this.status = false;
        this.message = message
            ? message
            : 'The provided password is weak. Type using a combination of lower case, uppers case, numbers, special characters ...';
        this.errorCode = 'ev6';
        this.httpCode = httpCodesEnum_1.HttpCodes.BAD_REQUEST;
    }
}
exports.PasswordIsWeak = PasswordIsWeak;
class InputExceedMaxLimit {
    constructor(message, p) {
        this.status = false;
        this.message = message ? message : 'Input exceeds max limit length...';
        this.errorCode = 'ev7';
        this.httpCode = httpCodesEnum_1.HttpCodes.BAD_REQUEST;
        this.property = p;
    }
}
exports.InputExceedMaxLimit = InputExceedMaxLimit;
class InvalidParameterType {
    constructor(message, p, ex) {
        this.status = false;
        this.message = message ? message : 'Invalid parameter type given...';
        this.errorCode = 'ev8';
        this.httpCode = httpCodesEnum_1.HttpCodes.BAD_REQUEST;
        this.property = p;
        this.expected = ex;
    }
}
exports.InvalidParameterType = InvalidParameterType;
class InvalidPassword {
    constructor(message) {
        this.status = false;
        this.message = message ? message : 'It seems the password you have provided is invalid...';
        this.errorCode = 'ev9';
        this.httpCode = httpCodesEnum_1.HttpCodes.BAD_REQUEST;
    }
}
exports.InvalidPassword = InvalidPassword;
class RequestBodyIsEmpty {
    constructor(message) {
        this.status = false;
        this.message = message ? message : 'Request body is empty. Missing all the necessary data...';
        this.errorCode = 'ev10';
        this.httpCode = httpCodesEnum_1.HttpCodes.BAD_REQUEST;
    }
}
exports.RequestBodyIsEmpty = RequestBodyIsEmpty;
class InvalidParameterFormat {
    constructor(message, p, ex) {
        this.status = false;
        this.message = message ? message : 'It seems your parameter has invalid format...';
        this.errorCode = 'ev11';
        this.httpCode = httpCodesEnum_1.HttpCodes.BAD_REQUEST;
        this.property = p;
        this.expected = ex;
    }
}
exports.InvalidParameterFormat = InvalidParameterFormat;
