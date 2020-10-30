import Joi from 'joi';
import validationHandler from '../../../common/helpers/validation-handler';

export const createVitalsignDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    vitalSignAt: Joi.date().iso(),
    weight: Joi.number()
      .regex(/^[0-9]*\.?[0-9]{1,2}$/)
      .allow(null),
    temp: Joi.number()
      .regex(/^[0-9]*\.?[0-9]{1,2}$/)
      .allow(null),
    rr: Joi.number()
      .integer()
      .regex(/^[0-9]{1,3}$/)
      .allow(null),
    sys: Joi.number()
      .integer()
      .regex(/^[0-9]{1,3}$/)
      .allow(null),
    dia: Joi.number()
      .integer()
      .regex(/^[0-9]{1,3}$/)
      .allow(null),
    pulse: Joi.number()
      .integer()
      .regex(/^[0-9]{1,3}$/)
      .allow(null),
    painScore: Joi.number()
      .integer()
      .regex(/^(?:[1-9]|0[1-9]|10)$/)
      .allow(null),
    bcs: Joi.number()
      .integer()
      .regex(/^[1-9]$/)
      .allow(null),
  });

  const { dto } = validationHandler(req.body, schema);

  req.dto = { ...dto, visitId: req.visit.id, updateBy: req.user.id };
  next();
};

export const updateVitalsignDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    vitalSignAt: Joi.date().iso(),
    weight: Joi.number()
      .regex(/^[0-9]*\.?[0-9]{1,2}$/)
      .allow(null),
    temp: Joi.number()
      .regex(/^[0-9]*\.?[0-9]{1,2}$/)
      .allow(null),
    rr: Joi.number()
      .integer()
      .regex(/^[0-9]{1,3}$/)
      .allow(null),
    sys: Joi.number()
      .integer()
      .regex(/^[0-9]{1,3}$/)
      .allow(null),
    dia: Joi.number()
      .integer()
      .regex(/^[0-9]{1,3}$/)
      .allow(null),
    pulse: Joi.number()
      .integer()
      .regex(/^[0-9]{1,3}$/)
      .allow(null),
    painScore: Joi.number()
      .integer()
      .regex(/^(?:[1-9]|0[1-9]|10)$/)
      .allow(null),
    bcs: Joi.number()
      .integer()
      .regex(/^[1-9]$/)
      .allow(null),
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
