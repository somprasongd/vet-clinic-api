import express from 'express';
import * as controller from './visits.controller';
import { validId, validPagination, validParamId } from '../../middlewares/validation.middleware';
import { createDaycareDTO, createVisitDTO, searchVisitDTO, updateVisitDTO } from './visits.dto';
import { validJWT } from '../../middlewares/auth-validation.middleware';
import { resizeAvatar, uploadAvatar } from '../../middlewares/upload.middleware';
import { createUploadImageDTO } from '../upload/upload.dto';
import * as uploadMiddleware from '../upload/upload.middleware';

export const router = express.Router();

router.route('/is-visit/:petId').get([validJWT, validParamId('petId')], controller.checkIsVisit);
router.route('/is-daycare/:petId').get([validJWT, validParamId('petId')], controller.checkIsDaycare);

router.route('/daycare').post([validJWT, createDaycareDTO], controller.createVisit);

router
  .route('/')
  .post([validJWT, createVisitDTO], controller.createVisit)
  .get([validJWT, validPagination, searchVisitDTO], controller.listVisit);

router
  .route('/:id')
  .get([validJWT, validId], controller.getVisit)
  .delete([validJWT, validId], controller.cancelVisit)
  .patch([validJWT, validId, updateVisitDTO], controller.updateVisit)
  .put([validJWT, validId, updateVisitDTO], controller.updateVisit);

router.route('/:id/status/treatment').patch([validId], controller.setStatusTreatment);
router.route('/:id/status/waiting-result').patch([validId], controller.setStatusWaitResult);
router.route('/:id/status/reported').patch([validId], controller.setStatusReported);
router.route('/:id/status/doctor-discharge').patch([validId], controller.dischargeDoctor);
router.route('/:id/status/paid').patch([validId], controller.dischargeFinance);
