import Joi from 'joi';
import validationHandler from '../../common/helpers/validation-handler';

export const createAppointDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    petId: Joi.number()
      .min(1)
      .required(),
    appointDate: Joi.DateExtensions.date()
      .format('YYYY-MM-DD')
      .required(),
    cause: Joi.string().required(),
    remark: Joi.string().allow('', null),
    fromVisitId: Joi.number().min(1),
  });

  const { dto } = validationHandler(req.body, schema);

  req.dto = { ...dto, updateBy: req.user.id };
  next();
};

export const searchAppointDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    date: Joi.DateExtensions.date().format('YYYY-MM-DD'),
    dateRange0: Joi.DateExtensions.date().format('YYYY-MM-DD'),
    dateRange1: Joi.DateExtensions.date().format('YYYY-MM-DD'),
    petId: Joi.number().min(1),
  });

  const { dto } = validationHandler(req.query, schema);

  req.dto = dto;
  next();
};

export const updateAppointDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    appointDate: Joi.DateExtensions.date().format('YYYY-MM-DD'),
    cause: Joi.string(),
    remark: Joi.string().allow('', null),
  });

  const { dto } = validationHandler(req.body, schema);

  req.dto = { ...dto, updateBy: req.user.id };
  next();
};

export const respondAppointDTO = appoint => {
  const { id, petId, appointDate, cause, remark } = appoint;

  return {
    id,
    petId,
    appointDate,
    cause,
    remark,
  };
};
