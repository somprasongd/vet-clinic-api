import Joi from 'joi';
import validationHandler from '../../common/helpers/validation-handler';

export const createVisitDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    petId: Joi.number()
      .min(1)
      .required(),
    visitTypeId: Joi.number()
      .min(1)
      .default(1),
    visitStatusId: Joi.number()
      .min(1)
      .default(1),
    visitPriorityId: Joi.number()
      .min(1)
      .default(1),
    visitCause: Joi.string().allow('', null),
    note: Joi.string().allow('', null),
    doctorId: Joi.number()
      .min(1)
      .allow(null),
    weight: Joi.number().allow(null),
    temp: Joi.number().allow(null),
    appointId: Joi.number()
      .min(1)
      .allow(null),
  });

  const { dto } = validationHandler(req.body, schema);

  req.dto = { ...dto, visitBy: req.user.id, updateBy: req.user.id };
  next();
};

export const createDaycareDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    petId: Joi.number()
      .min(1)
      .required(),
    visitAt: Joi.date().iso(),
    note: Joi.string().allow('', null),
  });

  const { dto } = validationHandler(req.body, schema);

  req.dto = { ...dto, visitBy: req.user.id, updateBy: req.user.id, visitTypeId: 3, visitStatusId: 9 };
  next();
};

export const searchVisitDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    date: Joi.date(),
    dateRange0: Joi.date(),
    dateRange1: Joi.date(),
    vn: Joi.string(),
    petId: Joi.number().min(1),
    visitPriorityId: Joi.number().min(1),
    visitStatusId: Joi.number().min(1),
    visitTypeId: Joi.number().min(1),
    doctorId: Joi.number().min(1),
  });

  const { dto } = validationHandler(req.query, schema);

  req.dto = dto;
  next();
};

export const updateVisitDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    note: Joi.string().allow(''),
    cc: Joi.string().allow(''),
    dx: Joi.string().allow(''),
    ht: Joi.string().allow(''),
    pe: Joi.string().allow(''),
    visitPriorityId: Joi.number().min(1),
    visitStatusId: Joi.number().min(1),
    visitTypeId: Joi.number().min(1),
    doctorId: Joi.number()
      .min(1)
      .allow(null),
  });

  const { dto } = validationHandler(req.body, schema);

  req.dto = { ...dto, updateBy: req.user.id };
  next();
};

export const respondVisitDTO = visit => {
  const {
    id,
    vn,
    visitAt,
    pet,
    visitType,
    visitStatus,
    visitPriority,
    visitCause = '',
    note = '',
    cc = '',
    dx = '',
    ht = '',
    pe = '',
    doctor,
    // doctorDischargeAt,
    // dischargeAt,
  } = visit;

  return {
    id,
    vn,
    visitAt,
    pet,
    visitType,
    visitStatus,
    visitPriority,
    visitCause,
    note,
    cc,
    dx,
    ht,
    pe,
    doctor,
    // doctorDischargeAt,
    // dischargeAt,
  };
};
