import { NextFunction } from "express";
import { InjectedRequest, InjectedResponse } from "../interfaces/express";
import { IMovieProperties } from "../interfaces/movie";
import { IFailedResponse, ISuccessfulResponse } from "../interfaces/response";

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
        // Get the requests payload and also the username from the authenticated user
        // (the one that is going to create the new movie).
        const payload: IMovieProperties = {
            username: req.user.username,
            ...req.body
        };

        const response: ISuccessfulResponse | IFailedResponse = await this._service.createMovie(payload);
        // res.response = response;
        // next();
    }

}