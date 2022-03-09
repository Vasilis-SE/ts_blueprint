"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const baseController_1 = __importDefault(require("../controllers/baseController"));
const movie_1 = __importDefault(require("../controllers/movie"));
const security_1 = __importDefault(require("../security/security"));
const movieRoutes = (0, express_1.Router)();
const _security = new security_1.default();
const _baseController = new baseController_1.default();
const _controller = new movie_1.default();
// Route that creates a new movie.
movieRoutes.post('/', (req, res, next) => _security.authenticate(req, res, next), (req, res, next) => _controller.createMovie(req, res, next), (req, res, next) => _baseController.send(req, res, next));
// Route that fetches list of all movies (with pagination, limit, ordering etc)
movieRoutes.get('/', 
// (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _security.authenticate(req, res, next),
(req, res, next) => _controller.getMoviesList(req, res, next), (req, res, next) => _controller.getMoviesMeta(req, res, next), (req, res, next) => _baseController.send(req, res, next));
movieRoutes.get('/:range([0-9]{10},[0-9]{10})', 
// (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _security.authenticate(req, res, next),
(req, res, next) => _controller.getMoviesList(req, res, next), (req, res, next) => _controller.getMoviesMeta(req, res, next), (req, res, next) => _baseController.send(req, res, next));
movieRoutes.get('/:username([0-9a-zA-z]+)', 
// (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _security.authenticate(req, res, next),
(req, res, next) => _controller.getMoviesList(req, res, next), (req, res, next) => _controller.getMoviesMeta(req, res, next), (req, res, next) => _baseController.send(req, res, next));
exports.default = movieRoutes;
