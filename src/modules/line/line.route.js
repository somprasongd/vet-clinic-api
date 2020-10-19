import express from 'express';
import * as controller from './line.controller';
import { validJWT } from '../../middlewares/auth-validation.middleware';
import { sendMessageDTO } from './line.dto';

export const router = express.Router();

router.route('/notify/:memberId/connect').get(controller.connectLineNotify);

router.route('/notify/callback').get(controller.callbackLineNotify);

router
  .route('/notify/:memberId')
  .post([validJWT, sendMessageDTO], controller.sendLineNotify)
  .delete(validJWT, controller.revokeAllLineNotifyTokens);
