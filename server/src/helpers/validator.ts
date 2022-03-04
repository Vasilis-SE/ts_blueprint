export default class Validator {
    static hasWhitespace(value: string): boolean {
        const regex = new RegExp(/\s/);
        return regex.test(value);
    }

    static hasSpecialCharacters(value: string): boolean {
        const regex = new RegExp(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/);
        return regex.test(value);
    }

    static hasLowerCase(value: string): boolean {
        return value.toUpperCase() !== value;
    }

    static hasUpperCase(value: string): boolean {
        return value.toLowerCase() !== value;
    }

    static hasNumbers(value: string): boolean {
        const regex = new RegExp(/\d/);
        return regex.test(value);
    }

    static isNumber(value: string): boolean {
        const regex = new RegExp(/^\d+$/);
        return regex.test(value);
    }
}
