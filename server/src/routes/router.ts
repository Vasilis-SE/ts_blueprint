import { Router } from 'express';
import userRoutes from './user';
import movieRoutes from './movie';
import rateRoutes from './rate';

/**
 * Main router class that 'merges' all the separate routes into a single
 * entity that express will use.
 */
export default class Routes {
    private _routes: Router;

    constructor() {
        this._routes = Router();
        this.initialize();
    }

    private initialize(): void {
        // Load all seperate routes
        this._routes.use('/user', userRoutes);
        this._routes.use('/movie', movieRoutes);
        this._routes.use('/rate', rateRoutes);
    }

    public getAppRoutes(): Router {
        return this._routes;
    }
}
