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
const security_1 = require("../exceptions/security");
const user_1 = require("../exceptions/user");
const validation_1 = require("../exceptions/validation");
const httpCodesEnum_1 = require("../helpers/httpCodesEnum");
const objectHandler_1 = __importDefault(require("../helpers/objectHandler"));
const validator_1 = __importDefault(require("../helpers/validator"));
const user_2 = require("../interfaces/user");
const user_3 = __importDefault(require("../models/user"));
const password_1 = __importDefault(require("../security/password"));
class UserService {
    createUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validProperties = ['username', 'password'];
                if (Object.keys(payload).length > validProperties.length)
                    throw new validation_1.ExcessiveBodyProperties();
                if (!('username' in payload) || !payload.username)
                    throw new validation_1.PropertyIsMissing('', 'username');
                if (!('password' in payload) || !payload.password)
                    throw new validation_1.PropertyIsMissing('', 'password');
                if (typeof payload.username !== 'string')
                    throw new validation_1.InvalidPropertyType('', 'string', 'username');
                if (typeof payload.password !== 'string')
                    throw new validation_1.InvalidPropertyType('', 'string', 'password');
                if (validator_1.default.hasSpecialCharacters(payload.username, '_ALL'))
                    throw new validation_1.ContainsInvalidChars('', 'username');
                if (payload.username.length > user_2.UserGlobals.USERNAME_MAXLENGTH)
                    throw new validation_1.InputExceedMaxLimit('', 'username');
                // Check if password is strong & hash it
                const _password = new password_1.default(payload.password);
                if (!(yield _password.isPasswordStrong()))
                    throw new validation_1.PasswordIsWeak();
                if (!(yield _password.hashPassword()))
                    throw new security_1.FailedToRenderHash();
                // Populate only the user in the model to check whether there is
                // already any other user with the same username.
                const _model = new user_3.default();
                _model.setUsername(payload.username);
                const exists = yield _model.getUsers();
                if (exists)
                    throw new user_1.UserAlreadyExists();
                // Set to model the hashed password
                _model.setPassword(_password.getPassword());
                _model.setCreatedAtStamp(Math.floor(Date.now() / 1000));
                if (!(yield _model.createUser()))
                    throw new user_1.UserCreationFailed();
                _model.setPassword(''); // clean passowrd so that it wont be displayed on response
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
                    !(e instanceof validation_1.PasswordIsWeak) &&
                    !(e instanceof security_1.FailedToRenderHash) &&
                    !(e instanceof user_1.UserAlreadyExists) &&
                    !(e instanceof user_1.UserCreationFailed))
                    throw e;
                const errorResource = Object.assign({ status: false }, objectHandler_1.default.getResource(e));
                const error = errorResource;
                return error;
            }
        });
    }
    getUsers(user, filters) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const finalFilters = yield this._getUserFilters(filters);
                const _model = new user_3.default(user);
                finalFilters.fields = ['id', 'username', 'created_at'];
                const results = yield _model.getUsers(finalFilters);
                if (!results)
                    throw new user_1.CouldNotFindUser();
                const response = {
                    status: true,
                    httpCode: httpCodesEnum_1.HttpCodes.OK,
                    data: objectHandler_1.default.getResource(results),
                };
                return response;
            }
            catch (e) {
                if (!(e instanceof user_1.CouldNotFindUser))
                    throw e;
                const errorResource = Object.assign({ status: false }, objectHandler_1.default.getResource(e));
                const error = errorResource;
                return error;
            }
        });
    }
    loginUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (Object.keys(payload).length > 2)
                    throw new validation_1.ExcessiveBodyProperties();
                // Check if any is missing
                if (!('username' in payload) || !payload.username)
                    throw new validation_1.PropertyIsMissing('', 'username');
                if (!('password' in payload) || !payload.password)
                    throw new validation_1.PropertyIsMissing('', 'password');
                // Check data types
                if (typeof payload.username !== 'string')
                    throw new validation_1.InvalidPropertyType('', 'string', 'email');
                if (typeof payload.password !== 'string')
                    throw new validation_1.InvalidPropertyType('', 'string', 'password');
                // Create instance of model and search for user based on the username
                const _model = new user_3.default();
                _model.setUsername(payload.username);
                const filters = { limit: 1 };
                const foundUserResults = yield _model.getUsers(this._getUserFilters(filters));
                if (!foundUserResults)
                    throw new user_1.CouldNotFindUser();
                _model.setId(foundUserResults[0].id);
                // Set hashed password and compare it with the plain password.
                const _password = new password_1.default(foundUserResults[0].password);
                if (!(yield _password.comparePassword(payload.password)))
                    throw new validation_1.InvalidPassword();
                const response = {
                    status: true,
                    httpCode: httpCodesEnum_1.HttpCodes.OK,
                    data: { id: foundUserResults[0].id },
                };
                return response;
            }
            catch (e) {
                if (!(e instanceof validation_1.ExcessiveBodyProperties) &&
                    !(e instanceof validation_1.PropertyIsMissing) &&
                    !(e instanceof validation_1.InvalidPropertyType) &&
                    !(e instanceof user_1.CouldNotFindUser) &&
                    !(e instanceof validation_1.InvalidPassword))
                    throw e;
                const errorResource = Object.assign({ status: false }, objectHandler_1.default.getResource(e));
                const error = errorResource;
                return error;
            }
        });
    }
    logoutUser(user, token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _model = new user_3.default(user);
                if (!(yield _model.deleteUserToken(token)))
                    throw new user_1.UnableToLogout();
                const response = {
                    status: true,
                    httpCode: httpCodesEnum_1.HttpCodes.OK,
                    data: { id: user.id },
                };
                return response;
            }
            catch (e) {
                if (!(e instanceof validation_1.ExcessiveBodyProperties))
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
    _getUserFilters(filters) {
        const final = {};
        // Set order by filter
        final.orderby = `${user_2.UserGlobals.QUERY_ORDER_FIELD} ${user_2.UserGlobals.QUERY_SORT_METHOD}`;
        if ('order' in filters && filters.order && 'sort' in filters && filters.sort)
            final.orderby = `${filters.order} ${filters.sort}`;
        let page = 0;
        if ('page' in filters && filters.page) {
            if (!validator_1.default.isNumber(filters.page.toString()))
                throw new validation_1.InvalidParameterType('', 'page', 'number');
            page = Number(filters.page);
        }
        let limit = user_2.UserGlobals.QUERY_LENGTH;
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
exports.default = UserService;
