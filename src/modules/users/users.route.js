import express from 'express';
import * as controller from './users.controller';
import { onlyAdmin } from '../../middlewares/auth-policy.middleware';
import { validId, validPagination } from '../../middlewares/validation.middleware';
import { createUserDTO, searchUserDTO, updateUserAvatarDTO, updateUserDTO, updateUserPasswordDTO } from './users.dto';
import { validJWT } from '../../middlewares/auth-validation.middleware';

export const router = express.Router();

router
  .route('/')
  .post([validJWT, createUserDTO], controller.create)
  .get([validJWT, validPagination, searchUserDTO], controller.findAll);

router.get('/me', [validJWT], controller.findMe);

router
  .route('/:id')
  .get([validJWT, onlyAdmin, validId], controller.findById)
  // .delete([validJWT, onlyAdmin, validId], controller.remove)
  // .patch([validJWT, onlyAdmin, validId, updateUserDTO], controller.update)
  .put([validJWT, onlyAdmin, validId, updateUserDTO], controller.update);

router.route('/:id/avatar').patch([validJWT, onlyAdmin, validId, updateUserAvatarDTO], controller.updateAvatar);

router.route('/:id/password').patch([validJWT, onlyAdmin, validId, updateUserPasswordDTO], controller.updatePassword);
