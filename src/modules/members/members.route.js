import express from 'express';
import * as controller from './members.controller';
import { validId, validPagination } from '../../middlewares/validation.middleware';
import { createMemberDTO, searchMemberDTO, updateMemberDTO } from './members.dto';
import { validJWT } from '../../middlewares/auth-validation.middleware';
import { resizeAvatar, uploadAvatar } from '../../middlewares/upload.middleware';
import { createUploadImageDTO } from '../upload/upload.dto';
import * as uploadMiddleware from '../upload/upload.middleware';

export const router = express.Router();
router
  .route('/')
  .post([validJWT, createMemberDTO], controller.createMember)
  .get([validJWT, validPagination, searchMemberDTO], controller.listMember);

router
  .route('/:id')
  .get([validJWT, validId], controller.getMember)
  .delete([validJWT, validId], controller.removeMember)
  .patch([validJWT, validId, updateMemberDTO], controller.updateMember)
  .put([validJWT, validId, updateMemberDTO], controller.updateMember);

router
  .route('/:id/avatar')
  .post(
    [validJWT, validId, uploadAvatar, resizeAvatar, createUploadImageDTO, uploadMiddleware.createUpload],
    controller.createMemberAvatar
  )
  .get([validId], controller.getMemberAvatar)
  .delete([validJWT, validId], controller.deleteMemberAvatar);

router.route('/:id/pets').get([validId], controller.listPets);
