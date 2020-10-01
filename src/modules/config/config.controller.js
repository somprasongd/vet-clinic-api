import * as service from './config.service';
import { NotFoundExceptions } from '../../common/helpers/exceptions';
import paginate from '../../common/helpers/res-with-paginate';

export const getSiteInfo = async (req, res) => {
  const mediaUrl = `${req.getHost()}/`;

  const result = await service.getSite(mediaUrl);

  res.json(result);
};

export const updateSiteInfo = async (req, res) => {
  const { dto } = req;

  const updatedObj = await service.updateSite(dto);

  res.json(updatedObj);
};

export const createBaseCC = async (req, res) => {
  const { dto } = req;

  const createdObj = await service.createBaseCC(dto);

  res.json(createdObj);
};

export const findAllBaseCC = async (req, res) => {
  const { limit, offset, page, search } = req.query;

  const { datas, counts } = await service.findAllBaseCC(search, limit, offset);

  const results = paginate(datas, counts, limit, offset, page);
  res.json(results);
};

export const findBaseCCById = async (req, res) => {
  const { id } = req.params;
  const result = await service.findBaseCCById(id);

  res.json(result);
};

export const removeBaseCC = async (req, res) => {
  const { id } = req.params;
  await service.removeBaseCC(id);

  res.status(204).end();
};

export const updateBaseCC = async (req, res) => {
  const { id } = req.params;
  const { dto } = req;

  const updatedObj = await service.updateBaseCC(id, dto);

  res.json(updatedObj);
};

export const createBaseHT = async (req, res) => {
  const { dto } = req;

  const createdObj = await service.createBaseHT(dto);

  res.json(createdObj);
};

export const findAllBaseHT = async (req, res) => {
  const { limit, offset, page, search } = req.query;

  const { datas, counts } = await service.findAllBaseHT(search, limit, offset);

  const results = paginate(datas, counts, limit, offset, page);
  res.json(results);
};

export const findBaseHTById = async (req, res) => {
  const { id } = req.params;
  const result = await service.findBaseHTById(id);

  res.json(result);
};

export const removeBaseHT = async (req, res) => {
  const { id } = req.params;
  await service.removeBaseHT(id);

  res.status(204).end();
};

export const updateBaseHT = async (req, res) => {
  const { id } = req.params;
  const { dto } = req;

  const updatedObj = await service.updateBaseHT(id, dto);

  res.json(updatedObj);
};

export const createBasePE = async (req, res) => {
  const { dto } = req;

  const createdObj = await service.createBasePE(dto);

  res.json(createdObj);
};

export const findAllBasePE = async (req, res) => {
  const { limit, offset, page, search } = req.query;

  const { datas, counts } = await service.findAllBasePE(search, limit, offset);

  const results = paginate(datas, counts, limit, offset, page);
  res.json(results);
};

export const findBasePEById = async (req, res) => {
  const { id } = req.params;
  const result = await service.findBasePEById(id);

  res.json(result);
};

export const removeBasePE = async (req, res) => {
  const { id } = req.params;
  await service.removeBasePE(id);

  res.status(204).end();
};

export const updateBasePE = async (req, res) => {
  const { id } = req.params;
  const { dto } = req;

  const updatedObj = await service.updateBasePE(id, dto);

  res.json(updatedObj);
};

export const createBaseDX = async (req, res) => {
  const { dto } = req;

  const createdObj = await service.createBaseDX(dto);

  res.json(createdObj);
};

export const findAllBaseDX = async (req, res) => {
  const { limit, offset, page, search } = req.query;

  const { datas, counts } = await service.findAllBaseDX(search, limit, offset);

  const results = paginate(datas, counts, limit, offset, page);
  res.json(results);
};

export const findBaseDXById = async (req, res) => {
  const { id } = req.params;
  const result = await service.findBaseDXById(id);

  res.json(result);
};

export const removeBaseDX = async (req, res) => {
  const { id } = req.params;
  await service.removeBaseDX(id);

  res.status(204).end();
};

export const updateBaseDX = async (req, res) => {
  const { id } = req.params;
  const { dto } = req;

  const updatedObj = await service.updateBaseDX(id, dto);

  res.json(updatedObj);
};

export const createItem = async (req, res) => {
  const { dto } = req;

  const createdObj = await service.createItem(dto);

  res.json(createdObj);
};

export const findAllItem = async (req, res) => {
  const { limit, offset, page } = req.query;
  const { dto } = req;

  const { datas, counts } = await service.findAllItem(dto, { limit, offset });

  const results = paginate(datas, counts, limit, offset, page);
  res.json(results);
};

export const findItemById = async (req, res) => {
  const { id } = req.params;
  const result = await service.findItemById(id);

  res.json(result);
};

export const removeItem = async (req, res) => {
  await service.removeItem(req.params.id);

  res.status(204).end();
};

export const updateItem = async (req, res) => {
  const { dto } = req;

  const updatedObj = await service.updateItem(req.params.id, dto);

  res.json(updatedObj);
};

export const createItemDrug = async (req, res) => {
  const { dto } = req;

  const createdObj = await service.createItemDrug(dto);

  res.json(createdObj);
};

export const findItemDrugByItemId = async (req, res) => {
  const { itemId } = req.params;

  const result = await service.findItemDrugByItemId(itemId);

  if (!result) throw new NotFoundExceptions('The item drug with the given item id was not found.');

  res.json(result);
};

export const updateItemDrug = async (req, res) => {
  const { dto } = req;

  const updatedObj = await service.updateItemDrug(req.params.itemId, dto);

  if (!updatedObj) throw new NotFoundExceptions('The item drug with the given item id was not found.');

  res.json(updatedObj);
};

export const createItemLab = async (req, res) => {
  const { dto } = req;

  const createdObj = await service.createItemLab(dto);

  res.json(createdObj);
};

export const findItemLabByItemId = async (req, res) => {
  const { itemId } = req.params;

  const result = await service.findItemLabByItemId(itemId);

  if (!result) throw new NotFoundExceptions('The item drug with the given item id was not found.');

  res.json(result);
};

export const updateItemLab = async (req, res) => {
  const { dto } = req;

  const updatedObj = await service.updateItemLab(req.params.itemId, dto);

  if (!updatedObj) throw new NotFoundExceptions('The item drug with the given item id was not found.');

  res.json(updatedObj);
};

export const createItemSet = async (req, res) => {
  const { itemId, itemSubsetId } = req.params;

  const createdObj = await service.createItemSet({
    itemId: +itemId,
    itemSubsetId: +itemSubsetId,
  });

  res.json(createdObj);
};

export const listItemSetByItemId = async (req, res) => {
  const { itemId } = req.params;

  const result = await service.listItemSetByItemId(itemId);

  res.json(result);
};

export const removeItemSet = async (req, res) => {
  const { itemSubsetId } = req.params;
  await service.removeItemSet(itemSubsetId);

  res.status(204).end();
};
