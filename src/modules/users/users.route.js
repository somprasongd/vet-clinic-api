import express from 'express';
import * as controller from './users.controller';
import * as uploadMiddleware from '../upload/upload.middleware';
import { onlyAdmin } from '../../middlewares/auth-policy.middleware';
import { validId, validPagination } from '../../middlewares/validation.middleware';
import { createUserDTO, searchUserDTO, updateUserDTO, updateUserPasswordDTO, updateProfileDTO } from './users.dto';
import { validJWT } from '../../middlewares/auth-validation.middleware';
import { resizeAvatar, uploadAvatar } from '../../middlewares/upload.middleware';
import { createUploadImageDTO } from '../upload/upload.dto';

export const router = express.Router();

router
  .route('/')
  .post([validJWT, createUserDTO], controller.create)
  .get([validJWT, validPagination, searchUserDTO], controller.findAll);

router
  .route('/me')
  .get([validJWT], controller.findMe)
  .patch([validJWT, updateProfileDTO], controller.update)
  .put([validJWT, updateProfileDTO], controller.update);

router
  .route('/me/avatar')
  .post(
    [validJWT, uploadAvatar, resizeAvatar, createUploadImageDTO, uploadMiddleware.createUpload],
    controller.createUserAvatar
  )
  .get([validJWT], controller.getUserAvatar)
  .delete([validJWT], controller.deleteUserAvatar);

router
  .route('/:id')
  .get([validJWT, onlyAdmin, validId], controller.findById)
  .delete([validJWT, onlyAdmin, validId], controller.remove)
  // .patch([validJWT, onlyAdmin, validId, updateUserDTO], controller.update)
  .put([validJWT, onlyAdmin, validId, updateUserDTO], controller.update);

router
  .route('/:id/avatar')
  .post(
    [validJWT, onlyAdmin, validId, uploadAvatar, resizeAvatar, createUploadImageDTO, uploadMiddleware.createUpload],
    controller.createUserAvatar
  )
  .get([validId], controller.getUserAvatar)
  .delete([validJWT, validId], controller.deleteUserAvatar);

router.route('/:id/password').patch([validJWT, onlyAdmin, validId, updateUserPasswordDTO], controller.updatePassword);
