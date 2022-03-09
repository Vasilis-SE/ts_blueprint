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
class MovieModel {
    constructor(movie = {}) {
        this._setProperties(movie);
    }
    _setProperties(movie = {}) {
        this.setId(movie.id ? movie.id : 0);
        this.setTitle(movie.title ? movie.title : '');
        this.setDescription(movie.description ? movie.description : '');
        this.setUsername(movie.username ? movie.username : '');
        this.setLikes(movie.likes ? movie.likes : 0);
        this.setHates(movie.hates ? movie.hates : 0);
        this.setCreatedAtStamp(movie.created_at ? movie.created_at : 0);
    }
    reportMoviesCount(filters = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resource = objectHandler_1.default.getResource(this);
                const wherePart = filters.where && filters.where != ''
                    ? filters.where
                    : objectHandler_1.default.objectToSQLParams(resource, ' AND ');
                const queryString = `SELECT COUNT(id) FROM movies
                ${wherePart ? `WHERE ${wherePart}` : ''}`;
                const query = yield postgres_1.default.client.query(queryString);
                if (query.rowCount === 0)
                    throw Error();
                return Number(query.rows[0].count);
            }
            catch (error) {
                return false;
            }
        });
    }
    getMovies(filters = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let results = [];
                const resource = objectHandler_1.default.getResource(this);
                const wherePart = filters.where && filters.where != ''
                    ? filters.where
                    : objectHandler_1.default.objectToSQLParams(resource, ' AND ');
                const query = yield postgres_1.default.client.query(`SELECT 
                ${filters.fields ? filters.fields.join(', ') : '*'}
                FROM movies 
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
    createMovie() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryString = `INSERT INTO movies 
                (title, description, username, created_at) VALUES 
                ($1, $2, $3, $4)
                RETURNING id, likes, hates`;
                const query = yield postgres_1.default.client.query(queryString, [this.getTitle(),
                    this.getDescription(), this.getUsername(), this.getCreatedAtStamp()]);
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
    changeLike(toIncr) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield postgres_1.default.client.query(`UPDATE movies 
                SET likes = ${toIncr ? 'likes + 1' : 'likes - 1'} 
                WHERE id = ${this.getId()}
                RETURNING likes`);
                if (query.rowCount === 0)
                    throw Error();
                // Set the newly created id
                this.setLikes(query.rows[0].likes);
                return true;
            }
            catch (error) {
                return false;
            }
        });
    }
    changeHate(toIncr) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = yield postgres_1.default.client.query(`UPDATE movies 
                SET hates = ${toIncr ? 'hates + 1' : 'hates - 1'} 
                WHERE id = ${this.getId()}
                RETURNING hates`);
                if (query.rowCount === 0)
                    throw Error();
                // Set the newly created id
                this.setHates(query.rows[0].hates);
                return true;
            }
            catch (error) {
                return false;
            }
        });
    }
    getId() {
        return this.id;
    }
    getTitle() {
        return this.title;
    }
    getDescription() {
        return this.description;
    }
    getUsername() {
        return this.username;
    }
    getLikes() {
        return this.likes;
    }
    getHates() {
        return this.hates;
    }
    getCreatedAtStamp() {
        return this.created_at;
    }
    setId(id) {
        this.id = Number(id);
    }
    setTitle(t) {
        this.title = t;
    }
    setDescription(d) {
        this.description = d.replace(/'/g, "\\'");
    }
    setUsername(u) {
        this.username = u;
    }
    setLikes(l) {
        this.likes = Number(l);
    }
    setHates(h) {
        this.hates = Number(h);
    }
    setCreatedAtStamp(ca) {
        this.created_at = Number(ca);
    }
}
exports.default = MovieModel;
