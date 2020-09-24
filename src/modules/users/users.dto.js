import Joi from 'joi';
import validatePayload from '../../common/helpers/validate-req-data';

export const createUserDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    username: Joi.string()
      .min(3)
      .max(50)
      .required(),
    name: Joi.string()
      .min(2)
      .max(100)
      .required(),
    email: Joi.string()
      .max(50)
      .email(),
    phone: Joi.string().max(10),
    password: Joi.string()
      .min(5)
      .max(50)
      .required(),
    isAdmin: Joi.boolean().default(false),
    isActive: Joi.boolean().default(true),
    avatarId: Joi.number().integer(),
    roles: Joi.array()
      .items(
        Joi.number()
          .integer()
          .min(1)
          .required()
      )
      .required(),
  });

  const { dto } = validatePayload(req.body, schema);

  req.dto = dto;
  next();
};

export const searchUserDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    name: Joi.string(),
    username: Joi.string(),
    roleId: Joi.number().min(1),
  });

  const { dto } = validatePayload(req.query, schema);

  req.dto = dto;
  next();
};

export const updateUserDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    name: Joi.string()
      .min(2)
      .max(100)
      .required(),
    email: Joi.string().email(),
    phone: Joi.string().max(10),
    isAdmin: Joi.boolean().default(false),
    isActive: Joi.boolean().default(true),
    roles: Joi.array()
      .items(
        Joi.number()
          .integer()
          .min(1)
          .required()
      )
      .required(),
  });

  const { dto } = validatePayload(req.query, schema);

  req.dto = dto;
  next();
};

export const updateUserPasswordDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    password: Joi.string()
      .min(5)
      .max(50)
      .required(),
  });

  const { dto } = validatePayload(req.query, schema);

  req.dto = dto;
  next();
};

export const updateUserAvatarDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    avatarId: Joi.number().integer(),
  });

  const { dto } = validatePayload(req.query, schema);

  req.dto = dto;
  next();
};

export const respondUserDTO = user => {
  const { id, username, name, email, phone, avatarId, isAdmin, isActive, roles } = user;
  return {
    id,
    username,
    name,
    email,
    phone,
    avatarId,
    isAdmin,
    isActive,
    roles,
  };
};
