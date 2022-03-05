import { NextFunction } from 'express';
import { InjectedRequest, InjectedResponse } from '../interfaces/express';
import { IRateProperties } from '../interfaces/rate';
import { IFailedResponse, ISuccessfulResponse } from '../interfaces/response';
import RateService from '../services/rate';

/**
 * Controller class for 'rate' domain. All those class functions are connected
 * directly with one or more routes.
 */
export default class RateController {
    private _service: RateService;

    constructor() {
        this._service = new RateService();
    }

    async addRate(req: InjectedRequest, res: InjectedResponse, next: NextFunction): Promise<void> {
        const payload: IRateProperties = { ...req.body };
        const response: ISuccessfulResponse | IFailedResponse = await this._service.addRating(req.user, payload);
        res.response = response;
        next();
    }

    async changeRate(req: InjectedRequest, res: InjectedResponse, next: NextFunction): Promise<void> {
        const payload: IRateProperties = { ...req.body };
        const response: ISuccessfulResponse | IFailedResponse = await this._service.changeRating(req.user, payload);
        res.response = response;
        next();
    }
}