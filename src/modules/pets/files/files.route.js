import express from 'express';
import * as controller from './files.controller';
import { validId } from '../../../middlewares/validation.middleware';
import { validJWT } from '../../../middlewares/auth-validation.middleware';
import { uploadFile } from '../../../middlewares/upload.middleware';
import { createUploadFileDTO } from '../../upload/upload.dto';
import * as uploadMiddleware from '../../upload/upload.middleware';
import { createPetFileDTO, searchPetFileDTO, updatePetFileDTO } from './files.dto';

export const router = express.Router();

router
  .route('/')
  .post(
    [validJWT, uploadFile, createUploadFileDTO, uploadMiddleware.createUpload, createPetFileDTO],
    controller.createPetFile
  )
  .get([validJWT, searchPetFileDTO], controller.getPetFiles);

router
  .route('/:id')
  .get([validJWT, validId], controller.getPetFile)
  .delete([validJWT, validId], controller.deletePetFile)
  .patch([validJWT, validId, updatePetFileDTO], controller.updatePetFile)
  .put([validJWT, validId, updatePetFileDTO], controller.updatePetFile);
