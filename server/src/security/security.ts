import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { sign, decode, JwtPayload } from 'jsonwebtoken';
import { InjectedRequest, InjectedResponse } from '../interfaces/express';
import { NextFunction } from 'express';
import { IFailedResponse, ISuccessfulResponse, ISuccessfulResponseData } from '../interfaces/response';
import { InvalidTokenProvided } from '../exceptions/security';
import ObjectHandler from '../helpers/objectHandler';
import RedisClient from '../connections/redis';

// Load enviromentals
require('../bin/env');

export default class Security {
    constructor() {
        this.initializeJWTStrategy();
    }

    initializeJWTStrategy() {
        passport.use(
            new JwtStrategy({
                jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
                secretOrKey: process.env.JWT_TOP_SECRET,
                ignoreExpiration: false,
            }, async (jwtPayload: JwtPayload, done: any) => {
                try {
                    const userid = jwtPayload.id;

                    done(null);
                } catch (err) {
                    done(err);
                }
            },),
        );
    }

    authenticate(req: InjectedRequest, res: InjectedResponse, next: NextFunction) {
        return passport.authenticate('jwt', { session: false }, (err, user, info) => {
            try {
                if (err || !user) throw new InvalidTokenProvided();
                req.user = user;
                next(); 
            } catch (e) {
                if (!(e instanceof InvalidTokenProvided)) throw e;

                const errorResource: any = { status: false, ...ObjectHandler.getResource(e) };
                const error: IFailedResponse = errorResource;
                res.status(e.httpCode).json(error);
            }
        })(req, res, next);
    }

    async generateUserToken(req: InjectedRequest, res: InjectedResponse, next: NextFunction) {
        try {
            if (!('response' in res) || !res.response.status) throw Error();

            const content: ISuccessfulResponse = res.response;
            const contentData: ISuccessfulResponseData = content.data;
            if (!('id' in contentData) || !contentData.id) throw Error();

            const token = sign(contentData, process.env.JWT_TOP_SECRET, {
                expiresIn: 7200, // 7200 seconds - 120 mins
            });

            // Need to fetch the expiration time
            const payload = decode(token) as JwtPayload;
            content.data = { token, exp: payload.exp };
            res.response = content;

            // Log new token to redis
            await RedisClient.client.hSet(process.env.USER_TOKEN_PATH, contentData.id, token);

            next();
        } catch (e) {
            next();
        }
    }
}
