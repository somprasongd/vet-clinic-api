import express from 'express';
import * as controller from './pets.controller';
import { validId, validPagination, validParamId } from '../../middlewares/validation.middleware';
import { createPetDTO, searchPetDTO, updatePetDTO } from './pets.dto';
import { validJWT } from '../../middlewares/auth-validation.middleware';
import { resizeAvatar, uploadAvatar } from '../../middlewares/upload.middleware';
import { createUploadImageDTO } from '../upload/upload.dto';
import * as uploadMiddleware from '../upload/upload.middleware';

export const router = express.Router();
router
  .route('/')
  .post([validJWT, createPetDTO], controller.createPet)
  .get([validJWT, validPagination, searchPetDTO], controller.listPet);

router
  .route('/:id')
  .get([validJWT, validId], controller.getPet)
  .delete([validJWT, validId], controller.removePet)
  .patch([validJWT, validId, updatePetDTO], controller.updatePet)
  .put([validJWT, validId, updatePetDTO], controller.updatePet);

router
  .route('/:id/avatar')
  .post(
    [validJWT, validId, uploadAvatar, resizeAvatar, createUploadImageDTO, uploadMiddleware.createUpload],
    controller.createPetAvatar
  )
  .get([validId], controller.getPetAvatar)
  .delete([validJWT, validId], controller.deletePetAvatar);

router.route('/:id/owner').get([validId], controller.getPetOwner);
router.route('/:id/owner/:newOwnerId').patch([validId, validParamId('newOwnerId')], controller.changeOwner);
