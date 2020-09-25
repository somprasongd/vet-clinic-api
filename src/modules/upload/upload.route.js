import express from 'express';
import { uploadAvatar, resizeAvatar, uploadImage, resizeImage, uploadFile } from '../../middlewares/upload.middleware';
import * as controller from './upload.controller';

import { validId } from '../../middlewares/validation.middleware';
import { validJWT } from '../../middlewares/auth-validation.middleware';
import { createUploadFileDTO, createUploadImageDTO } from './upload.dto';

export const router = express.Router();

router.route('/avatar').post([validJWT, uploadAvatar, resizeAvatar, createUploadImageDTO], controller.createUpload);

router.route('/image').post([validJWT, uploadImage, resizeImage, createUploadImageDTO], controller.createUpload);

router.route('/file').post([validJWT, uploadFile, createUploadFileDTO], controller.createUpload);

router
  .route('/:id')
  .get([validJWT, validId], controller.findOne)
  .delete([validJWT, validId], controller.remove);
