import { NextFunction, Router } from 'express';
import BaseController from '../controllers/baseController';
import UserController from '../controllers/user';
import { InjectedRequest, InjectedResponse } from '../interfaces/express';
import Security from '../security/security';

const userRoutes = Router();
const _security = new Security();
const _baseController = new BaseController();
const _controller = new UserController();

userRoutes.post(
    '/',
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _controller.createUser(req, res, next),
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _baseController.send(req, res, next),
);

// Route that fetches a user by its id
userRoutes.get(
    '/:id(\\d+)',
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _controller.getUsers(req, res, next),
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _baseController.send(req, res, next),
);

// Route that fetches a user by he's username
userRoutes.get(
    '/:username',
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _controller.getUsers(req, res, next),
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _baseController.send(req, res, next),
);

// Route that logins a user
userRoutes.post(
    '/login',
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _controller.loginUser(req, res, next),
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _security.generateUserToken(req, res, next),
    (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => _baseController.send(req, res, next),
);


export default userRoutes;
