"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const postgres_1 = __importDefault(require("../connections/postgres"));
const redis_1 = __importDefault(require("../connections/redis"));
// Load enviromentals
require('../bin/env');
// Initialize connections
postgres_1.default.init();
redis_1.default.init();
const server = new server_1.default();
server.run(Number(process.env.PORT), () => console.log(`Server started on port: ${process.env.PORT}`));
