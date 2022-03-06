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
const postgres_1 = __importDefault(require("../connections/postgres"));
const redis_1 = __importDefault(require("../connections/redis"));
const objectHandler_1 = __importDefault(require("../helpers/objectHandler"));
class UserModel {
    constructor(user = {}) {
        this._setProperties(user);
    }
    _setProperties(user = {}) {
        this.setId(user.id ? user.id : 0);
        this.setUsername(user.username ? user.username : '');
        this.setPassword(user.password ? user.password : '');
        this.setCreatedAtStamp(user.created_at ? user.created_at : 0);
    }
    getUsers(filters = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let results = [];
                const resource = objectHandler_1.default.getResource(this);
                const wherePart = objectHandler_1.default.objectToSQLParams(resource, ' AND ');
                const query = yield postgres_1.default.client.query(`SELECT 
                ${filters.fields ? filters.fields.join(', ') : '*'}
                FROM users 
                ${wherePart ? `WHERE ${wherePart}` : ''}
                ${'orderby' in filters ? `ORDER BY ${filters.orderby}` : ''}
                ${'limit' in filters ? `LIMIT ${filters.limit}` : ''}`);
                if (query.rowCount === 0)
                    throw Error();
                results = query.rows;
                return results;
            }
            catch (error) {
                return false;
            }
        });
    }
    createUser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield postgres_1.default.client.query(`INSERT INTO users (username, password, created_at) 
                VALUES ('${this.getUsername()}', '${this.getPassword()}', ${this.getCreatedAtStamp()})
                RETURNING id`);
                if (query.rowCount === 0)
                    throw Error();
                // Set the newly created id
                this.setId(query.rows[0].id);
                return true;
            }
            catch (error) {
                return false;
            }
        });
    }
    getUserToken() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield redis_1.default.client.get(`${process.env.USER_TOKEN_PATH}:${this.getId()}`);
        });
    }
    setNewUserToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield redis_1.default.client.set(`${process.env.USER_TOKEN_PATH}:${this.getId()}`, token);
        });
    }
    setExpirationToToken(seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield redis_1.default.client.expire(`${process.env.USER_TOKEN_PATH}:${this.getId()}`, seconds);
        });
    }
    deleteUserToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield redis_1.default.client.del(`${process.env.USER_TOKEN_PATH}:${this.getId()}`);
        });
    }
    getId() {
        return this.id;
    }
    getUsername() {
        return this.username;
    }
    getPassword() {
        return this.password;
    }
    getCreatedAtStamp() {
        return this.created_at;
    }
    setId(id) {
        this.id = id;
    }
    setUsername(usr) {
        this.username = usr;
    }
    setPassword(pass) {
        this.password = pass;
    }
    setCreatedAtStamp(ca) {
        this.created_at = ca;
    }
}
exports.default = UserModel;
