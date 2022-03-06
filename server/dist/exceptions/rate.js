"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FailedDeletingRating = exports.CannotRateYourOwnMovie = exports.InvalidRating = exports.NoRatingFound = exports.FailedToRateMovie = exports.UserAlreadyRated = void 0;
const httpCodesEnum_1 = require("../helpers/httpCodesEnum");
class UserAlreadyRated {
    constructor(message) {
        this.status = false;
        this.message = message ? message : 'It seems you have already voted for that specific movie...';
        this.errorCode = 'rt1';
        this.httpCode = httpCodesEnum_1.HttpCodes.BAD_REQUEST;
    }
}
exports.UserAlreadyRated = UserAlreadyRated;
class FailedToRateMovie {
    constructor(message) {
        this.status = false;
        this.message = message ? message : 'Error occurred while trying to rate the movie. Try again later...';
        this.errorCode = 'rt2';
        this.httpCode = httpCodesEnum_1.HttpCodes.SERVER_ERROR;
    }
}
exports.FailedToRateMovie = FailedToRateMovie;
class NoRatingFound {
    constructor(message) {
        this.status = false;
        this.message = message ? message : 'Could not find the rating you have made on the movie...';
        this.errorCode = 'rt3';
        this.httpCode = httpCodesEnum_1.HttpCodes.NOT_FOUND;
    }
}
exports.NoRatingFound = NoRatingFound;
class InvalidRating {
    constructor(message) {
        this.status = false;
        this.message = message ? message : 'Invalid rating that is beeing sent...';
        this.errorCode = 'rt4';
        this.httpCode = httpCodesEnum_1.HttpCodes.BAD_REQUEST;
    }
}
exports.InvalidRating = InvalidRating;
class CannotRateYourOwnMovie {
    constructor(message) {
        this.status = false;
        this.message = message ? message : 'You cannot rate movies that you have created...';
        this.errorCode = 'rt5';
        this.httpCode = httpCodesEnum_1.HttpCodes.FORBIDDEN;
    }
}
exports.CannotRateYourOwnMovie = CannotRateYourOwnMovie;
class FailedDeletingRating {
    constructor(message) {
        this.status = false;
        this.message = message ? message : 'Error occurred while trying to delete rating...';
        this.errorCode = 'rt6';
        this.httpCode = httpCodesEnum_1.HttpCodes.SERVER_ERROR;
    }
}
exports.FailedDeletingRating = FailedDeletingRating;
