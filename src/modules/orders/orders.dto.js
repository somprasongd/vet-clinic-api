import Joi from 'joi';
import validationHandler from '../../common/helpers/validation-handler';

export const createOrderDTO = (req, res, next) => {
  if (req.visit) {
    req.body.visitId = req.visit.id;
  }

  if (req.pos) {
    req.body.posId = req.pos.id;
  }

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
    unit: Joi.string()
      .allow('')
      .default(''),
    cost: Joi.number().min(0),
    price: Joi.number().min(0),
  });

  const { dto } = validationHandler(req.body, schema);

  req.dto = { ...dto, updateBy: req.user.id };
  next();
};

export const searchOrderDTO = (req, res, next) => {
  if (req.visit) {
    req.query.visitId = req.visit.id;
  }

  if (req.pos) {
    req.query.posId = req.pos.id;
  }

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
  if (req.pos) {
    req.body.posId = req.pos.id;
  }
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
    caution: Joi.string(),
    frequency: Joi.string(),
    instruction: Joi.string(),
    unit: Joi.string(),
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

export const respondOrderDrugDTO = orderDrug => {
  const { id, orderId, dose, caution, frequency, instruction, remark } = orderDrug;

  return {
    id,
    orderId,
    dose,
    caution,
    frequency,
    instruction,
    remark,
  };
};
