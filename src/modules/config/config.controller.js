import * as service from './config.service';
import { InvalidExceptions, NotFoundExceptions } from '../../common/helpers/exceptions';
import paginate from '../../common/helpers/res-with-paginate';

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

export const createBaseEX = async (req, res) => {
  const { dto } = req;

  const createdObj = await service.createBaseEX(dto);

  res.json(createdObj);
};

export const findAllBaseEX = async (req, res) => {
  const { limit, offset, page, search } = req.query;

  const { datas, counts } = await service.findAllBaseEX(search, limit, offset);

  const results = paginate(datas, counts, limit, offset, page);
  res.json(results);
};

export const findBaseEXById = async (req, res) => {
  const { id } = req.params;
  const result = await service.findBaseEXById(id);

  res.json(result);
};

export const removeBaseEX = async (req, res) => {
  const { id } = req.params;
  await service.removeBaseEX(id);

  res.status(204).end();
};

export const updateBaseEX = async (req, res) => {
  const { id } = req.params;
  const { dto } = req;

  const updatedObj = await service.updateBaseEX(id, dto);

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

// export const createItem = async (req, res) => {
//   const schema = Joi.object().keys({
//     code: Joi.string().required(),
//     label: Joi.string().required(),
//     cost: Joi.number()
//       .min(1)
//       .required(),
//     price: Joi.number()
//       .min(1)
//       .required(),
//     active: Joi.boolean().default(true),
//     isItemSet: Joi.boolean().default(false),
//     itemGroupId: Joi.number()
//       .integer()
//       .min(1)
//       .required(),
//   });
//   const { error, value } = Joi.validate(req.body, schema, { allowUnknown: true, stripUnknown: true });
//   if (error) return res.status(400).json({ error: { message: error.details[0].message } });

//   // eslint-disable-next-line camelcase
//   const { code, label, cost, price, active, isItemSet: is_item_set, itemGroupId: item_group_id } = value;
//   const objExist = await db.base.find('pets_item', { code });
//   if (objExist.length > 0)
//     return res.status(400).json({ error: { message: 'The object with the given CODE was existed.' } });

//   const obj = { code, label, cost, price, active, is_item_set, item_group_id };
//   obj.user_update_id = req.user.id;

//   const createdObj = await db.base.create('pets_item', obj);

//   res.json(createdObj);
// };

// export const findAllItem = async (req, res) => {
//   const { limit, offset, page } = req.query;
//   console.log(req.query);

//   const schema = Joi.object().keys({
//     itemId: Joi.number().min(1),
//     itemCode: Joi.string(),
//     itemLabel: Joi.string(),
//     groupId: Joi.number().min(1),
//     groupIds: Joi.array().items(Joi.number().min(1)),
//     groupLabel: Joi.string(),
//     isItemSet: Joi.string(),
//   });

//   const { error, value } = Joi.validate(req.query, schema, { allowUnknown: true, stripUnknown: true });
//   if (error) return res.status(400).json({ error: { message: error.details[0].message } });
//   console.log(value);

//   const { itemId, itemCode, itemLabel, groupId, groupIds, groupLabel, isItemSet } = value;

//   const { datas, counts } = await db.task(async t => {
//     let conditions = '';
//     if (itemId) {
//       conditions += ` AND pets_item.id = $<itemId>`;
//     }
//     if (itemCode) {
//       conditions += ` AND pets_item.code = $<itemCode>`;
//     }
//     if (itemLabel) {
//       conditions += ` AND pets_item.label ilike '%$<itemLabel:value>%'`;
//     }
//     if (groupId) {
//       conditions += ` AND pets_itemgroup.id = $<groupId>`;
//     }
//     if (groupIds) {
//       conditions += ` AND pets_itemgroup.id = ANY($<groupIds>)`;
//     }
//     if (groupLabel) {
//       conditions += ` AND pets_itemgroup.label ilike '%$<groupLabel:value>%'`;
//     }
//     if (isItemSet) {
//       conditions += ` AND pets_item.is_item_set = $<isItemSet>`;
//     }

//     const p1 = t.manyOrNone(
//       `SELECT
//       pets_item.id
//       , pets_item.code
//       , pets_item.label
//       , pets_item.cost
//       , pets_item.price
//       , pets_item.is_item_set
//       , json_build_object(
//           'id', pets_itemgroup.id,
//           'label', pets_itemgroup.label
//       ) as item_group
//       FROM pets_item
//       INNER JOIN pets_itemgroup on pets_item.item_group_id = pets_itemgroup.id
//       WHERE pets_item.active = true ${conditions || ''}
//       order by pets_itemgroup.label, pets_item.code
//       offset $<offset> limit $<limit>`,
//       {
//         itemId,
//         itemCode,
//         itemLabel,
//         groupId,
//         groupIds,
//         groupLabel,
//         isItemSet,
//         offset,
//         limit,
//       }
//     );
//     const p2 = t.one(
//       `SELECT count(*)
//       FROM pets_item
//       INNER JOIN pets_itemgroup on pets_item.item_group_id = pets_itemgroup.id
//       WHERE pets_item.active = true ${conditions || ''}`,
//       {
//         itemId,
//         itemCode,
//         itemLabel,
//         groupId,
//         groupIds,
//         groupLabel,
//         isItemSet,
//       },
//       a => +a.count
//     );
//     const [datas, counts] = await Promise.all([p1, p2]);
//     return { datas, counts };
//   });

//   const results = paginate(datas, counts, limit, offset, page);
//   res.json(results);
// };

// export const findItemById = async (req, res) => {
//   const { id } = req.params;
//   const result = await db.oneOrNone(`SELECT * FROM pets_item WHERE id = $1`, +id);
//   if (!result) return res.status(404).json({ error: { message: 'The item with the given ID was not found.' } });

//   res.json(result);
// };

// export const removeItem = async (req, res) => {
//   const deletedRow = await db.base.remove('pets_item', req.params.id);

//   if (deletedRow === 0)
//     return res.status(404).json({ error: { message: 'The object with the given ID was not found.' } });

//   res.status(204).end();
// };

// export const updateItem = async (req, res) => {
//   const schema = Joi.object().keys({
//     code: Joi.string().required(),
//     label: Joi.string().required(),
//     cost: Joi.number()
//       .min(1)
//       .required(),
//     price: Joi.number()
//       .min(1)
//       .required(),
//     active: Joi.boolean().default(true),
//     isItemSet: Joi.boolean().default(false),
//     itemGroupId: Joi.number()
//       .integer()
//       .min(1)
//       .required(),
//   });
//   const { error, value } = Joi.validate(req.body, schema, { allowUnknown: true, stripUnknown: true });
//   if (error) return res.status(400).json({ error: { message: error.details[0].message } });

//   // eslint-disable-next-line camelcase
//   const { code, label, cost, price, active, isItemSet: is_item_set, itemGroupId: item_group_id } = value;
//   const objExist = await db.base.find('pets_item', { code });
//   if (objExist.length > 0 && objExist[0].id !== +req.params.id)
//     return res.status(400).json({ error: { message: 'The object with the given CODE was existed.' } });

//   const obj = { code, label, cost, price, active, is_item_set, item_group_id };
//   obj.userUpdateId = req.user.id;
//   obj.updateDatetime = moment();

//   const updatedObj = await db.base.update('pets_item', req.params.id, obj);
//   if (!updatedObj) return res.status(404).json({ error: { message: 'The object with the given ID was not found.' } });

//   res.json(updatedObj);
// };

// export const createItemDrug = async (req, res) => {
//   const schema = Joi.object().keys({
//     itemId: Joi.number()
//       .integer()
//       .min(1)
//       .required(),
//     dose: Joi.number(),
//     unit: Joi.string().required(),
//     caution: Joi.string().default(''),
//     frequency: Joi.string().default(''),
//     instruction: Joi.string().default(''),
//     remark: Joi.string().default(''),
//   });
//   const { error, value } = Joi.validate(req.body, schema, { allowUnknown: true, stripUnknown: true });
//   if (error) return res.status(400).json({ error: { message: error.details[0].message } });

//   const {
//     // eslint-disable-next-line camelcase
//     itemId: item_id,
//     dose,
//     unit,
//     caution,
//     frequency,
//     instruction,
//     remark,
//   } = value;
//   const objExist = await db.base.find('pets_itemdrug', { item_id });
//   if (objExist.length > 0)
//     return res.status(400).json({ error: { message: 'The object with the given Item ID was existed.' } });

//   const obj = { item_id, dose, unit, caution, frequency, instruction, remark, user_update_id: req.user.id };

//   const createdObj = await db.base.create('pets_itemdrug', obj);

//   res.json(createdObj);
// };

// export const findAllItemDrug = async (req, res) => {
//   const { limit, offset, page } = req.query;

//   const schema = Joi.object().keys({
//     itemId: Joi.number().min(1),
//     itemCode: Joi.string(),
//     itemLabel: Joi.string(),
//   });

//   const { error, value } = Joi.validate(req.query, schema, { allowUnknown: true, stripUnknown: true });
//   if (error) return res.status(400).json({ error: { message: error.details[0].message } });

//   const { itemId, itemCode, itemLabel } = value;

//   const { datas, counts } = await db.task(async t => {
//     let conditions = '';
//     if (itemId) {
//       conditions += ` AND item_id = $<itemId>`;
//     }
//     if (itemCode) {
//       conditions += ` AND pets_item.code = $<itemCode>`;
//     }
//     if (itemLabel) {
//       conditions += ` AND pets_item.label ilike '%$<itemLabel:value>%'`;
//     }

//     const p1 = t.manyOrNone(
//       `SELECT
//       pets_itemdrug.id
//       , json_build_object(
//         'id', pets_item.id,
//         'code', pets_item.code,
//         'label', pets_item.label,
//         'isItemSet', pets_item.is_item_set
//       ) as item
//       , pets_itemdrug.dose
//       , pets_itemdrug.unit
//       , pets_itemdrug.caution
//       , pets_itemdrug.frequency
//       , pets_itemdrug.instruction
//       , pets_itemdrug.remark
//       FROM pets_itemdrug
//       INNER JOIN pets_item on pets_itemdrug.item_id = pets_item.id
//       WHERE pets_item.active = true ${conditions || ''}
//       order by pets_item.label
//       offset $<offset> limit $<limit>`,
//       {
//         itemId,
//         itemCode,
//         itemLabel,
//         offset,
//         limit,
//       }
//     );
//     const p2 = t.one(
//       `SELECT count(*)
//       FROM pets_itemdrug
//       INNER JOIN pets_item on pets_itemdrug.item_id = pets_item.id
//       WHERE pets_item.active = true ${conditions || ''}`,
//       {
//         itemId,
//         itemCode,
//         itemLabel,
//       },
//       a => +a.count
//     );
//     const [datas, counts] = await Promise.all([p1, p2]);
//     return { datas, counts };
//   });

//   const results = paginate(datas, counts, limit, offset, page);
//   res.json(results);
// };

// export const findItemDrugById = async (req, res) => {
//   const { id } = req.params;
//   const result = await db.oneOrNone(
//     `SELECT
//     pets_itemdrug.id
//     , json_build_object(
//       'id', pets_item.id,
//       'code', pets_item.code,
//       'label', pets_item.label,
//       'isItemSet', pets_item.is_item_set
//     ) as item
//     , pets_itemdrug.dose
//     , pets_itemdrug.unit
//     , pets_itemdrug.caution
//     , pets_itemdrug.frequency
//     , pets_itemdrug.instruction
//     , pets_itemdrug.remark
//     FROM pets_itemdrug
//     INNER JOIN pets_item on pets_itemdrug.item_id = pets_item.id WHERE pets_itemdrug.id = $1`,
//     +id
//   );
//   if (!result) return res.status(404).json({ error: { message: 'The item drug with the given ID was not found.' } });

//   res.json(result);
// };

// export const removeItemDrug = async (req, res) => {
//   // const obj = {
//   //   active: false,
//   //   userUpdateId: req.user.id,
//   //   updateDatetime: moment(),
//   // };
//   // const deletedObj = await db.base.update('pets_itemdrug', req.params.id, obj);

//   // if (!deletedObj) return res.status(404).json({ error: { message: 'The object with the given ID was not found.' } });
//   const deletedRow = await db.base.remove('pets_itemdrug', req.params.id);

//   if (deletedRow === 0)
//     return res.status(404).json({ error: { message: 'The object with the given ID was not found.' } });

//   res.status(204).end();
// };

// export const updateItemDrug = async (req, res) => {
//   const schema = Joi.object().keys({
//     dose: Joi.number(),
//     unit: Joi.string(),
//     caution: Joi.string(),
//     frequency: Joi.string(),
//     instruction: Joi.string(),
//     remark: Joi.string(),
//   });
//   const { error, value } = Joi.validate(req.body, schema, { allowUnknown: true, stripUnknown: true });
//   if (error) return res.status(400).json({ error: { message: error.details[0].message } });

//   const obj = {
//     userUpdateId: req.user.id,
//     updateDatetime: moment(),
//     ...value,
//   };

//   const updatedObj = await db.base.update('pets_itemdrug', req.params.id, obj);
//   if (!updatedObj) return res.status(404).json({ error: { message: 'The object with the given ID was not found.' } });

//   res.json(updatedObj);
// };

// export const createItemLab = async (req, res) => {
//   const schema = Joi.object().keys({
//     itemId: Joi.number()
//       .min(1)
//       .required(),
//     itemLabGroupId: Joi.number()
//       .min(1)
//       .required(),
//     active: Joi.boolean().default(true),
//   });
//   const { error, value } = Joi.validate(req.body, schema, { allowUnknown: true, stripUnknown: true });
//   if (error) return res.status(400).json({ error: { message: error.details[0].message } });

//   // eslint-disable-next-line camelcase
//   const { itemId: item_id, itemLabGroupId: item_lab_group_id } = value;
//   const obj = { item_id, item_lab_group_id };
//   obj.user_update_id = req.user.id;

//   const createdObj = await db.base.create('pets_itemlab', obj);

//   res.json(createdObj);
// };

// export const findAllItemLab = async (req, res) => {
//   const { limit, offset, page } = req.query;

//   const schema = Joi.object().keys({
//     itemId: Joi.number().min(1),
//     itemCode: Joi.string(),
//     itemLabel: Joi.string(),
//     itemLabGroupId: Joi.number().min(1),
//     itemLabGroupLabel: Joi.string(),
//   });

//   const { error, value } = Joi.validate(req.query, schema, { allowUnknown: true, stripUnknown: true });
//   if (error) return res.status(400).json({ error: { message: error.details[0].message } });

//   const { itemId, itemCode, itemLabel, itemLabGroupId, itemLabGroupLabel } = value;

//   const { datas, counts } = await db.task(async t => {
//     let conditions = '';
//     if (itemId) {
//       conditions += ` AND item_id = $<itemId>`;
//     }
//     if (itemCode) {
//       conditions += ` AND pets_item.code = $<itemCode>`;
//     }
//     if (itemLabel) {
//       conditions += ` AND pets_item.label ilike '%$<itemLabel:value>%'`;
//     }
//     if (itemLabGroupId) {
//       conditions += ` AND pets_itemlabgroup.id = $<itemLabGroupId>`;
//     }
//     if (itemLabGroupLabel) {
//       conditions += ` AND pets_itemlabgroup.label ilike '%$<itemLabGroupLabel:value>%'`;
//     }

//     const p1 = t.manyOrNone(
//       `SELECT
//       pets_itemlab.id
//       , json_build_object(
//           'id', pets_item.id,
//           'code', pets_item.code,
//           'label', pets_item.label,
//           'isItemSet', pets_item.is_item_set
//       ) as item
//       , json_build_object(
//           'id', pets_itemlabgroup.id,
//           'label', pets_itemlabgroup.label
//       ) as item_lab_group
//       FROM pets_itemlab
//       INNER JOIN pets_item on pets_itemlab.item_id = pets_item.id
//       INNER JOIN pets_itemlabgroup on pets_itemlab.item_lab_group_id = pets_itemlabgroup.id
//       WHERE pets_itemlab.active = true ${conditions || ''}
//       order by pets_itemlabgroup.label, pets_item.code
//       offset $<offset> limit $<limit>`,
//       {
//         itemId,
//         itemCode,
//         itemLabel,
//         itemLabGroupId,
//         itemLabGroupLabel,
//         offset,
//         limit,
//       }
//     );
//     const p2 = t.one(
//       `SELECT count(*)
//       FROM pets_itemlab
//       INNER JOIN pets_item on pets_itemlab.item_id = pets_item.id
//       INNER JOIN pets_itemlabgroup on pets_itemlab.item_lab_group_id = pets_itemlabgroup.id
//       WHERE pets_itemlab.active = true ${conditions || ''}`,
//       {
//         itemId,
//         itemCode,
//         itemLabel,
//         itemLabGroupId,
//         itemLabGroupLabel,
//       },
//       a => +a.count
//     );
//     const [datas, counts] = await Promise.all([p1, p2]);
//     return { datas, counts };
//   });

//   const results = paginate(datas, counts, limit, offset, page);
//   res.json(results);
// };

// export const findItemLabById = async (req, res) => {
//   const { id } = req.params;
//   const result = await db.oneOrNone(`SELECT * FROM pets_itemlab WHERE id = $1`, +id);
//   if (!result) return res.status(404).json({ error: { message: 'The item lab with the given ID was not found.' } });

//   res.json(result);
// };

// export const removeItemLab = async (req, res) => {
//   const obj = {
//     active: false,
//     userUpdateId: req.user.id,
//     updateDatetime: moment(),
//   };
//   const deletedObj = await db.base.update('pets_itemlab', req.params.id, obj);

//   if (!deletedObj) return res.status(404).json({ error: { message: 'The object with the given ID was not found.' } });

//   res.status(204).end();
// };

// export const updateItemLab = async (req, res) => {
//   const schema = Joi.object().keys({
//     itemId: Joi.number()
//       .min(1)
//       .required(),
//     itemLabGroupId: Joi.number()
//       .min(1)
//       .required(),
//   });
//   const { error, value } = Joi.validate(req.body, schema, { allowUnknown: true, stripUnknown: true });
//   if (error) return res.status(400).json({ error: { message: error.details[0].message } });

//   // eslint-disable-next-line camelcase
//   const { itemId: item_id, itemLabGroupId: item_lab_group_id } = value;
//   const obj = { item_id, item_lab_group_id };
//   obj.userUpdateId = req.user.id;
//   obj.updateDatetime = moment();

//   const updatedObj = await db.base.update('pets_itemlab', req.params.id, obj);
//   if (!updatedObj) return res.status(404).json({ error: { message: 'The object with the given ID was not found.' } });

//   res.json(updatedObj);
// };

// export const createItemLabTest = async (req, res) => {
//   const schema = Joi.object().keys({
//     itemLabId: Joi.number()
//       .min(1)
//       .required(),
//     label: Joi.string().required(),
//     isResultStr: Joi.bool().required(),
//     normal: Joi.string(),
//     min: Joi.number(),
//     max: Joi.number(),
//     unit: Joi.string(),
//     active: Joi.boolean().default(true),
//   });
//   const { error, value } = Joi.validate(req.body, schema, { allowUnknown: true, stripUnknown: true });
//   if (error) return res.status(400).json({ error: { message: error.details[0].message } });

//   const {
//     // eslint-disable-next-line camelcase
//     itemLabId: item_lab_id,
//     label,
//     // eslint-disable-next-line camelcase
//     isResultStr: result_str,
//     // eslint-disable-next-line camelcase
//     normal: normal_str,
//     // eslint-disable-next-line camelcase
//     min: normal_min,
//     // eslint-disable-next-line camelcase
//     max: normal_max,
//     unit,
//   } = value;
//   const obj = { item_lab_id, label, result_str, normal_str, normal_min, normal_max, unit };
//   obj.user_update_id = req.user.id;

//   const createdObj = await db.base.create('pets_itemlabtest', obj);

//   res.json(createdObj);
// };

// export const findAllItemLabTest = async (req, res) => {
//   const { limit, offset, page } = req.query;

//   const schema = Joi.object().keys({
//     itemLabId: Joi.number().min(1),
//     label: Joi.string(),
//   });

//   const { error, value } = Joi.validate(req.query, schema, { allowUnknown: true, stripUnknown: true });
//   if (error) return res.status(400).json({ error: { message: error.details[0].message } });

//   const { itemLabId, label } = value;

//   const { datas, counts } = await db.task(async t => {
//     let conditions = '';
//     if (itemLabId) {
//       conditions += ` AND pets_itemlabtest.item_lab_id = $<itemLabId>`;
//     }
//     if (label) {
//       conditions += ` AND pets_itemlabtest.label ilike '%$<label:value>%'`;
//     }

//     const p1 = t.manyOrNone(
//       `SELECT
//       pets_itemlabtest.id
//       , pets_itemlabtest.label
//       , pets_itemlabtest.result_str
//       , pets_itemlabtest.normal_str
//       , pets_itemlabtest.normal_max
//       , pets_itemlabtest.normal_min
//       , pets_itemlabtest.unit
//       , json_build_object(
//           'id', pets_itemlab.id,
//           'item', json_build_object(
//                       'id', pets_item.id,
//                       'code', pets_item.code,
//                       'label', pets_item.label
//                   ),
//           'itemLabGroupId', pets_itemlab.item_lab_group_id
//       ) as item_lab
//       FROM pets_itemlabtest
//       INNER JOIN pets_itemlab on pets_itemlab.id = pets_itemlabtest.item_lab_id
//       INNER JOIN pets_item on pets_item.id = pets_itemlab.item_id
//       WHERE pets_itemlabtest.active = true ${conditions || ''}
//       order by pets_item.code, pets_itemlabtest.label
//       offset $<offset> limit $<limit>`,
//       {
//         itemLabId,
//         label,
//         offset,
//         limit,
//       }
//     );
//     const p2 = t.one(
//       `SELECT count(*)
//       FROM pets_itemlabtest
//       WHERE pets_itemlabtest.active = true ${conditions || ''}`,
//       {
//         itemLabId,
//         label,
//       },
//       a => +a.count
//     );
//     const [datas, counts] = await Promise.all([p1, p2]);
//     return { datas, counts };
//   });

//   const results = paginate(datas, counts, limit, offset, page);
//   res.json(results);
// };

// export const findItemLabTestById = async (req, res) => {
//   const { id } = req.params;
//   const result = await db.oneOrNone(`SELECT * FROM pets_itemlabtest WHERE id = $1`, +id);
//   if (!result)
//     return res.status(404).json({ error: { message: 'The item lab test with the given ID was not found.' } });

//   res.json(result);
// };

// export const removeItemLabTest = async (req, res) => {
//   const obj = {
//     active: false,
//     userUpdateId: req.user.id,
//     updateDatetime: moment(),
//   };
//   const deletedObj = await db.base.update('pets_itemlabtest', req.params.id, obj);

//   if (!deletedObj) return res.status(404).json({ error: { message: 'The object with the given ID was not found.' } });

//   res.status(204).end();
// };

// export const updateItemLabTest = async (req, res) => {
//   const schema = Joi.object().keys({
//     label: Joi.string().required(),
//     isResultStr: Joi.bool().required(),
//     normal: Joi.string(),
//     min: Joi.number(),
//     max: Joi.number(),
//     unit: Joi.string(),
//   });
//   const { error, value } = Joi.validate(req.body, schema, { allowUnknown: true, stripUnknown: true });
//   if (error) return res.status(400).json({ error: { message: error.details[0].message } });

//   const {
//     label,
//     // eslint-disable-next-line camelcase
//     isResultStr: result_str,
//     // eslint-disable-next-line camelcase
//     normal: normal_str,
//     // eslint-disable-next-line camelcase
//     min: normal_min,
//     // eslint-disable-next-line camelcase
//     max: normal_max,
//     unit,
//   } = value;
//   const obj = { label, result_str, normal_str, normal_min, normal_max, unit };
//   obj.userUpdateId = req.user.id;
//   obj.updateDatetime = moment();

//   const updatedObj = await db.base.update('pets_itemlabtest', req.params.id, obj);
//   if (!updatedObj) return res.status(404).json({ error: { message: 'The object with the given ID was not found.' } });

//   res.json(updatedObj);
// };

// export const createItemSet = async (req, res) => {
//   const schema = Joi.object().keys({
//     itemId: Joi.number()
//       .min(1)
//       .required(),
//     itemSetsId: Joi.number()
//       .min(1)
//       .required(),
//   });
//   const { error, value } = Joi.validate(req.body, schema, { allowUnknown: true, stripUnknown: true });
//   if (error) return res.status(400).json({ error: { message: error.details[0].message } });

//   // eslint-disable-next-line camelcase
//   const { itemId: item_id, itemSetsId: item_sets_id } = value;
//   const obj = { item_id, item_sets_id };
//   obj.user_update_id = req.user.id;

//   const createdObj = await db.base.create('pets_itemset', obj);

//   res.json(createdObj);
// };

// export const findAllItemSet = async (req, res) => {
//   const { limit, offset, page } = req.query;

//   const schema = Joi.object().keys({
//     itemId: Joi.number().min(1),
//     itemCode: Joi.string(),
//     itemLabel: Joi.string(),
//     itemSetId: Joi.number().min(1),
//     itemSetCode: Joi.string(),
//     itemSetLabel: Joi.string(),
//   });

//   const { error, value } = Joi.validate(req.query, schema, { allowUnknown: true, stripUnknown: true });
//   if (error) return res.status(400).json({ error: { message: error.details[0].message } });

//   const { itemId, itemCode, itemLabel, itemSetId, itemSetCode, itemSetLabel } = value;

//   const { datas, counts } = await db.task(async t => {
//     let conditions = '';
//     if (itemId) {
//       conditions += ` AND item_id = $<itemId>`;
//     }
//     if (itemCode) {
//       conditions += ` AND pets_item.code = $<itemCode>`;
//     }
//     if (itemLabel) {
//       conditions += ` AND pets_item.label ilike '%$<itemLabel:value>%'`;
//     }
//     if (itemSetId) {
//       conditions += ` AND item_sets_id = $<itemSetId>`;
//     }
//     if (itemSetCode) {
//       conditions += ` AND itemset.code = $<itemSetCode>`;
//     }
//     if (itemSetLabel) {
//       conditions += ` AND itemset.label ilike '%$<itemSetLabel:value>%'`;
//     }

//     const p1 = t.manyOrNone(
//       `SELECT
//       pets_itemset.id
//       , json_build_object(
//           'id', pets_item.id,
//           'code', pets_item.code,
//           'label', pets_item.label,
//           'isItemSet', pets_item.is_item_set
//       ) as item
//       , json_build_object(
//           'id', pets_item.id,
//           'code', pets_item.code,
//           'label', pets_item.label,
//           'isItemSet', pets_item.is_item_set
//       ) as item
//       FROM pets_itemset
//       INNER JOIN pets_item on pets_itemset.item_id = pets_item.id
//       INNER JOIN pets_item itemset on pets_itemset.item_sets_id = itemset.id
//       WHERE pets_item.active = true ${conditions || ''}
//       order by itemset.code, pets_item.code
//       offset $<offset> limit $<limit>`,
//       {
//         itemId,
//         itemCode,
//         itemLabel,
//         itemSetId,
//         itemSetCode,
//         itemSetLabel,
//         offset,
//         limit,
//       }
//     );
//     const p2 = t.one(
//       `SELECT count(*)
//       FROM pets_itemset
//       INNER JOIN pets_item on pets_itemset.item_id = pets_item.id
//       INNER JOIN pets_item itemset on pets_itemset.item_sets_id = itemset.id
//       WHERE pets_item.active = true ${conditions || ''}`,
//       {
//         itemId,
//         itemCode,
//         itemLabel,
//         itemSetId,
//         itemSetCode,
//         itemSetLabel,
//       },
//       a => +a.count
//     );
//     const [datas, counts] = await Promise.all([p1, p2]);
//     return { datas, counts };
//   });

//   const results = paginate(datas, counts, limit, offset, page);
//   res.json(results);
// };

// export const findItemSetById = async (req, res) => {
//   const { id } = req.params;
//   const result = await db.oneOrNone(`SELECT * FROM pets_itemset WHERE id = $1`, +id);
//   if (!result) return res.status(404).json({ error: { message: 'The item set with the given ID was not found.' } });

//   res.json(result);
// };

// export const removeItemSet = async (req, res) => {
//   const obj = {
//     active: false,
//     userUpdateId: req.user.id,
//     updateDatetime: moment(),
//   };
//   const deletedObj = await db.base.update('pets_itemset', req.params.id, obj);

//   if (!deletedObj) return res.status(404).json({ error: { message: 'The object with the given ID was not found.' } });

//   res.status(204).end();
// };

// export const updateItemSet = async (req, res) => {
//   const schema = Joi.object().keys({
//     itemSetsId: Joi.number()
//       .min(1)
//       .required(),
//   });
//   const { error, value } = Joi.validate(req.body, schema, { allowUnknown: true, stripUnknown: true });
//   if (error) return res.status(400).json({ error: { message: error.details[0].message } });

//   // eslint-disable-next-line camelcase
//   const { itemSetsId: item_sets_id } = value;
//   const obj = { item_sets_id };
//   obj.userUpdateId = req.user.id;
//   obj.updateDatetime = moment();

//   const updatedObj = await db.base.update('pets_itemset', req.params.id, obj);
//   if (!updatedObj) return res.status(404).json({ error: { message: 'The object with the given ID was not found.' } });

//   res.json(updatedObj);
// };
