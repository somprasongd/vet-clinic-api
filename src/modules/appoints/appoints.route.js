import express from 'express';
import * as controller from './appoints.controller';
import { validId, validPagination } from '../../middlewares/validation.middleware';
import { createAppointDTO, searchAppointDTO, updateAppointDTO } from './appoints.dto';
import { validJWT } from '../../middlewares/auth-validation.middleware';

export const router = express.Router();

router
  .route('/')
  .post([validJWT, createAppointDTO], controller.createAppoint)
  .get([validJWT, validPagination, searchAppointDTO], controller.listAppoint);

router
  .route('/:id')
  .get([validJWT, validId], controller.getAppoint)
  .delete([validJWT, validId], controller.removeAppoint)
  .patch([validJWT, validId, updateAppointDTO], controller.updateAppoint) // partial update
  .put([validJWT, validId, updateAppointDTO], controller.updateAppoint);
