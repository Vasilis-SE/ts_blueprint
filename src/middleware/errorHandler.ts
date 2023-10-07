import Logger from '@config/logger';
import '@exceptions/customExceptions';
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware that its sole purpose is to fetch wild thrown exceptions from parts of the code and
 * to call the appropriate functions to send an error response back. This middleware is used as an
 * addon route function after each individual controller call in order to catch the exceptions.
 * @author Vasilis
 */
export default class ErrorHandler {
	private handler: any;

	constructor() {
		this.handler = (err: Error, req: Request, res: Response, next: NextFunction) =>
			this.customErrorHandler(err, req, res, next);
	}

	public getHandler(): any {
		return this.handler;
	}

	/**
	 * This is the main middleware function that fetches the error an executes the appropriate processes.
	 * @param err The exception thrown.
	 * @param req Express.js request object.
	 * @param res Express.js response object.
	 * @param next Express.js next function that chains the next middleware functions.
	 */
	public customErrorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
		const customExceptionClasses: string[] = Object.keys((globalThis as any).RegisteredClasses);
		if (!customExceptionClasses.includes(err.name)) {
			next();
			return;
		}

		Logger.error(err.toString(), __filename);
		res.locals.response = err;
		next();
	}
}
