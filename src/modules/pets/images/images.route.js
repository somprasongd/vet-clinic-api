import express from 'express';
import * as controller from './images.controller';
import { validId } from '../../../middlewares/validation.middleware';
import { validJWT } from '../../../middlewares/auth-validation.middleware';
import { resizeImage, uploadImage } from '../../../middlewares/upload.middleware';
import { createUploadImageDTO } from '../../upload/upload.dto';
import * as uploadMiddleware from '../../upload/upload.middleware';
import { createPetImageDTO, searchPetImageDTO, updatePetImageDTO } from './images.dto';

export const router = express.Router();

router
  .route('/')
  .post(
    [validJWT, uploadImage, resizeImage, createUploadImageDTO, uploadMiddleware.createUpload, createPetImageDTO],
    controller.createPetImage
  )
  .get([validJWT, searchPetImageDTO], controller.getPetImages);

router
  .route('/:id')
  .get([validJWT, validId], controller.getPetImage)
  .delete([validJWT, validId], controller.deletePetImage)
  .patch([validJWT, validId, updatePetImageDTO], controller.updatePetImage)
  .put([validJWT, validId, updatePetImageDTO], controller.updatePetImage);
