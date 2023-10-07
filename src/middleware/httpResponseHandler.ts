import { NextFunction, Response, Request } from 'express';

/**
 * Middleware function that is the common HTTP response nexus where are the responsed
 * are being handled and returned back to the caller.
 * @param req Expressjs request object.
 * @param res Expressjs response object.
 * @param next Expressjs next method.
 * @returns Returns an ExpressJS response object.
 * @author Vasilis
 */
export default function sendHttpResponse(req: Request, res: Response, next: NextFunction): Response {
	const response: any = res.locals.response;

	const httpCode = response.httpCode;
	delete response.httpCode;

	return res.status(httpCode).send(response);
}
