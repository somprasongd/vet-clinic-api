import Joi from 'joi';
import validationHandler from '../../common/helpers/validation-handler';

export const createMemberDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    houseNo: Joi.string().allow('', null),
    address: Joi.string().allow('', null),
    tels: Joi.array().items(
      Joi.string()
        .min(9)
        .max(10)
        .required()
    ),
    email: Joi.string()
      .allow('', null)
      .email(),
    remark: Joi.string().allow('', null),
    oldHn: Joi.string().allow('', null),
    imageId: Joi.number().min(1),
    prefixId: Joi.number().min(1),
  });

  const { dto } = validationHandler(req.body, schema);

  req.dto = { ...dto, updateBy: req.user.id };
  next();
};

export const searchMemberDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    code: Joi.string(),
    houseNo: Joi.string(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    tel: Joi.string()
      .min(9)
      .max(10),
  });

  const { dto } = validationHandler(req.query, schema);

  req.dto = dto;
  next();
};

export const updateMemberDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    firstName: Joi.string().allow('', null),
    lastName: Joi.string().allow('', null),
    houseNo: Joi.string().allow('', null),
    address: Joi.string().allow('', null),
    tels: Joi.array().items(
      Joi.string()
        .min(9)
        .max(10)
        .required()
    ),
    email: Joi.string()
      .allow('', null)
      .email(),
    remark: Joi.string().allow('', null),
    oldHn: Joi.string().allow('', null),
    prefixId: Joi.number().min(1),
  });

  const { dto } = validationHandler(req.body, schema);

  req.dto = { ...dto, updateBy: req.user.id };
  next();
};

export const respondMemberDTO = member => {
  const { id, code, firstName, lastName, houseNo, address, tels, email, remark, oldHn, prefixId } = member;
  return {
    id,
    code,
    firstName,
    lastName,
    houseNo,
    address,
    tels,
    email,
    remark,
    oldHn,
    prefixId,
  };
};
