import Joi from 'joi';
import validationHandler from '../../common/helpers/validation-handler';

export const createPetDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    birthDate: Joi.string().allow('', null),
    breed: Joi.string().allow('', null),
    death: Joi.boolean(),
    earmark: Joi.string().allow('', null),
    color: Joi.string().allow('', null),
    note: Joi.string().allow('', null),
    microchipNo: Joi.string().allow('', null),
    sterilization: Joi.boolean(),
    ownerId: Joi.number()
      .min(1)
      .required(),
    genderId: Joi.number().min(1),
    typeId: Joi.number().min(1),
  });

  const { dto } = validationHandler(req.body, schema);

  req.dto = { ...dto, updateBy: req.user.id };
  next();
};

export const searchPetDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    code: Joi.string(),
    name: Joi.string(),
    microchipNo: Joi.string(),
    genderId: Joi.number().min(1),
    typeId: Joi.number().min(1),
    ownerId: Joi.number().min(1),
  });

  const { dto } = validationHandler(req.query, schema);

  req.dto = dto;
  next();
};

export const updatePetDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    name: Joi.string().allow('', null),
    birthDate: Joi.string().allow('', null),
    breed: Joi.string().allow('', null),
    death: Joi.boolean(),
    earmark: Joi.string().allow('', null),
    color: Joi.string().allow('', null),
    note: Joi.string().allow('', null),
    microchipNo: Joi.string().allow('', null),
    sterilization: Joi.boolean(),
    genderId: Joi.number().min(1),
    typeId: Joi.number().min(1),
  });

  const { dto } = validationHandler(req.body, schema);

  req.dto = { ...dto, updateBy: req.user.id };
  next();
};

export const respondPetDTO = member => {
  const {
    id,
    code,
    name,
    birthDate,
    breed,
    death,
    earmark,
    color,
    note,
    microchipNo,
    sterilization,
    isVisitedTypeId,
    ownerId,
    genderId,
    typeId,
  } = member;

  return {
    id,
    code,
    name,
    birthDate,
    breed,
    death,
    earmark,
    color,
    note,
    microchipNo,
    sterilization,
    isVisitedTypeId,
    ownerId,
    genderId,
    typeId,
  };
};
