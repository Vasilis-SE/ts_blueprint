import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import { sign, decode, JwtPayload } from 'jsonwebtoken';
import { InjectedRequest, InjectedResponse } from '../interfaces/express';
import { NextFunction } from 'express';
import { ISuccessfulResponse, ISuccessfulResponseData } from '../interfaces/response';

export default class Security {
    constructor() {
        this.initializeJWTStrategy();
    }

    initializeJWTStrategy() {
        passport.use(
            new JwtStrategy(
                {
                    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
                    secretOrKey: process.env.JWT_TOP_SECRET,
                    ignoreExpiration: false,
                },
                async (jwtPayload: JwtPayload, done: any) => {
                    try {
                        const userid = jwtPayload.id;

                        done(null);
                    } catch (err) {
                        done(err);
                    }
                },
            ),
        );
    }

    generateUserToken(req: InjectedRequest, res: InjectedResponse, next: NextFunction) {
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

            next();
        } catch (e) {
            next();
        }
    }
}