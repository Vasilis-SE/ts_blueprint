import { NextFunction, Response, Request } from 'express';
import UserModel from '@models/userModel';
import UserService from '@services/userService';
import { instanceToPlain } from 'class-transformer';
import { HttpCodes } from '@helpers/httpCodesEnum';
import { NoQueryParamProvided } from '@exceptions/customExceptions';

export default class UserController {
	private userService: UserService;

	constructor() {
		this.userService = new UserService();
	}

	// async getUserProfile(req: InjectedRequest, res: InjectedResponse, next: NextFunction): Promise<void> {
	//     const params: IUserProperties = { id: req.user.id };
	//     const response: ISuccessfulResponse | IFailedResponse = await this._service.getUsers(params, {});
	//     res.response = response;
	//     next();
	// }

	public async getUserById(req: Request, res: Response, next: NextFunction) {
		try {
			if (!('id' in req.params)) throw new NoQueryParamProvided('id');

			res.locals.response = {
				status: true,
				httpCode: HttpCodes.OK,
				data: instanceToPlain(await this.userService.getUserById(new UserModel(req.params as any)))
			};

			next();
		} catch (error) {
			next(error);
		}
	}

	public async getUserByUsername(req: Request, res: Response, next: NextFunction) {
		try {
			if (!('username' in req.params)) throw new NoQueryParamProvided('username');

			res.locals.response = {
				status: true,
				httpCode: HttpCodes.OK,
				data: instanceToPlain(await this.userService.getUserByUsername(new UserModel(req.params as any)))
			};

			next();
		} catch (error) {
			next(error);
		}
	}

	public async createUser(req: Request, res: Response, next: NextFunction) {
		try {
			res.locals.response = {
				status: true,
				httpCode: HttpCodes.CREATED,
				data: instanceToPlain(await this.userService.createNewUser(new UserModel(req.body)))
			};

			next();
		} catch (error) {
			next(error);
		}
	}

	// async getUsers(req: InjectedRequest, res: InjectedResponse, next: NextFunction): Promise<void> {
	//     const query: any = req.query;
	//     const params: any = req.params;
	//     const response: ISuccessfulResponse | IFailedResponse = await this._service.getUsers(params, query);
	//     res.response = response;
	//     next();
	// }

	// async loginUser(req: InjectedRequest, res: InjectedResponse, next: NextFunction): Promise<void> {
	//     const payload: IUserProperties = req.body;
	//     const response: ISuccessfulResponse | IFailedResponse = await this._service.loginUser(payload);
	//     res.response = response;
	//     next();
	// }

	// async logoutUser(req: InjectedRequest, res: InjectedResponse, next: NextFunction): Promise<void> {
	//     const authorizationHeader: string = req.headers.authorization;
	//     const token: string = authorizationHeader.replace('JWT', '').trim();
	//     const user: IUserProperties = req.user;

	//     const response: ISuccessfulResponse | IFailedResponse = await this._service.logoutUser(user, token);
	//     res.response = response;
	//     next();
	// }
}
