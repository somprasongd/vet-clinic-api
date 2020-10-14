import express from 'express';
import * as controller from './vitalsign.controller';
import { validId, validPagination } from '../../../middlewares/validation.middleware';
import { createVitalsignDTO, updateVitalsignDTO } from './vitalsign.dto';
import { validJWT } from '../../../middlewares/auth-validation.middleware';

export const router = express.Router();

router
  .route('/')
  .post([validJWT, createVitalsignDTO], controller.createVitalsign)
  .get([validJWT, validPagination], controller.listVitalsign);

router
  .route('/:id')
  .get([validJWT, validId], controller.getVitalsign)
  .delete([validJWT, validId], controller.cancelVitalsign)
  .patch([validJWT, validId, updateVitalsignDTO], controller.updateVitalsign)
  .put([validJWT, validId, updateVitalsignDTO], controller.updateVitalsign);
