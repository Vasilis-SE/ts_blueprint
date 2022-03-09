"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("./user"));
const movie_1 = __importDefault(require("./movie"));
const rate_1 = __importDefault(require("./rate"));
/**
 * Main router class that 'merges' all the separate routes into a single
 * entity that express will use.
 */
class Routes {
    constructor() {
        this._routes = (0, express_1.Router)();
        this.initialize();
    }
    initialize() {
        // Load all seperate routes
        this._routes.use('/user', user_1.default);
        this._routes.use('/movie', movie_1.default);
        this._routes.use('/rate', rate_1.default);
    }
    getAppRoutes() {
        return this._routes;
    }
}
exports.default = Routes;
