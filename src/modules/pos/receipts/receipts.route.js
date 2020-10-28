import express from 'express';
import * as controller from './receipts.controller';
import { createReceiptDTO, getReceiptDTO } from './receipts.dto';
import { validJWT } from '../../../middlewares/auth-validation.middleware';

export const router = express.Router();

router
  .route('/')
  .post([validJWT, createReceiptDTO], controller.createReceipt)
  .get([validJWT, getReceiptDTO], controller.getReceipt);
