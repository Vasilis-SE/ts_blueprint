"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpCodesEnum_1 = require("../../src/helpers/httpCodesEnum");
describe('Check HTTP codes enum for validity and integrity', () => {
    test('Is OK code correct ?', () => {
        expect(httpCodesEnum_1.HttpCodes.OK).toBeDefined();
        expect(httpCodesEnum_1.HttpCodes.OK).toBeTruthy();
        expect(typeof httpCodesEnum_1.HttpCodes.OK).toEqual('number');
        expect(httpCodesEnum_1.HttpCodes.OK).toEqual(200);
    });
    test('Is CREATED code correct ?', () => {
        expect(httpCodesEnum_1.HttpCodes.CREATED).toBeDefined();
        expect(httpCodesEnum_1.HttpCodes.CREATED).toBeTruthy();
        expect(typeof httpCodesEnum_1.HttpCodes.CREATED).toEqual('number');
        expect(httpCodesEnum_1.HttpCodes.CREATED).toEqual(201);
    });
    test('Is BAD_REQUEST code correct ?', () => {
        expect(httpCodesEnum_1.HttpCodes.BAD_REQUEST).toBeDefined();
        expect(httpCodesEnum_1.HttpCodes.BAD_REQUEST).toBeTruthy();
        expect(typeof httpCodesEnum_1.HttpCodes.BAD_REQUEST).toEqual('number');
        expect(httpCodesEnum_1.HttpCodes.BAD_REQUEST).toEqual(400);
    });
    test('Is UNAUTHORIZED code correct ?', () => {
        expect(httpCodesEnum_1.HttpCodes.UNAUTHORIZED).toBeDefined();
        expect(httpCodesEnum_1.HttpCodes.UNAUTHORIZED).toBeTruthy();
        expect(typeof httpCodesEnum_1.HttpCodes.UNAUTHORIZED).toEqual('number');
        expect(httpCodesEnum_1.HttpCodes.UNAUTHORIZED).toEqual(401);
    });
    test('Is FORBIDDEN code correct ?', () => {
        expect(httpCodesEnum_1.HttpCodes.FORBIDDEN).toBeDefined();
        expect(httpCodesEnum_1.HttpCodes.FORBIDDEN).toBeTruthy();
        expect(typeof httpCodesEnum_1.HttpCodes.FORBIDDEN).toEqual('number');
        expect(httpCodesEnum_1.HttpCodes.FORBIDDEN).toEqual(403);
    });
    test('Is NOT_FOUND code correct ?', () => {
        expect(httpCodesEnum_1.HttpCodes.NOT_FOUND).toBeDefined();
        expect(httpCodesEnum_1.HttpCodes.NOT_FOUND).toBeTruthy();
        expect(typeof httpCodesEnum_1.HttpCodes.NOT_FOUND).toEqual('number');
        expect(httpCodesEnum_1.HttpCodes.NOT_FOUND).toEqual(404);
    });
    test('Is SERVER_ERROR code correct ?', () => {
        expect(httpCodesEnum_1.HttpCodes.SERVER_ERROR).toBeDefined();
        expect(httpCodesEnum_1.HttpCodes.SERVER_ERROR).toBeTruthy();
        expect(typeof httpCodesEnum_1.HttpCodes.SERVER_ERROR).toEqual('number');
        expect(httpCodesEnum_1.HttpCodes.SERVER_ERROR).toEqual(500);
    });
});
