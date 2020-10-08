import express from 'express';
import * as controller from './vitalsign.controller';
import { validId, validPagination, validParamId } from '../../../middlewares/validation.middleware';
import { createVitalsignDTO, updateVitalsignDTO } from './vitalsign.dto';
import { validJWT } from '../../../middlewares/auth-validation.middleware';

export const router = express.Router();

function setParams(req, res, next) {
  req.params.visitId = req.visitId;
  next();
}

router
  .route('/')
  .post([validJWT, setParams, createVitalsignDTO], controller.createVitalsign)
  .get([validJWT, setParams, validPagination], controller.listVitalsign);

router
  .route('/:id')
  .get([validJWT, setParams, validId], controller.getVitalsign)
  .delete([validJWT, setParams, validId], controller.cancelVitalsign)
  .patch([validJWT, setParams, validId, updateVitalsignDTO], controller.updateVitalsign)
  .put([validJWT, setParams, validId, updateVitalsignDTO], controller.updateVitalsign);
