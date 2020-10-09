import BaseJoi from 'joi';
import Extension from '@hapi/joi-date';
import validationHandler from '../../common/helpers/validation-handler';

const Joi = BaseJoi.extend(Extension);

export const createAppointDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    petId: Joi.number()
      .min(1)
      .required(),
    doctorId: Joi.number()
      .min(1)
      .allow(null),
    appointDate: Joi.date()
      .format('YYYY-MM-DD')
      .required(),
    appointTime: Joi.string()
      .regex(/^\d{2}:\d{2}$/)
      .required(),
    cause: Joi.string().required(),
    remark: Joi.string().allow('', null),
    fromVisitId: Joi.number()
      .min(1)
      .allow(null),
  });

  const { dto } = validationHandler(req.body, schema);

  req.dto = { ...dto, updateBy: req.user.id };
  next();
};

export const searchAppointDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    date: Joi.date().format('YYYY-MM-DD'),
    dateRange0: Joi.date().format('YYYY-MM-DD'),
    dateRange1: Joi.date().format('YYYY-MM-DD'),
    petId: Joi.number().min(1),
    doctorId: Joi.number().min(1),
    showVisited: Joi.bool().default(false),
  });

  const { dto } = validationHandler(req.query, schema);
  const { showVisited } = dto;
  delete dto.showVisited;

  req.dto = { ...dto };
  if (!showVisited) {
    req.dto.comeVisitId = null;
  }
  next();
};

export const updateAppointDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    doctorId: Joi.number()
      .min(1)
      .allow(null),
    appointDate: Joi.date().format('YYYY-MM-DD'),
    appointTime: Joi.string()
      .regex(/^\d{2}:\d{2}$/)
      .required(),
    cause: Joi.string(),
    remark: Joi.string().allow('', null),
    comeVisitId: Joi.number()
      .min(1)
      .allow(null),
  });

  const { dto } = validationHandler(req.body, schema);

  req.dto = { ...dto, updateBy: req.user.id };
  next();
};

export const respondAppointDTO = appoint => {
  const { id, pet, doctor, appointDate, appointTime, cause, remark } = appoint;

  return {
    id,
    pet,
    doctor,
    appointDate,
    appointTime,
    cause,
    remark,
  };
};
