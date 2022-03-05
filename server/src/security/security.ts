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

            let rememberMeFlag = ('rm' in req.query) && req.query.rm === 'true'
                ? true : false;

            let token: string = '';
            let resp: Object = {};
            if(rememberMeFlag) {
                token = sign(contentData, process.env.JWT_TOP_SECRET);
            } else {
                token = sign(contentData, process.env.JWT_TOP_SECRET, { expiresIn: 7200 });
            }

            const payload = decode(token) as JwtPayload;
            
            // Log new token to redis
            await RedisClient.client.set(`${process.env.USER_TOKEN_PATH}:${contentData.id}`, token);

            if(!rememberMeFlag) {
                content.data = { token, exp: payload.exp };
                res.response = content;

                let seconds: number = payload.exp - (Math.round(Date.now() / 1000))
                await RedisClient.client.expire(`${process.env.USER_TOKEN_PATH}:${contentData.id}`, seconds);
            } else {
                content.data = { token };
                res.response = content;    
            }

            next();
        } catch (e) {
            console.log(e)
            next();
        }
    }
}
