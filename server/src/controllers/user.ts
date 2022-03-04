import { NextFunction } from 'express';
import { InjectedRequest, InjectedResponse } from '../interfaces/express';
import { IFailedResponse, ISuccessfulResponse } from '../interfaces/response';
import { IUserProperties } from '../interfaces/user';
import UserService from '../services/user';

/**
 * Controller class for 'user' domain. All those class functions are connected
 * directly with one or more routes.
 */
export default class UserController {
    private _service: UserService;

    constructor() {
        this._service = new UserService();
    }

    async createUser(req: InjectedRequest, res: InjectedResponse, next: NextFunction): Promise<void> {
        const payload: IUserProperties = req.body;
        const response: ISuccessfulResponse | IFailedResponse = await this._service.createUser(payload);
        res.response = response;
        next();
    }

    async getUsers(req: InjectedRequest, res: InjectedResponse, next: NextFunction): Promise<void> {
        const query: any = req.query;
        const params: any = req.params;
        const response: ISuccessfulResponse | IFailedResponse = await this._service.getUsers(params, query);
        res.response = response;
        next();
    }

    async loginUser(req: InjectedRequest, res: InjectedResponse, next: NextFunction): Promise<void> {
        const payload: IUserProperties = req.body;
        const response: ISuccessfulResponse | IFailedResponse = await this._service.loginUser(payload);
        res.response = response;
        next();
    }
}
