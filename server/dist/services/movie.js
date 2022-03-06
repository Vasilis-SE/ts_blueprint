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
const validation_1 = require("../exceptions/validation");
const httpCodesEnum_1 = require("../helpers/httpCodesEnum");
const objectHandler_1 = __importDefault(require("../helpers/objectHandler"));
const validator_1 = __importDefault(require("../helpers/validator"));
const movie_2 = require("../interfaces/movie");
const movie_3 = __importDefault(require("../models/movie"));
class MovieService {
    createMovie(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validProperties = ['username', 'title', 'description'];
                if (Object.keys(payload).length > validProperties.length)
                    throw new validation_1.ExcessiveBodyProperties();
                // Check if all data are available
                if (!('title' in payload) || !payload.title)
                    throw new validation_1.PropertyIsMissing('', 'title');
                if (!('description' in payload) || !payload.description)
                    throw new validation_1.PropertyIsMissing('', 'description');
                // Check integrity of data
                if (typeof payload.title !== 'string')
                    throw new validation_1.InvalidPropertyType('', 'string', 'title');
                if (typeof payload.description !== 'string')
                    throw new validation_1.InvalidPropertyType('', 'string', 'description');
                if (validator_1.default.hasSpecialCharacters(payload.title, '_ALLEXCDD'))
                    throw new validation_1.ContainsInvalidChars('', 'title');
                if (validator_1.default.hasSpecialCharacters(payload.description, '_ALLEXCDD'))
                    throw new validation_1.ContainsInvalidChars('', 'description');
                if (payload.title.length > movie_2.MovieGlobals.TITLE_MAXLENGTH)
                    throw new validation_1.InputExceedMaxLimit('', 'title');
                const _model = new movie_3.default();
                _model.setTitle(payload.title);
                _model.setDescription(payload.description);
                // Check if new movie was already created by the specific user.
                if (yield _model.getMovies(this._getMovieFilters({ limit: 1 })))
                    throw new movie_1.MovieAlreadyExists();
                _model.setUsername(payload.username);
                _model.setCreatedAtStamp(Math.floor(Date.now() / 1000));
                if (!(yield _model.createMovie()))
                    throw new movie_1.CouldNotCreateNewMovie();
                const response = {
                    status: true,
                    httpCode: httpCodesEnum_1.HttpCodes.CREATED,
                    data: objectHandler_1.default.getResource(_model),
                };
                return response;
            }
            catch (e) {
                if (!(e instanceof validation_1.ExcessiveBodyProperties) &&
                    !(e instanceof validation_1.PropertyIsMissing) &&
                    !(e instanceof validation_1.InvalidPropertyType) &&
                    !(e instanceof validation_1.ContainsInvalidChars) &&
                    !(e instanceof validation_1.InputExceedMaxLimit) &&
                    !(e instanceof movie_1.MovieAlreadyExists) &&
                    !(e instanceof movie_1.CouldNotCreateNewMovie))
                    throw e;
                const errorResource = Object.assign({ status: false }, objectHandler_1.default.getResource(e));
                const error = errorResource;
                return error;
            }
        });
    }
    getMovies(params, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Create filters for the query
                const finalFilters = yield this._getMovieFilters(query);
                if (('range' in params) && params.range != '') {
                    if (params.range.indexOf(',') === -1)
                        throw new validation_1.InvalidParameterFormat('', 'range', '1646492022,1646492028');
                    const stampsParts = params.range.split(',');
                    finalFilters.where = `created_at BETWEEN ${Number(stampsParts[0].trim())} AND ${Number(stampsParts[1].trim())}`;
                    delete params.range;
                }
                const _model = new movie_3.default(params);
                const results = yield _model.getMovies(finalFilters);
                if (!results)
                    throw new movie_1.NoMovies();
                const response = {
                    status: true,
                    httpCode: httpCodesEnum_1.HttpCodes.OK,
                    data: objectHandler_1.default.getResource(results),
                };
                return response;
            }
            catch (e) {
                if (!(e instanceof validation_1.InvalidParameterFormat) && !(e instanceof movie_1.NoMovies))
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
    _getMovieFilters(filters) {
        const final = {};
        // Set order by filter
        final.orderby = `${movie_2.MovieGlobals.QUERY_ORDER_FIELD} ${movie_2.MovieGlobals.QUERY_SORT_METHOD}`;
        if ('order' in filters && filters.order && 'sort' in filters && filters.sort)
            final.orderby = `${filters.order} ${filters.sort}`;
        let page = 0;
        if ('page' in filters && filters.page) {
            if (!validator_1.default.isNumber(filters.page.toString()))
                throw new validation_1.InvalidParameterType('', 'page', 'number');
            page = Number(filters.page);
        }
        let limit = movie_2.MovieGlobals.QUERY_LENGTH;
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
exports.default = MovieService;
