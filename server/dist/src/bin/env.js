"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const arg_1 = __importDefault(require("arg"));
const path_1 = __importDefault(require("path"));
const args = (0, arg_1.default)({ '--env': String });
let confFile = '.env';
if (args['--env'] == 'dev')
    confFile = '.env.dev';
require('dotenv').config({ path: path_1.default.join(__dirname, `../config/${confFile}`) });
