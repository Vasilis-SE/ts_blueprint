"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const baseController_1 = __importDefault(require("../controllers/baseController"));
const rate_1 = __importDefault(require("../controllers/rate"));
const security_1 = __importDefault(require("../security/security"));
const userRoutes = (0, express_1.Router)();
const _security = new security_1.default();
const _baseController = new baseController_1.default();
const _controller = new rate_1.default();
// Route that creates a new ratting.
userRoutes.post('/', (req, res, next) => _security.authenticate(req, res, next), (req, res, next) => _controller.addRating(req, res, next), (req, res, next) => _baseController.send(req, res, next));
// Route that changes the rating of the user.
userRoutes.patch('/', (req, res, next) => _security.authenticate(req, res, next), (req, res, next) => _controller.changeRating(req, res, next), (req, res, next) => _baseController.send(req, res, next));
// Route that retracts a rating of a user
userRoutes.delete('/:movieid([0-9]+)', (req, res, next) => _security.authenticate(req, res, next), (req, res, next) => _controller.retractRating(req, res, next), (req, res, next) => _baseController.send(req, res, next));
exports.default = userRoutes;
