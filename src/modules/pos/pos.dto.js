import Joi from 'joi';
import validationHandler from '../../common/helpers/validation-handler';

export const createPOSDTO = (req, res, next) => {
  req.dto = { updateBy: req.user.id };
  next();
};

export const searchPOSDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    posNumber: Joi.string(),
    receiptNumber: Joi.string(),
    state: Joi.string()
      .valid('pending', 'active', 'success', 'cancel')
      .default('active'),
  });

  const { dto } = validationHandler(req.query, schema);

  req.dto = { ...dto };
  next();
};

export const updatePOSDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    state: Joi.string()
      .valid('pending', 'active')
      .required(),
    // qty: Joi.number().min(0),
    // price: Joi.number().min(0),
    // remark: Joi.string(),
  });

  const { dto } = validationHandler(req.body, schema);

  req.dto = { ...dto, updateBy: req.user.id };
  next();
};

export const createReceiptDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    qty: Joi.number().min(1),
    price: Joi.number()
      .min(0)
      .default(0),
    discount: Joi.number()
      .min(0)
      .default(0),
    finalPrice: Joi.number().min(0),
    remark: Joi.string(),
  });

  const { dto } = validationHandler(req.body, schema);

  if (!dto.finalPrice) {
    dto.finalPrice = dto.price - dto.discount;
  }

  req.dto = { ...dto, state: 'success', updateBy: req.user.id };
  next();
};

export const cancelReceiptDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    remark: Joi.string().required(),
  });

  const { dto } = validationHandler(req.body, schema);

  req.dto = { ...dto, state: 'active', updateBy: req.user.id };
  next();
};

export const respondPOSDTO = pos => {
  const { id, posNumber, state, remark, createAt, receiptNumber, qty, price, discount, finalPrice, visit } = pos;

  return {
    id,
    posNumber,
    state,
    remark,
    createAt,
    receiptNumber,
    qty,
    price,
    discount,
    finalPrice,
    visit,
  };
};
