import express from 'express';
import * as controller from './files.controller';
import { validId } from '../../../middlewares/validation.middleware';
import { validJWT } from '../../../middlewares/auth-validation.middleware';
import { uploadFile } from '../../../middlewares/upload.middleware';
import { createUploadFileDTO } from '../../upload/upload.dto';
import * as uploadMiddleware from '../../upload/upload.middleware';
import { createVisitFileDTO, searchVisitFileDTO, updateVisitFileDTO } from './files.dto';

export const router = express.Router();

router
  .route('/')
  .post(
    [validJWT, uploadFile, createUploadFileDTO, uploadMiddleware.createUpload, createVisitFileDTO],
    controller.createVisitFile
  )
  .get([validJWT, searchVisitFileDTO], controller.getVisitFiles);

router
  .route('/:id')
  .get([validJWT, validId], controller.getVisitFile)
  .delete([validJWT, validId], controller.deleteVisitFile)
  .patch([validJWT, validId, updateVisitFileDTO], controller.updateVisitFile)
  .put([validJWT, validId, updateVisitFileDTO], controller.updateVisitFile);
