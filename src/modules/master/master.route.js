import express from 'express';
import * as controller from './master.controller';
import { validId, validPagination } from '../../middlewares/validation.middleware';
import { validJWT } from '../../middlewares/auth-validation.middleware';

export const router = express.Router();

// read only

router.route('/appoint-statues').get([validJWT, validPagination], controller.findAllAppointStatus);

router.route('/appoint-statues/:id').get([validJWT, validId], controller.findAppointStatusById);

router.route('/appoint-types').get([validJWT, validPagination], controller.findAllAppointType);

router.route('/appoint-types/:id').get([validJWT, validId], controller.findAppointTypeById);

router.route('/item-groups').get([validJWT, validPagination], controller.findAllItemGroup);

router.route('/item-groups/:id').get([validJWT, validId], controller.findItemGroupById);

router.route('/item-lab-groups').get([validJWT, validPagination], controller.findAllItemLabGroup);

router.route('/item-lab-groups/:id').get([validJWT, validId], controller.findItemLabGroupById);

router.route('/media-types').get([validJWT, validPagination], controller.findAllMediaType);

router.route('/media-types/:id').get([validJWT, validId], controller.findMediaTypeById);

router.route('/payment-types').get([validJWT, validPagination], controller.findAllPaymentType);

router.route('/payment-types/:id').get([validJWT, validId], controller.findPaymentTypeById);

router.route('/credit-card-issuers').get([validJWT, validPagination], controller.findAllCreditCardIssuer);

router.route('/credit-card-issuers/:id').get([validJWT, validId], controller.findCreditCardIssuerById);

router.route('/credit-card-fees-methods').get([validJWT, validPagination], controller.findAllCreditCardFeesMethod);

router.route('/credit-card-fees-methods/:id').get([validJWT, validId], controller.findCreditCardFeesMethodById);

router.route('/prefixes').get([validJWT, validPagination], controller.findAllPrefix);

router.route('/prefixes/:id').get([validJWT, validId], controller.findPrefixById);

router.route('/pet-genders').get([validJWT, validPagination], controller.findAllGender);

router.route('/pet-genders/:id').get([validJWT, validId], controller.findGenderById);

router.route('/pet-types').get([validJWT, validPagination], controller.findAllType);

router.route('/pet-types/:id').get([validJWT, validId], controller.findTypeById);

router.route('/user-roles').get([validJWT, validPagination], controller.findAllUserRole);

router.route('/user-roles/:id').get([validJWT, validId], controller.findUserRoleById);

router.route('/visit-causes').get([validJWT, validPagination], controller.findAllVisitCause);

router.route('/visit-causes/:id').get([validJWT, validId], controller.findVisitCauseById);

router.route('/visit-priorities').get([validJWT, validPagination], controller.findAllVisitPriority);

router.route('/visit-priorities/:id').get([validJWT, validId], controller.findVisitPriorityById);

router.route('/visit-statues').get([validJWT, validPagination], controller.findAllVisitStatus);

router.route('/visit-statues/:id').get([validJWT, validId], controller.findVisitStatusById);

router.route('/visit-types').get([validJWT, validPagination], controller.findAllVisitType);

router.route('/visit-types/:id').get([validJWT, validId], controller.findVisitTypeById);
