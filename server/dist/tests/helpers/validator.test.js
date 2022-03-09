"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("../../src/helpers/validator"));
describe('Check hasWhitespace function', () => {
    test('Single white space in middle found', () => {
        const response = validator_1.default.hasWhitespace('Some text');
        expect(response).toBeDefined();
        expect(response).toBeTruthy();
        expect(typeof response).toEqual('boolean');
    });
    test('Single white space at the beginning found', () => {
        const response = validator_1.default.hasWhitespace(' text');
        expect(response).toBeDefined();
        expect(response).toBeTruthy();
        expect(typeof response).toEqual('boolean');
    });
    test('Single white space at the end found', () => {
        const response = validator_1.default.hasWhitespace('text ');
        expect(response).toBeDefined();
        expect(response).toBeTruthy();
        expect(typeof response).toEqual('boolean');
    });
    test('Text with no whitespace', () => {
        const response = validator_1.default.hasWhitespace('text');
        expect(response).toBeDefined();
        expect(response).toBeFalsy();
        expect(typeof response).toEqual('boolean');
    });
    test('Multiple white spaces found', () => {
        const response = validator_1.default.hasWhitespace('some text here');
        expect(response).toBeDefined();
        expect(response).toBeTruthy();
        expect(typeof response).toEqual('boolean');
    });
});
describe('Check hasSpecialCharacters function', () => {
    test('Text has special characters', () => {
        const response = validator_1.default.hasWhitespace('Some text%#)@');
        expect(response).toBeDefined();
        expect(response).toBeTruthy();
        expect(typeof response).toEqual('boolean');
    });
    test('Text has no special characters', () => {
        const response = validator_1.default.hasWhitespace('text');
        expect(response).toBeDefined();
        expect(response).toBeFalsy();
        expect(typeof response).toEqual('boolean');
    });
});
describe('Check hasLowerCase function', () => {
    test('Text with lower case should return true', () => {
        const response = validator_1.default.hasLowerCase('aneM53aIL');
        expect(response).toBeDefined();
        expect(response).toBeTruthy();
        expect(typeof response).toEqual('boolean');
    });
    test('Text without lower case should return false', () => {
        const response = validator_1.default.hasLowerCase('ANEM53AIL');
        expect(response).toBeDefined();
        expect(response).toBeFalsy();
        expect(typeof response).toEqual('boolean');
    });
    test('Empty input should return false', () => {
        const response = validator_1.default.hasLowerCase('');
        expect(response).toBeDefined();
        expect(response).toBeFalsy();
        expect(typeof response).toEqual('boolean');
    });
});
describe('Check hasUpperCase function', () => {
    test('Text with upper case should return true', () => {
        const response = validator_1.default.hasUpperCase('aneM53aIL');
        expect(response).toBeDefined();
        expect(response).toBeTruthy();
        expect(typeof response).toEqual('boolean');
    });
    test('Text without upper case should return false', () => {
        const response = validator_1.default.hasUpperCase('anemail');
        expect(response).toBeDefined();
        expect(response).toBeFalsy();
        expect(typeof response).toEqual('boolean');
    });
    test('Empty input should return false', () => {
        const response = validator_1.default.hasUpperCase('');
        expect(response).toBeDefined();
        expect(response).toBeFalsy();
        expect(typeof response).toEqual('boolean');
    });
});
describe('Check hasNumbers function', () => {
    test('Text with numbers should return true', () => {
        const response = validator_1.default.hasNumbers('aneM53aIL');
        expect(response).toBeDefined();
        expect(response).toBeTruthy();
        expect(typeof response).toEqual('boolean');
    });
    test('Text without numbers should return false', () => {
        const response = validator_1.default.hasNumbers('aneMaIL');
        expect(response).toBeDefined();
        expect(response).toBeFalsy();
        expect(typeof response).toEqual('boolean');
    });
    test('Empty input should return false', () => {
        const response = validator_1.default.hasNumbers('');
        expect(response).toBeDefined();
        expect(response).toBeFalsy();
        expect(typeof response).toEqual('boolean');
    });
});
describe('Check isNumber function', () => {
    test('Text that contains only numbers should return true', () => {
        const response = validator_1.default.isNumber('482473298');
        expect(response).toBeDefined();
        expect(response).toBeTruthy();
        expect(typeof response).toEqual('boolean');
    });
    test('Text that does not contains only numbers should return false', () => {
        const response = validator_1.default.isNumber('aneM234aIL');
        expect(response).toBeDefined();
        expect(response).toBeFalsy();
        expect(typeof response).toEqual('boolean');
    });
    test('Empty input should return false', () => {
        const response = validator_1.default.isNumber('');
        expect(response).toBeDefined();
        expect(response).toBeFalsy();
        expect(typeof response).toEqual('boolean');
    });
});
