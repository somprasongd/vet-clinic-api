import express from 'express';
import * as controller from './orders.controller';
import { validId, validPagination } from '../../middlewares/validation.middleware';
import { createOrderDTO, searchOrderDTO, updateOrderDTO } from './orders.dto';
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
