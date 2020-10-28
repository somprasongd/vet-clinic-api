import express from 'express';
import * as controller from './pos.controller';
import { validId, validPagination } from '../../middlewares/validation.middleware';
import { createPOSDTO, createReceiptDTO, searchPOSDTO, updatePOSDTO } from './pos.dto';
import { validJWT } from '../../middlewares/auth-validation.middleware';

export const router = express.Router();

router
  .route('/')
  .post([validJWT, createPOSDTO], controller.createPOS)
  .get([validJWT, validPagination, searchPOSDTO], controller.listPOS);

router
  .route('/:id')
  .get([validJWT, validId], controller.getPOS)
  .delete([validJWT, validId], controller.removePOS)
  .patch([validJWT, validId, updatePOSDTO], controller.updatePOS) // partial update
  .put([validJWT, validId, updatePOSDTO], controller.updatePOS);

// router
//   .route('/:id/receipt')
//   .post([validJWT, validId, createReceiptDTO], controller.createReceipt)
//   .delete([validJWT, validId, createReceiptDTO], controller.cancelReceipt);
