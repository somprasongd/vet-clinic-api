import express from 'express';
import * as controller from './config.controller';
import { validId, validPagination, validParamId } from '../../middlewares/validation.middleware';
import {
  createConfigDTO,
  createItemDrugDTO,
  createItemDTO,
  createItemLabDTO,
  searchItemDTO,
  updateConfigDTO,
  updateItemDrugDTO,
  updateItemDTO,
  updateItemLabDTO,
  updateSiteDTO,
} from './config.dto';
import { validJWT } from '../../middlewares/auth-validation.middleware';

export const router = express.Router();

router
  .route('/site')
  .get([validJWT], controller.getSiteInfo)
  .put([validJWT, updateSiteDTO], controller.updateSiteInfo);

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

router
  .route('/dx')
  .post([validJWT, createConfigDTO], controller.createBaseDX)
  .get([validJWT, validPagination], controller.findAllBaseDX);

router
  .route('/dx/:id')
  .get([validJWT, validId], controller.findBaseDXById)
  .delete([validJWT, validId], controller.removeBaseDX)
  .patch([validJWT, validId, updateConfigDTO], controller.updateBaseDX)
  .put([validJWT, validId, updateConfigDTO], controller.updateBaseDX);

router
  .route('/items')
  .post([validJWT, createItemDTO], controller.createItem)
  .get([validJWT, validPagination, searchItemDTO], controller.findAllItem);

router
  .route('/items/:id')
  .get([validJWT, validId], controller.findItemById)
  .delete([validJWT, validId], controller.removeItem)
  .patch([validJWT, validId, updateItemDTO], controller.updateItem)
  .put([validJWT, validId, updateItemDTO], controller.updateItem);

router
  .route('/items/:itemId/drugs')
  .post([validJWT, validParamId('itemId'), createItemDrugDTO], controller.createItemDrug)
  .get([validJWT, validParamId('itemId')], controller.findItemDrugByItemId)
  .patch([validJWT, validParamId('itemId'), updateItemDrugDTO], controller.updateItemDrug)
  .put([validJWT, validParamId('itemId'), updateItemDrugDTO], controller.updateItemDrug);

router
  .route('/items/:itemId/labs')
  .post([validJWT, validParamId('itemId'), createItemLabDTO], controller.createItemLab)
  .get([validJWT, validParamId('itemId')], controller.findItemLabByItemId)
  .patch([validJWT, validParamId('itemId'), updateItemLabDTO], controller.updateItemLab)
  .put([validJWT, validParamId('itemId'), updateItemLabDTO], controller.updateItemLab);

router.route('/items/:itemId/set').get([validJWT, validParamId('itemId')], controller.listItemSetByItemId);

router
  .route('/items/:itemId/set/:itemSubsetId')
  .post([validJWT, validParamId('itemId'), validParamId('itemSubsetId')], controller.createItemSet)
  .delete([validJWT, validParamId('itemId'), validParamId('itemSubsetId')], controller.removeItemSet);
