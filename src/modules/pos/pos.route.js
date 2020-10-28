import express from 'express';
import * as controller from './pos.controller';
import { validId, validPagination } from '../../middlewares/validation.middleware';
import { cancelPOSDTO, createPOSDTO, searchPOSDTO, updatePOSDTO } from './pos.dto';
import { validJWT } from '../../middlewares/auth-validation.middleware';
import { router as receiptRouter } from './receipts/receipts.route';

export const router = express.Router();

router
  .route('/')
  .post([validJWT, createPOSDTO], controller.createPOS)
  .get([validJWT, validPagination, searchPOSDTO], controller.listPOS);

router
  .route('/:id')
  .get([validJWT, validId], controller.getPOS)
  .delete([validJWT, validId, setPOS, cancelPOSDTO], controller.removePOS)
  .patch([validJWT, validId, updatePOSDTO], controller.updatePOSState) // partial update
  .put([validJWT, validId, updatePOSDTO], controller.updatePOSState);

router.use('/:id/receipts', validId, setPOS, receiptRouter);

async function setPOS(req, res, next) {
  const { id } = req.params;
  try {
    const pos = await controller.getPOSById(id);
    req.pos = pos;
    next();
  } catch (error) {
    next(error);
  }
}
