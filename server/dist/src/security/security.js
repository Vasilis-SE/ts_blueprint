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
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const jsonwebtoken_1 = require("jsonwebtoken");
const security_1 = require("../exceptions/security");
const objectHandler_1 = __importDefault(require("../helpers/objectHandler"));
const user_1 = __importDefault(require("../models/user"));
const user_2 = require("../exceptions/user");
// Load enviromentals
require('../bin/env');
class Security {
    constructor() {
        this.initializeJWTStrategy();
    }
    initializeJWTStrategy() {
        const options = {
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderWithScheme('jwt'),
            secretOrKey: process.env.JWT_TOP_SECRET,
            ignoreExpiration: false,
        };
        passport_1.default.use(new passport_jwt_1.Strategy(options, (jwtPayload, done) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userid = jwtPayload.id;
                // Get credentials of user to attach to request. That way the app
                // can use the data whenever it wants (logging movements, storing movie).
                const _model = new user_1.default({ id: userid });
                const user = yield _model.getUsers({ fields: ['id', 'username', 'created_at'] });
                if (!user)
                    throw new user_2.CouldNotFindUser();
                done(null, user[0]);
            }
            catch (err) {
                done(err);
            }
        })));
    }
    authenticate(req, res, next) {
        return passport_1.default.authenticate('jwt', { session: false }, (err, user, info) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (err || !user)
                    throw new security_1.InvalidTokenProvided();
                const authorizationHeader = req.headers.authorization;
                if (!authorizationHeader)
                    throw new security_1.InvalidTokenProvided();
                const token = authorizationHeader.replace('JWT', '').trim();
                const _model = new user_1.default({ id: user.id });
                const cachedToken = yield _model.getUserToken();
                if (!cachedToken || cachedToken !== token)
                    throw new security_1.InvalidTokenProvided();
                req.user = user;
                next();
            }
            catch (e) {
                if (!(e instanceof security_1.InvalidTokenProvided))
                    throw e;
                const errorResource = Object.assign({ status: false }, objectHandler_1.default.getResource(e));
                const error = errorResource;
                res.status(e.httpCode).json(error);
            }
        }))(req, res, next);
    }
    generateUserToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!('response' in res) || !res.response.status)
                    throw new Error();
                const content = res.response;
                const contentData = content.data;
                if (!('id' in contentData) || !contentData.id)
                    throw Error();
                const rememberMeFlag = 'rm' in req.query && req.query.rm === 'true' ? true : false;
                let token = '';
                if (rememberMeFlag) {
                    token = (0, jsonwebtoken_1.sign)(contentData, process.env.JWT_TOP_SECRET, { expiresIn: 604800 }); // A week
                }
                else {
                    token = (0, jsonwebtoken_1.sign)(contentData, process.env.JWT_TOP_SECRET, { expiresIn: 3600 }); // 1 hour
                }
                const payload = (0, jsonwebtoken_1.decode)(token);
                // Log new token to redis
                const _model = new user_1.default({ id: contentData.id });
                yield _model.setNewUserToken(token);
                content.data = { token, exp: payload.exp };
                res.response = content;
                const seconds = payload.exp - Math.round(Date.now() / 1000);
                yield _model.setExpirationToToken(seconds);
                next();
            }
            catch (e) {
                next();
            }
        });
    }
}
exports.default = Security;
