import Joi from 'joi';
import validationHandler from '../../common/helpers/validation-handler';

export const createOrderDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    visitId: Joi.number()
      .min(1)
      .allow(null)
      .default(null),
    posId: Joi.when('visitId', {
      is: null,
      then: Joi.number()
        .min(1)
        .required(),
      otherwise: null,
    }),
    itemId: Joi.number()
      .min(1)
      .required(),
    qty: Joi.number()
      .min(1)
      .default(1),
    cost: Joi.number().min(0),
    price: Joi.number().min(0),
  });

  const { dto } = validationHandler(req.body, schema);

  req.dto = { ...dto, updateBy: req.user.id };
  next();
};

export const searchOrderDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    visitId: Joi.number()
      .min(1)
      .default(null),
    posId: Joi.when('visitId', {
      is: null,
      then: Joi.number()
        .min(1)
        .required(),
      otherwise: null,
    }),
  });

  const { dto } = validationHandler(req.query, schema);

  req.dto = { ...dto };
  next();
};

export const updateOrderDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    posId: Joi.number().min(1),
    qty: Joi.number().min(1),
    cost: Joi.number().min(0),
    price: Joi.number().min(0),
  });

  const { dto } = validationHandler(req.body, schema);

  req.dto = { ...dto, updateBy: req.user.id };
  next();
};

export const updateOrderDrugDTO = (req, res, next) => {
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

export const respondOrderDTO = order => {
  const { id, visitId, posId, itemLabel, typeLabel, cost, price, qty, unit } = order;

  return {
    id,
    visitId,
    posId,
    itemLabel,
    typeLabel,
    cost,
    price,
    qty,
    unit,
  };
};

export const respondOrderDrugDTO = order => {
  const { id, orderId, unit, dose, caution, frequency, instruction, remark } = order;

  return {
    id,
    orderId,
    unit,
    dose,
    caution,
    frequency,
    instruction,
    remark,
  };
};
