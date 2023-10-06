import * as bodyParser from 'body-parser';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
// import Routes from '../routes/router';
import passport from 'passport';

import '../config/env';

export default class Application {
    private app: express.Application;
    // private routes: Routes;

    public constructor() {
        this.app = express();
        // this.routes = new Routes();
        this.init();
    }

    private async init(): Promise<void> {
        this.config();
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(passport.initialize());
        // this.app.use('/api', this.routes.getAppRoutes());

        this.app.use((req, res) => {
            res.status(404).send({ url: `${req.originalUrl} not found...` });
        });
    }

    public run(): void {
        this.app.listen(process.env.PORT, () => {
            console.log(`Server started on port: ${process.env.PORT}`);
        });
    }
}
