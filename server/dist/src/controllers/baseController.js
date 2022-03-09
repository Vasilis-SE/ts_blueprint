"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Base controller class that contain middleware for all routes.
 */
class BaseController {
    /**
     * Middleware function that is called always last and responds the results
     * back to the caller.
     * @param req The express request object
     * @param res The express response object
     * @returns Returns express response object
     */
    send(req, res, next) {
        if (!('response' in res))
            return res.sendStatus(500);
        const response = res.response;
        const httpCode = response.httpCode;
        return res.status(httpCode).json(response);
    }
}
exports.default = BaseController;
