import { NextFunction, Router, Request, Response } from 'express';
import UserController from '@controllers/userController';
// import Security from '@security/security';
import sendHttpResponse from '@middleware/httpResponseHandler';
import ErrorHandler from '@middleware/errorHandler';

const userRoutes = Router();
// const security = new Security();
const controller = new UserController();
const errorHandler = new ErrorHandler();

userRoutes.post(
	'/',
	(req: Request, res: Response, next: NextFunction) => controller.createUser(req, res, next),
	errorHandler.getHandler(),
	(req: Request, res: Response, next: NextFunction) => sendHttpResponse(req, res, next)
);

userRoutes.get(
	'/:id([0-9]+)',
	(req: Request, res: Response, next: NextFunction) => controller.getUserById(req, res, next),
	errorHandler.getHandler(),
	(req: Request, res: Response, next: NextFunction) => sendHttpResponse(req, res, next)
);

userRoutes.get(
	'/:username([0-9a-zA-z]+)',
	(req: Request, res: Response, next: NextFunction) => controller.getUserByUsername(req, res, next),
	errorHandler.getHandler(),
	(req: Request, res: Response, next: NextFunction) => sendHttpResponse(req, res, next)
);

// userRoutes.get(
//     '/profile',
//     (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => security.authenticate(req, res, next),
//     (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => controller.getUserProfile(req, res, next),
//     (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => sendHttpResponse(req, res, next),
// );

// userRoutes.post(
//     '/login',
//     (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => controller.loginUser(req, res, next),
//     (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => security.generateUserToken(req, res, next),
//     (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => sendHttpResponse(req, res, next),
// );

// userRoutes.delete(
//     '/logout',
//     (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => security.authenticate(req, res, next),
//     (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => controller.logoutUser(req, res, next),
//     (req: InjectedRequest, res: InjectedResponse, next: NextFunction) => sendHttpResponse(req, res, next),
// );

export default userRoutes;
