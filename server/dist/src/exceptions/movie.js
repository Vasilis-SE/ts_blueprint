"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoMovies = exports.CouldNotCreateNewMovie = exports.MovieAlreadyExists = void 0;
const httpCodesEnum_1 = require("../helpers/httpCodesEnum");
class MovieAlreadyExists {
    constructor(message) {
        this.status = false;
        this.message = message ? message : 'The same movie already exists...';
        this.errorCode = 'mv1';
        this.httpCode = httpCodesEnum_1.HttpCodes.BAD_REQUEST;
    }
}
exports.MovieAlreadyExists = MovieAlreadyExists;
class CouldNotCreateNewMovie {
    constructor(message) {
        this.status = false;
        this.message = message ? message
            : 'Error occurred while trying to create new movie. Please try again later...';
        this.errorCode = 'mv2';
        this.httpCode = httpCodesEnum_1.HttpCodes.SERVER_ERROR;
    }
}
exports.CouldNotCreateNewMovie = CouldNotCreateNewMovie;
class NoMovies {
    constructor(message) {
        this.status = false;
        this.message = message ? message : 'There are no movies with the given criteria...';
        this.errorCode = 'mv3';
        this.httpCode = httpCodesEnum_1.HttpCodes.NOT_FOUND;
    }
}
exports.NoMovies = NoMovies;
