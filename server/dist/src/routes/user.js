"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const baseController_1 = __importDefault(require("../controllers/baseController"));
const user_1 = __importDefault(require("../controllers/user"));
const security_1 = __importDefault(require("../security/security"));
const userRoutes = (0, express_1.Router)();
const _security = new security_1.default();
const _baseController = new baseController_1.default();
const _controller = new user_1.default();
// Route that creates a new user.
userRoutes.post('/', (req, res, next) => _controller.createUser(req, res, next), (req, res, next) => _baseController.send(req, res, next));
// Route that fetches a user's profile.
userRoutes.get('/profile', (req, res, next) => _security.authenticate(req, res, next), (req, res, next) => _controller.getUserProfile(req, res, next), (req, res, next) => _baseController.send(req, res, next));
// Route that logins a user.
userRoutes.post('/login', (req, res, next) => _controller.loginUser(req, res, next), (req, res, next) => _security.generateUserToken(req, res, next), (req, res, next) => _baseController.send(req, res, next));
// Route that logins a user.
userRoutes.delete('/logout', (req, res, next) => _security.authenticate(req, res, next), (req, res, next) => _controller.logoutUser(req, res, next), (req, res, next) => _baseController.send(req, res, next));
exports.default = userRoutes;
