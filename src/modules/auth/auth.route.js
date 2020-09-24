import express from 'express';
import * as controller from './auth.controller';
import { loginDTO } from './auth.dto';
import { validJWT, validRefresh } from '../../middlewares/auth-validation.middleware';

export const router = express.Router();

router.post('/', [loginDTO], controller.login);
router.post('/refresh', [validJWT, validRefresh], controller.refresh);
