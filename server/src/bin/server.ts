import * as bodyParser from 'body-parser';

import express from 'express';
import cors from 'cors';
import * as http from 'http';
import helmet from 'helmet';

export default class Server {
    private _app: express.Application;

    public constructor() {
        this._app = express();
        this.config();
    }

    public run(port: number, callback?: () => void): http.Server {
        if (callback) return this._app.listen(port, callback);
        return this._app.listen(port);
    }

    private config(): void {
        this._app.use(bodyParser.json());
        this._app.use(bodyParser.urlencoded({ extended: true }));
        this._app.use(cors());
        this._app.use(helmet());

        this._app.use((req, res) => {
            res.status(404).send({ url: `${req.originalUrl} not found` });
        });
    }
}
