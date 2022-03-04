import { NextFunction, Router } from 'express';
import BaseController from '../controllers/baseController';
import UserController from '../controllers/user';
import { InjectedRequest, InjectedResponse } from '../interfaces/express';

const userRoutes = Router();
const _baseController = new BaseController();
const _controller = new UserController();

userRoutes.post(
    '/',
    (req: any, res: any, next: NextFunction) => _controller.createUser(req, res, next),
    (req: any, res: any, next: NextFunction) => _baseController.send(req, res, next),
);

// Route that fetches a user by its id
userRoutes.get(
    '/:id(\\d+)',
    (req: any, res: any, next: NextFunction) => _controller.getUsers(req, res, next),
    (req: any, res: any, next: NextFunction) => _baseController.send(req, res, next),
);

// Route that fetches a user by he's username
userRoutes.get(
    '/:username',
    (req: any, res: any, next: NextFunction) => _controller.getUsers(req, res, next),
    (req: any, res: any, next: NextFunction) => _baseController.send(req, res, next),
);

export default userRoutes;
