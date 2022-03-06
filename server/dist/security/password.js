"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const bcrypt = __importStar(require("bcrypt"));
const user_1 = require("../interfaces/user");
const validator_1 = __importDefault(require("../helpers/validator"));
class Password {
    constructor(p) {
        this.password = p ? p : '';
    }
    hashPassword() {
        try {
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(this.password, salt);
            this.setPassword(hash);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    comparePassword(plainPass = '') {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt.compare(plainPass, this.getPassword());
        });
    }
    isPasswordLong() {
        return this.password.length >= user_1.UserGlobals.PASSWORD_MINLENGTH;
    }
    isPasswordStrong() {
        return __awaiter(this, void 0, void 0, function* () {
            let points = 0;
            if (validator_1.default.hasLowerCase(this.password))
                points++;
            if (validator_1.default.hasUpperCase(this.password))
                points++;
            if (validator_1.default.hasNumbers(this.password))
                points++;
            if (validator_1.default.hasSpecialCharacters(this.password, '_ALL'))
                points++;
            if (this.isPasswordLong())
                points++;
            return points >= 3;
        });
    }
    // Getters - Setters
    getPassword() {
        return this.password;
    }
    setPassword(p) {
        this.password = p;
    }
}
exports.default = Password;
