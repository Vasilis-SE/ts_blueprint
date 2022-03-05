import { NextFunction, Router } from 'express';
import BaseController from '../controllers/baseController';
import UserController from '../controllers/user';
import { InjectedRequest, InjectedResponse } from '../interfaces/express';
import Security from '../security/security';


const _security = new Security();
const _baseController = new BaseController();
const _controller = new UserController();
