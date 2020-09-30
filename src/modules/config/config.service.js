import { InvalidExceptions, NotFoundExceptions } from '../../common/helpers/exceptions';
import connection from '../../database';

const { db } = connection;

function findAll(tablename, search, limit, offset) {
  return db.task(async t => {
    const p1 = t.base.findAll(tablename, search, limit, offset);
    const p2 = t.base.findAllCount(tablename, search);

    const [datas, counts] = await Promise.all([p1, p2]);
    return { datas, counts };
  });
}

async function findById(tablename, id) {
  const result = await db.base.findById(tablename, id);

  if (!result)
    throw new NotFoundExceptions(
      `The ${tablename
        .split('_')
        .slice(1)
        .join(' ')} with the given ID was not found.`
    );

  return result;
}

async function checkCodeExisted(tablename, code, id = null) {
  const objExist = await db.base.find(tablename, { code });

  if (objExist.length > 0 && (id === null || objExist[0].id !== +id)) {
    throw new InvalidExceptions(
      `The ${tablename
        .split('_')
        .slice(1)
        .join(' ')} with the given CODE was existed.`
    );
  }
}

async function removeById(tablename, id) {
  const deletedRow = await db.base.remove(tablename, id);

  if (deletedRow === 0)
    throw new NotFoundExceptions(
      `The ${tablename
        .split('_')
        .slice(1)
        .join(' ')} with the given ID was not found.`
    );
}

async function create(tableName, { code, label, active, userUpdateId }) {
  await checkCodeExisted(tableName, code);

  const obj = { code, label, active, userUpdateId };

  const createdObj = await db.base.create(tableName, id, obj);

  return createdObj;
}

async function update(tableName, id, model) {
  if (model.code) {
    await checkCodeExisted(tableName, model.code, id);
  }

  const updatedObj = await db.base.update(tableName, id, model);

  if (!updatedObj)
    throw new NotFoundExceptions(
      `The ${tableName
        .split('_')
        .slice(1)
        .join(' ')} with the given ID was not found.`
    );

  return updatedObj;
}

export const createBaseCC = dto => create('c_cc', dto);

export const findAllBaseCC = (search, limit, offset) => findAll('c_cc', search, limit, offset);

export const findBaseCCById = id => findById('c_cc', id);

export const removeBaseCC = id => removeById('c_cc', id);

export const updateBaseCC = async (id, dto) => update('c_cc', id, dto);

export const createBaseHT = dto => create('c_ht', dto);

export const findAllBaseHT = (search, limit, offset) => findAll('c_ht', search, limit, offset);

export const findBaseHTById = id => findById('c_ht', id);

export const removeBaseHT = id => removeById('c_ht', id);

export const updateBaseHT = async (id, dto) => update('c_ht', id, dto);

export const createBasePE = dto => create('c_pe', dto);

export const findAllBasePE = (search, limit, offset) => findAll('c_pe', search, limit, offset);

export const findBasePEById = id => findById('c_pe', id);

export const removeBasePE = id => removeById('c_pe', id);

export const updateBasePE = async (id, dto) => update('c_pe', id, dto);

export const createBaseDX = dto => create('c_dx', dto);

export const findAllBaseDX = (search, limit, offset) => findAll('c_dx', search, limit, offset);

export const findBaseDXById = id => findById('c_dx', id);

export const removeBaseDX = id => removeById('c_dx', id);

export const updateBaseDX = async (id, dto) => update('c_dx', id, dto);

export const createItem = dto => create('c_item', dto);

export const findAllItem = (search, limit, offset) =>
  db.task(async t => {
    const p1 = t.items.findAll(search, limit, offset);
    const p2 = t.items.findAllCount(search);

    const [datas, counts] = await Promise.all([p1, p2]);
    return { datas, counts };
  });

export const findItemById = id => findById('c_item', id);

export const removeItem = id => update('c_item', id, { active: false });

export const updateItem = async (id, dto) => update('c_item', id, dto);

export const createItemDrug = dto => create('c_item_drug', dto);

export const findItemDrugByItemId = itemId => db.base.find('c_item_drug', { itemId });

export const updateItemDrug = async (itemId, dto) => db.itemDrugs.update(itemId, dto);

export const createItemLab = dto => create('c_item_lab', dto);

export const findItemLabByItemId = itemId => db.base.find('c_item_lab', { itemId });

export const updateItemLab = async (itemId, dto) => db.itemLabs.update(itemId, dto);

export const createItemSet = dto => create('c_item_set', dto);

export const listItemSetByItemId = itemId => db.base.find('c_item_set', { itemId });

export const removeItemSet = async id => removeById('c_item_set', id);
