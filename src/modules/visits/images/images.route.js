import express from 'express';
import * as controller from './images.controller';
import { validId, validParamId } from '../../../middlewares/validation.middleware';
import { validJWT } from '../../../middlewares/auth-validation.middleware';
import { resizeImage, uploadImage } from '../../../middlewares/upload.middleware';
import { createUploadImageDTO } from '../../upload/upload.dto';
import * as uploadMiddleware from '../../upload/upload.middleware';

export const router = express.Router();

function setParams(req, res, next) {
  req.params.visitId = req.visit.id;
  next();
}

router
  .route('/')
  .post(
    [validJWT, uploadImage, resizeImage, createUploadImageDTO, uploadMiddleware.createUpload],
    controller.createVisitImage
  )
  .get([validParamId('visitId')], controller.getUserAvatar)
  .delete([validJWT, validParamId('visitId')], controller.deleteUserAvatar);

router
  .route('/:id')
  .get([validJWT, setParams, validId], controller.getVitalsign)
  .delete([validJWT, setParams, validId], controller.cancelVitalsign)
  .patch([validJWT, setParams, validId, updateVitalsignDTO], controller.updateVitalsign)
  .put([validJWT, setParams, validId, updateVitalsignDTO], controller.updateVitalsign);
