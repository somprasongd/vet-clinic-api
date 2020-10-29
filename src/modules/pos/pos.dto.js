import Joi from 'joi';
import { InvalidExceptions } from '../../common/helpers/exceptions';
import validationHandler from '../../common/helpers/validation-handler';

export const createPOSDTO = (req, res, next) => {
  req.dto = { createBy: req.user.id, updateBy: req.user.id };
  next();
};

export const searchPOSDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    posNumber: Joi.string(),
    receiptNumber: Joi.string(),
    date: Joi.date(),
    dateRange0: Joi.date(),
    dateRange1: Joi.date(),
    state: Joi.string().valid('pending', 'success', 'cancel'),
    states: Joi.array().items(Joi.string().valid('pending', 'success', 'cancel')),
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
  });

  const { dto } = validationHandler(req.body, schema);

  req.dto = { ...dto, updateBy: req.user.id };
  next();
};

export const cancelPOSDTO = (req, res, next) => {
  const {
    pos: { state },
  } = req;

  if (state === 'cancel') {
    next(new InvalidExceptions('Can not cancel the pos with the given ID was canceled.'));
    return;
  }

  let dto = { state: 'cancel', updateBy: req.user.id };
  console.log(state, state === 'success');
  if (state === 'success') {
    const schema = Joi.object().keys({
      cancelReason: Joi.string().required(),
    });

    const { dto: validations } = validationHandler(req.body, schema);
    console.log(validations);
    dto = { ...dto, ...validations };
  }

  req.dto = { ...dto };
  next();
};

export const respondPOSDTO = pos => {
  const { id, posNumber, state, createAt, receiptNumber, visit } = pos;

  return {
    id,
    posNumber,
    state,
    createAt,
    receiptNumber,
    visit,
  };
};
