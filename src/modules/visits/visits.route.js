import express from 'express';
import * as controller from './visits.controller';
import { validId, validPagination, validParamId } from '../../middlewares/validation.middleware';
import { createDaycareDTO, createVisitDTO, searchVisitDTO, takeHomeDTO, updateVisitDTO } from './visits.dto';
import { validJWT } from '../../middlewares/auth-validation.middleware';
import { onlyDoctor } from '../../middlewares/auth-policy.middleware';
import { router as vsRouter } from './vitalsigns/vitalsign.route';
import { router as resultRouter } from './results/results.route';
import { router as imageRouter } from './images/images.route';
import { router as fileRouter } from './files/files.route';
import { router as orderRouter } from '../orders/orders.route';

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

router.route('/:id/status/cancel').patch([validJWT, validId], controller.setStatusCancel);
router.route('/:id/status/treatment').patch([validJWT, validId, onlyDoctor], controller.setStatusTreatment);
router.route('/:id/status/waiting-result').patch([validJWT, validId], controller.setStatusWaitResult);
router.route('/:id/status/reported').patch([validJWT, validId], controller.setStatusReported);
router.route('/:id/status/doctor-discharge').patch([validJWT, validId], controller.dischargeDoctor);
router.route('/:id/status/discharge').patch([validJWT, validId], controller.dischargeFinance);
router.route('/:id/status/take-home').patch([validJWT, validId, takeHomeDTO], controller.takeHome);

router.use('/:id/vs', validId, setVisit, vsRouter);

router.use('/:id/orders', validId, setVisit, orderRouter);
router.use('/:id/results', validId, setVisit, resultRouter);

router.use('/:id/images', validId, setVisit, imageRouter);
router.use('/:id/files', validId, setVisit, fileRouter);

async function setVisit(req, res, next) {
  const { id } = req.params;
  try {
    const visit = await controller.getVisitById(id);
    req.visit = visit;
    next();
  } catch (error) {
    next(error);
  }
}
