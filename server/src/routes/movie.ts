import { NextFunction, Router } from 'express';
import BaseController from '../controllers/baseController';
import MovieController from '../controllers/movie';
import { InjectedRequest, InjectedResponse } from '../interfaces/express';
import Security from '../security/security';

const movieRoutes = Router();
const _security = new Security();
const _baseController = new BaseController();
const _controller = new MovieController();

// Route that creates a new movie.
movieRoutes.post(
    '/',
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _security.authenticate(req, res, next),
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _controller.createMovie(req, res, next),
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _baseController.send(req, res, next),
);

export default movieRoutes;
