"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _FORBIDDENCHARS;
(function (_FORBIDDENCHARS) {
    _FORBIDDENCHARS["_ALL"] = "/[!@#$%^&*()_+-=[]{};':\"\\|,.<>/?]+/";
    _FORBIDDENCHARS["_ALLEXCDD"] = "/[!@#$%^&*()_+=[]{};':\"\\|<>/?]+/";
})(_FORBIDDENCHARS || (_FORBIDDENCHARS = {}));
class Validator {
    static hasWhitespace(value) {
        const regex = new RegExp(/\s/);
        return regex.test(value);
    }
    static hasSpecialCharacters(value, flag) {
        let regExpression = flag ? _FORBIDDENCHARS._ALL : _FORBIDDENCHARS[flag];
        const regex = new RegExp(regExpression);
        return regex.test(value);
    }
    static hasLowerCase(value) {
        return value.toUpperCase() !== value;
    }
    static hasUpperCase(value) {
        return value.toLowerCase() !== value;
    }
    static hasNumbers(value) {
        const regex = new RegExp(/\d/);
        return regex.test(value);
    }
    static isNumber(value) {
        const regex = new RegExp(/^\d+$/);
        return regex.test(value);
    }
}
exports.default = Validator;
