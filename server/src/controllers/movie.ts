import { NextFunction } from "express";
import { InjectedRequest, InjectedResponse } from "../interfaces/express";

import MovieService from '../services/movie';

/**
 * Controller class for 'movie' domain. All those class functions are connected
 * directly with one or more routes.
 */
export default class MovieController {
    private _service: MovieService;

    constructor() {
        this._service = new MovieService();
    }

    async createMovie(req: InjectedRequest, res: InjectedResponse, next: NextFunction): Promise<void> {
        // const payload: IUserProperties = req.body;
        // const response: ISuccessfulResponse | IFailedResponse = await this._service.createUser(payload);
        // res.response = response;
        next();
    }

}