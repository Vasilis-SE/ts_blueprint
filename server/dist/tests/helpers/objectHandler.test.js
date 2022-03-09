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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objectHandler_1 = __importDefault(require("../../src/helpers/objectHandler"));
const user_1 = __importDefault(require("../../src/models/user"));
const fs = require('fs');
let users = [];
beforeEach(() => {
    let rawdata = fs.readFileSync(require('path').resolve(__dirname, '../..') + "/mocks/users.json");
    users = JSON.parse(rawdata);
});
describe('Check output of getResource function', () => {
    test('Single object input, must have single object output', () => {
        const response = objectHandler_1.default.getResource(users[0]);
        expect(response).toBeDefined();
        expect(typeof response).toEqual('object');
        expect(Object.getPrototypeOf(response)).toBe(Object.prototype);
    });
    test('Array of objects as input, must have an array objects as output', () => {
        const response = objectHandler_1.default.getResource(users);
        expect(response).toBeDefined();
        expect(typeof response).toEqual('object');
        expect(Object.getPrototypeOf(response)).toBe(Array.prototype);
    });
    test('Empty single object has single object output', () => {
        let userA = {};
        const response = objectHandler_1.default.getResource(userA);
        expect(typeof response).toEqual('object');
        expect(Object.getPrototypeOf(response)).toBe(Object.prototype);
        expect(Object.keys(response)).toHaveLength(0);
    });
    test('Empty array of objects has empty array as output', () => {
        let listOfUsers = [];
        const response = objectHandler_1.default.getResource(listOfUsers);
        expect(typeof response).toEqual('object');
        expect(Object.getPrototypeOf(response)).toBe(Array.prototype);
        expect(response).toHaveLength(0);
    });
    test('Null values are cleaned', () => {
        let user1 = users[0];
        user1['password'] = null;
        let response = objectHandler_1.default.getResource(user1);
        expect(response).toMatchObject({ id: 1, username: 'mhiers0' });
        expect(Object.keys(response)).toHaveLength(2);
        expect(response).toHaveProperty('id', 1);
        expect(response).toHaveProperty('username', 'mhiers0');
        expect(response.hasOwnProperty('password')).toBeFalsy();
        // Make some properties null
        let tempListOfUsers = [users[2], users[3], users[4]];
        response = objectHandler_1.default.getResource(tempListOfUsers);
        expect(response[0]).toMatchObject({ id: 3, password: '9P40mY7' });
        expect(response[1]).toMatchObject({ id: 4, password: 'YLZol8' });
        expect(response[2]).toMatchObject({ id: 5, username: 'cstoile4' });
        expect(Object.keys(response[0])).toHaveLength(2);
        expect(Object.keys(response[1])).toHaveLength(2);
        expect(Object.keys(response[2])).toHaveLength(2);
        expect(response[0]).toHaveProperty('id', 3);
        expect(response[0]).toHaveProperty('password', '9P40mY7');
        expect(response[1]).toHaveProperty('id', 4);
        expect(response[1]).toHaveProperty('password', 'YLZol8');
        expect(response[2]).toHaveProperty('id', 5);
        expect(response[2]).toHaveProperty('username', 'cstoile4');
        expect(response[0].hasOwnProperty('username')).toBeFalsy();
        expect(response[1].hasOwnProperty('username')).toBeFalsy();
        expect(response[2].hasOwnProperty('password')).toBeFalsy();
    });
    test('Single user instance input, must have single object output', () => {
        const response = objectHandler_1.default.getResource(new user_1.default(users[0]));
        expect(response).toBeDefined();
        expect(typeof response).toEqual('object');
        expect(Object.getPrototypeOf(response)).toBe(Object.prototype);
    });
    test('Array of instances as input, must have an array objects as output', () => {
        const tempUserInstances = [
            new user_1.default(users[0]),
            new user_1.default(users[1]),
            new user_1.default(users[2]),
            new user_1.default(users[3])
        ];
        const response = objectHandler_1.default.getResource(tempUserInstances);
        expect(response).toBeDefined();
        expect(typeof response).toEqual('object');
        expect(Object.getPrototypeOf(response)).toBe(Array.prototype);
    });
});
describe('Execution time of getResource function', () => {
    test('Single object input executed under 0.01ms', () => {
        const response = objectHandler_1.default.getResource(users[0]);
        expect(response).toBeDefined();
    }, 0.01);
    test('Array of objects input executed under 0.01ms', () => {
        let tempListOfUsers = [users[2], users[3], users[4]];
        const response = objectHandler_1.default.getResource(tempListOfUsers);
        expect(response).toBeDefined();
    }, 0.01);
    test('Array of 10 input executed under 0.01ms', () => {
        let tempListOfUsers = [users[2], users[3], users[4],
            users[5], users[6], users[7], users[8], users[9],
            users[10], users[11]];
        const response = objectHandler_1.default.getResource(tempListOfUsers);
        expect(response).toBeDefined();
    }, 0.01);
    test('Array of 100 input executed under 0.01ms', () => __awaiter(void 0, void 0, void 0, function* () {
        jest.setTimeout(0.1);
        yield new Promise((resolve, reject) => {
            const response = objectHandler_1.default.getResource(users);
            if (Object(response).length > 0)
                resolve('foo');
        });
    }));
});
describe('Check output of objectToSQLParams function', () => {
    test('Use objectToSQLParams function to render query select part', () => {
        const response = objectHandler_1.default.objectToSQLParams(users[0]);
        expect(response).toBeDefined();
        expect(response).toBeTruthy();
        expect(typeof response === 'string').toBeTruthy();
        expect(response).toEqual(`id = 1 , username = 'mhiers0' , password = 'llaTCd'`);
    });
    test('Use objectToSQLParams function to render query where part', () => {
        const response = objectHandler_1.default.objectToSQLParams(users[0], ' AND ');
        expect(response).toBeDefined();
        expect(response).toBeTruthy();
        expect(typeof response === 'string').toBeTruthy();
        expect(response).toEqual(`id = 1  AND  username = 'mhiers0'  AND  password = 'llaTCd'`);
    });
    test('Empty input on objectToSQLParams should return false', () => {
        const response = objectHandler_1.default.objectToSQLParams({}, ' AND ');
        expect(response).toBeFalsy();
        expect(typeof response === 'boolean').toBeTruthy();
    });
});
describe('Execution time of getResource function', () => {
    test('Single filter is exuted les than 0.01ms', () => {
        const response = objectHandler_1.default.objectToSQLParams(users[0], ' AND ');
        expect(response).toBeTruthy();
    }, 0.01);
    test('Multiple filters are exuted les than 0.1ms', () => {
        const response = objectHandler_1.default.objectToSQLParams([
            users[0], users[1], users[2], users[3]
        ]);
        expect(response).toBeTruthy();
    }, 0.1);
});
