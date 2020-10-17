import Joi from 'joi';
import validationHandler from '../../../common/helpers/validation-handler';

export const updateResultLabDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    result: Joi.string()
      .allow('')
      .required(),
  });

  const { dto } = validationHandler(req.body, schema);

  req.dto = { ...dto, updateBy: req.user.id };
  next();
};

export const respondResultLabDTO = vs => {
  const {
    id,
    orderId,
    itemId,
    itemSetId,
    label,
    result,
    resultType,
    normalStr,
    normalMax,
    normalMin,
    unit,
    interpret,
    interpretLevel,
  } = vs;

  return {
    id,
    orderId,
    itemId,
    itemSetId,
    label,
    result,
    resultType,
    normalStr,
    normalMax,
    normalMin,
    unit,
    interpret,
    interpretLevel,
  };
};

export const updateResultXrayDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    result: Joi.string()
      .allow('')
      .required(),
  });

  const { dto } = validationHandler(req.body, schema);

  req.dto = { ...dto, updateBy: req.user.id };
  next();
};

export const respondResultXrayDTO = vs => {
  const { id, orderId, xn, label, result } = vs;

  return {
    id,
    orderId,
    xn,
    label,
    result,
  };
};
