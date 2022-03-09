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
const objectHandler_1 = __importDefault(require("../helpers/objectHandler"));
class RateModel {
    constructor(ratting = {}) {
        this._setProperties(ratting);
    }
    _setProperties(ratting = {}) {
        this.setUsername(ratting.username ? ratting.username : '');
        this.setMovieId(ratting.movieid ? ratting.movieid : 0);
        this.setType(ratting.type ? ratting.type : undefined);
    }
    getRattings(filters = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let results = [];
                const resource = objectHandler_1.default.getResource(this);
                const wherePart = objectHandler_1.default.objectToSQLParams(resource, ' AND ');
                const query = yield postgres_1.default.client.query(`SELECT 
                ${filters.fields ? filters.fields.join(', ') : '*'}
                FROM ratings 
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
    addRating() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield postgres_1.default.client.query(`INSERT INTO ratings (username, movieid, type) 
                VALUES ('${this.getUsername()}', '${this.getMovieId()}', ${this.getType()})`);
                if (query.rowCount === 0)
                    throw Error();
                return true;
            }
            catch (error) {
                return false;
            }
        });
    }
    changeRatingType() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryString = `UPDATE ratings 
                SET type = ${this.getType()}
                WHERE username = $1 AND movieid = $2`;
                const query = yield postgres_1.default.client.query(queryString, [this.getUsername(), this.getMovieId()]);
                if (query.rowCount === 0)
                    throw Error();
                return true;
            }
            catch (error) {
                return false;
            }
        });
    }
    removeRating() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield postgres_1.default.client.query(`DELETE FROM ratings
                WHERE username = '${this.getUsername()}' AND movieid = ${this.getMovieId()}`);
                if (query.rowCount === 0)
                    throw Error();
                return true;
            }
            catch (error) {
                return false;
            }
        });
    }
    getUsername() {
        return this.username;
    }
    getMovieId() {
        return this.movieid;
    }
    getType() {
        return this.type;
    }
    setUsername(usr) {
        this.username = usr;
    }
    setMovieId(mi) {
        this.movieid = Number(mi);
    }
    setType(t) {
        this.type = t;
    }
}
exports.default = RateModel;
