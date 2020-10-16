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
      otherwise: Joi.default(null),
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
      .default(undefined),
    posId: Joi.when('visitId', {
      is: undefined,
      then: Joi.number()
        .min(1)
        .required(),
      otherwise: Joi.default(undefined),
    }),
  });

  const { dto } = validationHandler(req.query, schema);

  req.dto = { ...dto };
  next();
};

export const updateOrderDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    qty: Joi.number().min(1),
    cost: Joi.number().min(0),
    price: Joi.number().min(0),
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
