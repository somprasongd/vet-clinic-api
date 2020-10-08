import Joi from 'joi';
import validationHandler from '../../../common/helpers/validation-handler';

export const createVitalsignDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    weight: Joi.number().allow(null),
    temp: Joi.number().allow(null),
    rr: Joi.number().allow(null),
    sys: Joi.number()
      .integer()
      .allow(null),
    dia: Joi.number()
      .integer()
      .allow(null),
    pulse: Joi.number()
      .integer()
      .allow(null),
    painScore: Joi.number().allow(null),
    bcs: Joi.number().allow(null),
  });

  const { dto } = validationHandler(req.body, schema);

  req.dto = { ...dto, visitId: req.visit.id, updateBy: req.user.id };
  next();
};

export const updateVitalsignDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    weight: Joi.number().allow(null),
    temp: Joi.number().allow(null),
    rr: Joi.number().allow(null),
    sys: Joi.number()
      .integer()
      .allow(null),
    dia: Joi.number()
      .integer()
      .allow(null),
    pulse: Joi.number()
      .integer()
      .allow(null),
    painScore: Joi.number().allow(null),
    bcs: Joi.number().allow(null),
  });

  const { dto } = validationHandler(req.body, schema);

  req.dto = { ...dto, updateBy: req.user.id };
  next();
};

export const respondVitalsignDTO = vs => {
  const {
    id,
    visitId,
    vitalSignAt,
    weight = '',
    temp = '',
    rr = '',
    sys = '',
    dia = '',
    pulse = '',
    painScore = '',
    bcs = '',
  } = vs;

  return {
    id,
    visitId,
    vitalSignAt,
    weight,
    temp,
    rr,
    sys,
    dia,
    pulse,
    painScore,
    bcs,
  };
};
