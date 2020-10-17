import express from 'express';
import * as controller from './results.controller';
import { validId, validPagination } from '../../../middlewares/validation.middleware';
import { updateResultLabDTO, updateResultXrayDTO } from './results.dto';
import { validJWT } from '../../../middlewares/auth-validation.middleware';

export const router = express.Router();

router.route('/lab').get([validJWT, validPagination], controller.listResultLabByVisitId);

router
  .route('/lab/:id')
  .get([validJWT, validId], controller.getResultLab)
  .patch([validJWT, validId, updateResultLabDTO], controller.updateResultLab)
  .put([validJWT, validId, updateResultLabDTO], controller.updateResultLab);

router.route('/xray').get([validJWT, validPagination], controller.listResultXrayByVisitId);

router
  .route('/xray/:id')
  .get([validJWT, validId], controller.getResultXray)
  .patch([validJWT, validId, updateResultXrayDTO], controller.updateResultXray)
  .put([validJWT, validId, updateResultXrayDTO], controller.updateResultXray);
