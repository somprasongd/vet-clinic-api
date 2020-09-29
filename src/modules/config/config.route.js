import express from 'express';
import * as controller from './config.controller';
import { validId, validPagination } from '../../middlewares/validation.middleware';
import { createConfigDTO, updateConfigDTO } from './config.dto';
import { validJWT } from '../../middlewares/auth-validation.middleware';

export const router = express.Router();

router
  .route('/cc')
  .post([validJWT, createConfigDTO], controller.createBaseCC)
  .get([validJWT, validPagination], controller.findAllBaseCC);

router
  .route('/cc/:id')
  .get([validJWT, validId], controller.findBaseCCById)
  .delete([validJWT, validId], controller.removeBaseCC)
  .patch([validJWT, validId, updateConfigDTO], controller.updateBaseCC)
  .put([validJWT, validId, updateConfigDTO], controller.updateBaseCC);

router
  .route('/ex')
  .post([validJWT, createConfigDTO], controller.createBaseEX)
  .get([validJWT, validPagination], controller.findAllBaseEX);

router
  .route('/ex/:id')
  .get([validJWT, validId], controller.findBaseEXById)
  .delete([validJWT, validId], controller.removeBaseEX)
  .patch([validJWT, validId, updateConfigDTO], controller.updateBaseEX)
  .put([validJWT, validId, updateConfigDTO], controller.updateBaseEX);

router
  .route('/ht')
  .post([validJWT, createConfigDTO], controller.createBaseHT)
  .get([validJWT, validPagination], controller.findAllBaseHT);

router
  .route('/ht/:id')
  .get([validJWT, validId], controller.findBaseHTById)
  .delete([validJWT, validId], controller.removeBaseHT)
  .patch([validJWT, validId, updateConfigDTO], controller.updateBaseHT)
  .put([validJWT, validId, updateConfigDTO], controller.updateBaseHT);

router
  .route('/pe')
  .post([validJWT, createConfigDTO], controller.createBasePE)
  .get([validJWT, validPagination], controller.findAllBasePE);

router
  .route('/pe/:id')
  .get([validJWT, validId], controller.findBasePEById)
  .delete([validJWT, validId], controller.removeBasePE)
  .patch([validJWT, validId, updateConfigDTO], controller.updateBasePE)
  .put([validJWT, validId, updateConfigDTO], controller.updateBasePE);

// router
//   .route('/items')
//   .post([validJWT, createConfigDTO], controller.createItem)
//   .get([validJWT, validPagination], controller.findAllItem);

// router
//   .route('/items/:id')
//   .get([validJWT, validId], controller.findItemById)
//   .delete([validJWT, validId], controller.removeItem)
//   .patch([validJWT, validId, updateConfigDTO], controller.updateItem)
//   .put([validJWT, validId, updateConfigDTO], controller.updateItem);

// router
//   .route('/item-drugs')
//   .post([validJWT, createConfigDTO], controller.createItemDrug)
//   .get([validJWT, validPagination], controller.findAllItemDrug);

// router
//   .route('/item-drugs/:id')
//   .get([validJWT, validId], controller.findItemDrugById)
//   .delete([validJWT, validId], controller.removeItemDrug)
//   .patch([validJWT, validId, updateConfigDTO], controller.updateItemDrug)
//   .put([validJWT, validId, updateConfigDTO], controller.updateItemDrug);

// router
//   .route('/item-labs')
//   .post([validJWT, createConfigDTO], controller.createItemLab)
//   .get([validJWT, validPagination], controller.findAllItemLab);

// router
//   .route('/item-labs/:id')
//   .get([validJWT, validId], controller.findItemLabById)
//   .delete([validJWT, validId], controller.removeItemLab)
//   .patch([validJWT, validId, updateConfigDTO], controller.updateItemLab)
//   .put([validJWT, validId, updateConfigDTO], controller.updateItemLab);

// router
//   .route('/item-lab-tests')
//   .post([validJWT, createConfigDTO], controller.createItemLabTest)
//   .get([validJWT, validPagination], controller.findAllItemLabTest);

// router
//   .route('/item-lab-tests/:id')
//   .get([validJWT, validId], controller.findItemLabTestById)
//   .delete([validJWT, validId], controller.removeItemLabTest)
//   .patch([validJWT, validId, updateConfigDTO], controller.updateItemLabTest)
//   .put([validJWT, validId, updateConfigDTO], controller.updateItemLabTest);

// router
//   .route('/item-sets')
//   .post([validJWT, createConfigDTO], controller.createItemSet)
//   .get([validJWT, validPagination], controller.findAllItemSet);

// router
//   .route('/item-sets/:id')
//   .get([validJWT, validId], controller.findItemSetById)
//   .delete([validJWT, validId], controller.removeItemSet)
//   .patch([validJWT, validId, updateConfigDTO], controller.updateItemSet)
//   .put([validJWT, validId, updateConfigDTO], controller.updateItemSet);
