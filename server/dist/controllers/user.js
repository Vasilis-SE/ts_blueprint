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
const user_1 = __importDefault(require("../services/user"));
/**
 * Controller class for 'user' domain. All those class functions are connected
 * directly with one or more routes.
 */
class UserController {
    constructor() {
        this._service = new user_1.default();
    }
    getUserProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = { id: req.user.id };
            const response = yield this._service.getUsers(params, {});
            res.response = response;
            next();
        });
    }
    createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = req.body;
            const response = yield this._service.createUser(payload);
            res.response = response;
            next();
        });
    }
    getUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = req.query;
            const params = req.params;
            const response = yield this._service.getUsers(params, query);
            res.response = response;
            next();
        });
    }
    loginUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = req.body;
            const response = yield this._service.loginUser(payload);
            res.response = response;
            next();
        });
    }
    logoutUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const authorizationHeader = req.headers.authorization;
            const token = authorizationHeader.replace('JWT', '').trim();
            const user = req.user;
            const response = yield this._service.logoutUser(user, token);
            res.response = response;
            next();
        });
    }
}
exports.default = UserController;
