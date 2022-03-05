
import { NextFunction, Router } from 'express';
import BaseController from '../controllers/baseController';
import RateController from '../controllers/rate';
import { InjectedRequest, InjectedResponse } from '../interfaces/express';
import Security from '../security/security';

const userRoutes = Router();
const _security = new Security();
const _baseController = new BaseController();
const _controller = new RateController();

// Route that creates a new ratting.
userRoutes.post(
    '/',
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _security.authenticate(req, res, next),
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _controller.addRate(req, res, next),
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _baseController.send(req, res, next),
);

// Route that changes the rating of the user.
userRoutes.patch(
    '/',
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _security.authenticate(req, res, next),
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _controller.changeRate(req, res, next),
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _baseController.send(req, res, next),
);

export default userRoutes;