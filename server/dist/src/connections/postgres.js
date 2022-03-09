"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
class PostgreSQL {
    static init() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.client = new pg_1.Client({
                    host: process.env.DATABASE_HOST,
                    port: Number(process.env.DATABASE_PORT),
                    user: process.env.DATABASE_USER,
                    password: process.env.DATABASE_PASS,
                    database: process.env.DATABASE_NAME,
                });
                // connecting to database
                yield this.client.connect();
                console.info(`Postgres ${process.env.DATABASE_NAME} is connected...`);
            }
            catch (error) {
                console.error(`Postgres error: ${error}`);
                process.exit(1);
            }
        });
    }
    static close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.end();
        });
    }
}
exports.default = PostgreSQL;
