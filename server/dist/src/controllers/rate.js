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
const rate_1 = __importDefault(require("../services/rate"));
/**
 * Controller class for 'rate' domain. All those class functions are connected
 * directly with one or more routes.
 */
class RateController {
    constructor() {
        this._service = new rate_1.default();
    }
    rateMovie(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const payload = Object.assign({}, req.body);
            // First of all get the rating of the user if there is any
            let response = yield this._service.getRatings({ movieid: payload.movieid, username: user.username });
            // Did not found any previous ratings of user on the movie, so add the rating.
            if (!response.status && response.httpCode === 404) {
                response = yield this._service.addRating(user, payload);
                response = Object.assign(Object.assign({}, response), { proc: 'add' });
            }
            else if (response.status) {
                if (response.data[0].type != payload.type) { // Change rating
                    response = yield this._service.changeRating(user, payload);
                    response = Object.assign(Object.assign({}, response), { proc: 'change' });
                }
                else { // Retract rating 
                    response = yield this._service.retractRating(user, { movieid: req.body.movieid });
                    response = Object.assign(Object.assign({}, response), { proc: 'retract' });
                }
            }
            res.response = response;
            next();
        });
    }
    addRating(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = Object.assign({}, req.body);
            const response = yield this._service.addRating(req.user, payload);
            res.response = response;
            next();
        });
    }
    changeRating(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = Object.assign({}, req.body);
            const response = yield this._service.changeRating(req.user, payload);
            res.response = response;
            next();
        });
    }
    retractRating(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = req.params;
            const response = yield this._service.retractRating(req.user, params);
            res.response = response;
            next();
        });
    }
}
exports.default = RateController;
