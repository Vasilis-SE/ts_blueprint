"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const movie_1 = require("../exceptions/movie");
const rate_1 = require("../exceptions/rate");
const validation_1 = require("../exceptions/validation");
const httpCodesEnum_1 = require("../helpers/httpCodesEnum");
const objectHandler_1 = __importDefault(require("../helpers/objectHandler"));
const validator_1 = __importDefault(require("../helpers/validator"));
const rate_2 = require("../interfaces/rate");
const movie_2 = __importDefault(require("../models/movie"));
const rate_3 = __importDefault(require("../models/rate"));
class RateService {
    addRating(user, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validProperties = ['movieid', 'type'];
                if (Object.keys(payload).length > validProperties.length)
                    throw new validation_1.ExcessiveBodyProperties();
                // Check fields integrity
                if (!('movieid' in payload) || !payload.movieid)
                    throw new validation_1.PropertyIsMissing('', 'movieid');
                if (!('type' in payload))
                    throw new validation_1.PropertyIsMissing('', 'type');
                if (typeof payload.movieid !== 'number')
                    throw new validation_1.InvalidPropertyType('', 'number', 'movieid');
                if (typeof payload.type !== 'boolean')
                    throw new validation_1.InvalidPropertyType('', 'type', 'boolean');
                // Check if the given movie id exists
                const _movieModel = new movie_2.default({ id: payload.movieid });
                let movieDataResults = yield _movieModel.getMovies();
                if (!movieDataResults)
                    throw new movie_1.NoMovies();
                const movieData = movieDataResults[0];
                // Check if movie is created by the user that is requesting the rating.
                if (movieData.username === user.username)
                    throw new rate_1.CannotRateYourOwnMovie();
                // Check if user already voted for specific movie
                const _model = new rate_3.default();
                _model.setUsername(user.username);
                _model.setMovieId(payload.movieid);
                if (yield _model.getRattings(yield this._getRateFilters({ limit: 1 })))
                    throw new rate_1.UserAlreadyRated();
                // Add the ratting into the database table
                _model.setType(payload.type);
                if (!(yield _model.addRating()))
                    throw new rate_1.FailedToRateMovie();
                // Increment likes or hates
                if (payload.type) {
                    if (!(yield _movieModel.changeLike(true)))
                        throw new rate_1.FailedToRateMovie();
                }
                else {
                    if (!(yield _movieModel.changeHate(true)))
                        throw new rate_1.FailedToRateMovie();
                }
                const response = {
                    status: true,
                    httpCode: httpCodesEnum_1.HttpCodes.CREATED,
                };
                return response;
            }
            catch (e) {
                if (!(e instanceof validation_1.ExcessiveBodyProperties) &&
                    !(e instanceof validation_1.PropertyIsMissing) &&
                    !(e instanceof validation_1.InvalidPropertyType) &&
                    !(e instanceof movie_1.NoMovies) &&
                    !(e instanceof rate_1.UserAlreadyRated) &&
                    !(e instanceof rate_1.FailedToRateMovie) &&
                    !(e instanceof rate_1.CannotRateYourOwnMovie))
                    throw e;
                const errorResource = Object.assign({ status: false }, objectHandler_1.default.getResource(e));
                const error = errorResource;
                return error;
            }
        });
    }
    changeRating(user, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validProperties = ['movieid', 'type'];
                if (Object.keys(payload).length > validProperties.length)
                    throw new validation_1.ExcessiveBodyProperties();
                // Check fields integrity
                if (!('movieid' in payload) || !payload.movieid)
                    throw new validation_1.PropertyIsMissing('', 'movieid');
                if (!('type' in payload))
                    throw new validation_1.PropertyIsMissing('', 'type');
                if (typeof payload.movieid !== 'number')
                    throw new validation_1.InvalidPropertyType('', 'number', 'movieid');
                if (typeof payload.type !== 'boolean')
                    throw new validation_1.InvalidPropertyType('', 'type', 'boolean');
                // Check if the given movie id exists
                const _movieModel = new movie_2.default({ id: payload.movieid });
                let movieDataResults = yield _movieModel.getMovies();
                if (!movieDataResults)
                    throw new movie_1.NoMovies();
                const movieData = movieDataResults[0];
                // Check if movie is created by the user that is requesting the rating.
                if (movieData.username === user.username)
                    throw new rate_1.CannotRateYourOwnMovie();
                // Check if user voted for specific movie
                const _model = new rate_3.default();
                _model.setUsername(user.username);
                _model.setMovieId(payload.movieid);
                const userRatingResults = yield _model.getRattings(yield this._getRateFilters({ limit: 1 }));
                if (!userRatingResults)
                    throw new rate_1.NoRatingFound();
                const userRating = userRatingResults[0];
                // If the rating that sent is the same with the one casted before then exit
                if (userRating.type === payload.type)
                    throw new rate_1.InvalidRating();
                // Change rating on rating table for specific user & movieid
                _model.setType(payload.type);
                if (!(yield _model.changeRatingType()))
                    throw new rate_1.FailedToRateMovie();
                // If the user now likes the movie then subtract 1 from dislikes and add 1 to likes.
                // Else subtract 1 from likes and add 1 in dislikes
                const likesStatus = yield _movieModel.changeLike(payload.type ? true : false);
                const hatesStatus = yield _movieModel.changeHate(payload.type ? false : true);
                if (!likesStatus || !hatesStatus)
                    throw new rate_1.FailedToRateMovie();
                const response = {
                    status: true,
                    httpCode: httpCodesEnum_1.HttpCodes.OK
                };
                return response;
            }
            catch (e) {
                if (!(e instanceof validation_1.ExcessiveBodyProperties) &&
                    !(e instanceof validation_1.PropertyIsMissing) &&
                    !(e instanceof validation_1.InvalidPropertyType) &&
                    !(e instanceof movie_1.NoMovies) &&
                    !(e instanceof rate_1.NoRatingFound) &&
                    !(e instanceof rate_1.InvalidRating) &&
                    !(e instanceof rate_1.FailedToRateMovie) &&
                    !(e instanceof rate_1.CannotRateYourOwnMovie))
                    throw e;
                const errorResource = Object.assign({ status: false }, objectHandler_1.default.getResource(e));
                const error = errorResource;
                return error;
            }
        });
    }
    retractRating(user, params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!('movieid' in params) || !params.movieid)
                    throw new validation_1.PropertyIsMissing('', 'movieid');
                if (!validator_1.default.isNumber(params.movieid.toString()))
                    throw new validation_1.InvalidPropertyType('', 'number', 'movieid');
                // Get the rating of user
                const _model = new rate_3.default({ username: user.username, movieid: params.movieid });
                const userRatingResults = yield _model.getRattings(yield this._getRateFilters({ limit: 1 }));
                if (!userRatingResults)
                    throw new rate_1.NoRatingFound();
                const userRating = userRatingResults[0];
                // Check if the given movie id exists
                const _movieModel = new movie_2.default({ id: params.movieid });
                let movieDataResults = yield _movieModel.getMovies();
                if (!movieDataResults)
                    throw new movie_1.NoMovies();
                const movieData = movieDataResults[0];
                // Delete user's rating
                if (!(yield _model.removeRating()))
                    throw new rate_1.FailedDeletingRating();
                // Alter hates or likes on movies table based on the rating the user previously had
                if (userRating.type) {
                    if (!(yield _movieModel.changeLike(false)))
                        throw new rate_1.FailedDeletingRating();
                }
                else {
                    if (!(yield _movieModel.changeHate(false)))
                        throw new rate_1.FailedDeletingRating();
                }
                const response = {
                    status: true,
                    httpCode: httpCodesEnum_1.HttpCodes.OK
                };
                return response;
            }
            catch (e) {
                if (!(e instanceof validation_1.PropertyIsMissing) &&
                    !(e instanceof validation_1.InvalidPropertyType) &&
                    !(e instanceof rate_1.NoRatingFound) &&
                    !(e instanceof movie_1.NoMovies) &&
                    !(e instanceof rate_1.FailedDeletingRating))
                    throw e;
                const errorResource = Object.assign({ status: false }, objectHandler_1.default.getResource(e));
                const error = errorResource;
                return error;
            }
        });
    }
    /**
     * Protected class function of UserService that is used to clear and gather all the
     * filter data needed. Filters are used for managing queries on database. For example
     * ordering a query, calculating the 'chunk' of data to return for pagination etc.
     * @param filters Object of IRequestQueryFilters interface that contains the filters.
     * @returns Object of IUserFilters interface which contains the final filters a query will use.
     */
    _getRateFilters(filters) {
        const final = {};
        // Set order by filter
        final.orderby = `${rate_2.RateGlobals.QUERY_ORDER_FIELD} ${rate_2.RateGlobals.QUERY_SORT_METHOD}`;
        if ('order' in filters && filters.order && 'sort' in filters && filters.sort)
            final.orderby = `${filters.order} ${filters.sort}`;
        let page = 0;
        if ('page' in filters && filters.page) {
            if (!validator_1.default.isNumber(filters.page.toString()))
                throw new validation_1.InvalidParameterType('', 'page', 'number');
            page = Number(filters.page);
        }
        let limit = rate_2.RateGlobals.QUERY_LENGTH;
        if ('limit' in filters && filters.limit) {
            if (!validator_1.default.isNumber(filters.limit.toString()))
                throw new validation_1.InvalidParameterType('', 'limit', 'number');
            limit = Number(filters.limit);
        }
        const offset = page * limit;
        final.limit = `${limit} OFFSET ${offset}`;
        return final;
    }
}
exports.default = RateService;
