import Joi from 'joi';
import validationHandler from '../../common/helpers/validation-handler';

export const updateSiteDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    name: Joi.string(),
    branchNo: Joi.string(),
    branchName: Joi.string(),
    phone: Joi.string()
      .min(9)
      .max(10),
    address: Joi.string(),
    logoId: Joi.number().min(1),
  });

  const { dto } = validationHandler(req.body, schema);

  req.dto = { ...dto, updateBy: req.user.id };
  next();
};

export const createConfigDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    code: Joi.string().required(),
    label: Joi.string().required(),
    active: Joi.boolean().default(true),
  });

  const { dto } = validationHandler(req.body, schema);

  req.dto = { ...dto, updateBy: req.user.id };
  next();
};

export const updateConfigDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    code: Joi.string(),
    label: Joi.string(),
    active: Joi.boolean(),
  });

  const { dto } = validationHandler(req.body, schema);

  req.dto = { ...dto, updateBy: req.user.id };
  next();
};

export const createItemDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    code: Joi.string().required(),
    label: Joi.string().required(),
    cost: Joi.number()
      .min(1)
      .required(),
    price: Joi.number()
      .min(1)
      .required(),
    active: Joi.boolean().default(true),
    isSet: Joi.boolean().default(false),
    itemGroupId: Joi.number()
      .integer()
      .min(1)
      .required(),
  });

  const { dto } = validationHandler(req.body, schema);

  req.dto = { ...dto, updateBy: req.user.id };
  next();
};

export const searchItemDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    code: Joi.string(),
    label: Joi.string(),
    groupId: Joi.number().min(1),
    groupIds: Joi.array().items(Joi.number().min(1)),
    groupLabel: Joi.string(),
    isSet: Joi.string(),
  });

  const { dto } = validationHandler(req.query, schema);

  req.dto = { ...dto };
  next();
};

export const updateItemDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    code: Joi.string().required(),
    label: Joi.string().required(),
    cost: Joi.number()
      .min(1)
      .required(),
    price: Joi.number()
      .min(1)
      .required(),
    active: Joi.boolean().default(true),
    isSet: Joi.boolean().default(false),
    itemGroupId: Joi.number()
      .integer()
      .min(1)
      .required(),
  });

  const { dto } = validationHandler(req.body, schema);

  req.dto = { ...dto, updateBy: req.user.id };
  next();
};

export const createItemDrugDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    unit: Joi.string().required(),
    dose: Joi.number(),
    caution: Joi.string().default(''),
    frequency: Joi.string().default(''),
    instruction: Joi.string().default(''),
    remark: Joi.string().default(''),
  });

  const { itemId } = req.params;
  const { dto } = validationHandler(req.body, schema);

  req.dto = { ...dto, updateBy: req.user.id, itemId };
  next();
};

export const updateItemDrugDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    dose: Joi.number(),
    unit: Joi.string(),
    caution: Joi.string(),
    frequency: Joi.string(),
    instruction: Joi.string(),
    remark: Joi.string(),
  });

  const { dto } = validationHandler(req.body, schema);

  req.dto = { ...dto, updateBy: req.user.id };
  next();
};

export const createItemLabDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    resultType: Joi.string()
      .valid('numeric', 'text')
      .default('text'),
    normalStr: Joi.string(),
    normalMin: Joi.number(),
    normalMax: Joi.number(),
    unit: Joi.string(),
  });

  const { itemId } = req.params;
  const { dto } = validationHandler(req.body, schema);

  req.dto = { ...dto, updateBy: req.user.id, itemId };
  next();
};

export const updateItemLabDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    resultType: Joi.string()
      .valid('numeric', 'text')
      .default('text'),
    normalStr: Joi.string(),
    normalMin: Joi.number(),
    normalMax: Joi.number(),
    unit: Joi.string(),
  });

  const { dto } = validationHandler(req.body, schema);

  req.dto = { ...dto, updateBy: req.user.id };
  next();
};
