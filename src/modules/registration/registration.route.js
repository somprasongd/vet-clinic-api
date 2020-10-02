import express from 'express';
import * as controller from './registration.controller';
import { validPagination } from '../../middlewares/validation.middleware';
import { searchDTO } from './registration.dto';
import { validJWT } from '../../middlewares/auth-validation.middleware';

export const router = express.Router();

router.route('/').get([validJWT, validPagination, searchDTO], controller.handleList);
router.route('/configs').get([validJWT], controller.handleGetConfig);
