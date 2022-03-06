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
const movie_1 = __importDefault(require("../services/movie"));
/**
 * Controller class for 'movie' domain. All those class functions are connected
 * directly with one or more routes.
 */
class MovieController {
    constructor() {
        this._service = new movie_1.default();
    }
    createMovie(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get the requests payload and also the username from the authenticated user
            // (the one that is going to create the new movie).
            const payload = Object.assign({ username: req.user.username }, req.body);
            const response = yield this._service.createMovie(payload);
            res.response = response;
            next();
        });
    }
    getMoviesList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = req.params;
            const query = req.query;
            const response = yield this._service.getMovies(params, query);
            res.response = response;
            next();
        });
    }
}
exports.default = MovieController;
