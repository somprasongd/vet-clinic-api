import express from 'express';
import { uploadAvatar, resizeAvatar, uploadImage, resizeImage, uploadFile } from '../../middlewares/upload.middleware';
import * as controller from './upload.controller';
import * as middleware from './upload.middleware';
import { validId, validParamId } from '../../middlewares/validation.middleware';
import { validJWT } from '../../middlewares/auth-validation.middleware';
import { createUploadFileDTO, createUploadImageDTO } from './upload.dto';

export const router = express.Router();

router
  .route('/avatar')
  .post(
    [validJWT, uploadAvatar, resizeAvatar, createUploadImageDTO, middleware.createUpload],
    controller.sendUploadRespone
  );

router
  .route('/image')
  .post(
    [validJWT, uploadImage, resizeImage, createUploadImageDTO, middleware.createUpload],
    controller.sendUploadRespone
  );

router
  .route('/file')
  .post([validJWT, uploadFile, createUploadFileDTO, middleware.createUpload], controller.sendUploadRespone);

router.route('/file/:id').get([validId], controller.getFile);

router
  .route('/:uploadId')
  .get([validJWT, validParamId('uploadId')], controller.getUpload)
  .delete([validJWT, validParamId('uploadId')], controller.removeUpload);
