import express from 'express';
import * as controller from './images.controller';
import { validId } from '../../../middlewares/validation.middleware';
import { validJWT } from '../../../middlewares/auth-validation.middleware';
import { resizeImage, uploadImage } from '../../../middlewares/upload.middleware';
import { createUploadImageDTO } from '../../upload/upload.dto';
import * as uploadMiddleware from '../../upload/upload.middleware';
import { createVisitImageDTO, searchVisitImageDTO, updateVisitImageDTO } from './images.dto';

export const router = express.Router();

router
  .route('/')
  .post(
    [validJWT, uploadImage, resizeImage, createUploadImageDTO, uploadMiddleware.createUpload, createVisitImageDTO],
    controller.createVisitImage
  )
  .get([validJWT, searchVisitImageDTO], controller.getVisitImages);

router
  .route('/:id')
  .get([validJWT, validId], controller.getVisitImage)
  .delete([validJWT, validId], controller.deleteVisitImage)
  .patch([validJWT, validId, updateVisitImageDTO], controller.updateVisitImage)
  .put([validJWT, validId, updateVisitImageDTO], controller.updateVisitImage);
