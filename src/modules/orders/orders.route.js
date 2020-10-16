import express from 'express';
import * as controller from './orders.controller';
import { validId, validPagination } from '../../middlewares/validation.middleware';
import { createOrderDTO, searchOrderDTO, updateOrderDrugDTO, updateOrderDTO } from './orders.dto';
import { validJWT } from '../../middlewares/auth-validation.middleware';

export const router = express.Router();

router
  .route('/')
  .post([validJWT, createOrderDTO], controller.createOrder)
  .get([validJWT, validPagination, searchOrderDTO], controller.listOrder);

router
  .route('/:id')
  .get([validJWT, validId], controller.getOrder)
  .delete([validJWT, validId], controller.removeOrder)
  .patch([validJWT, validId, updateOrderDTO], controller.updateOrder) // partial update
  .put([validJWT, validId, updateOrderDTO], controller.updateOrder);

router
  .route('/:id/drug')
  .get([validJWT, validId], controller.getOrderDrug)
  .patch([validJWT, validId, updateOrderDrugDTO], controller.updateOrderDrug) // partial update
  .put([validJWT, validId, updateOrderDrugDTO], controller.updateOrderDrug);
