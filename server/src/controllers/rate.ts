import { NextFunction } from 'express';
import { InjectedRequest, InjectedResponse } from '../interfaces/express';
import { IRateProperties } from '../interfaces/rate';
import { IFailedResponse, ISuccessfulResponse } from '../interfaces/response';
import { IUserProperties } from '../interfaces/user';
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

    async rateMovie(req: InjectedRequest, res: InjectedResponse, next: NextFunction): Promise<void> {
        const user: IUserProperties = req.user;
        const payload: IRateProperties = { ...req.body };

        // First of all get the rating of the user if there is any
        let response: any = await this._service.getRatings({ movieid: payload.movieid, username: user.username });
        
        // Did not found any previous ratings of user on the movie, so add the rating.
        if(!response.status && response.httpCode === 404) { 
            response = await this._service.addRating(user, payload);   
            response = {...response, proc: 'add'};
        } else if(response.status) {
            if(response.data[0].type != payload.type) { // Change rating
                response = await this._service.changeRating(user, payload);
                response = {...response, proc: 'change'};
            } else { // Retract rating 
                response = await this._service.retractRating(user, {movieid: req.body.movieid});
                response = {...response, proc: 'retract'};
            }
        }

        res.response = response;
        next();    
    }

    async addRating(req: InjectedRequest, res: InjectedResponse, next: NextFunction): Promise<void> {
        const payload: IRateProperties = { ...req.body };
        const response: ISuccessfulResponse | IFailedResponse = await this._service.addRating(req.user, payload);
        res.response = response;
        next();
    }

    async changeRating(req: InjectedRequest, res: InjectedResponse, next: NextFunction): Promise<void> {
        const payload: IRateProperties = { ...req.body };
        const response: ISuccessfulResponse | IFailedResponse = await this._service.changeRating(req.user, payload);
        res.response = response;
        next();
    }

    async retractRating(req: InjectedRequest, res: InjectedResponse, next: NextFunction): Promise<void> {
        const params: IRateProperties = req.params;
        const response: ISuccessfulResponse | IFailedResponse = await this._service.retractRating(req.user, params);
        res.response = response;
        next();
    }
}