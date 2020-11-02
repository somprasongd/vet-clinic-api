import Joi from 'joi';
import validationHandler from '../../common/helpers/validation-handler';

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
    phone: Joi.string().regex(/^[0-9]{9,10}$/),
    password: Joi.string()
      .min(5)
      .max(50)
      .required(),
    isAdmin: Joi.boolean().default(false),
    active: Joi.boolean().default(true),
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

  const { dto } = validationHandler(req.body, schema);

  req.dto = dto;
  next();
};

export const searchUserDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    name: Joi.string(),
    username: Joi.string(),
    roleId: Joi.number().min(1),
  });

  const { dto } = validationHandler(req.query, schema);

  req.dto = dto;
  next();
};

export const updateUserDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    name: Joi.string()
      .min(2)
      .max(100),
    password: Joi.string()
      .min(5)
      .max(50)
      .allow(null),
    email: Joi.string().email(),
    phone: Joi.string().regex(/^[0-9]{9,10}$/),
    isAdmin: Joi.boolean(),
    roles: Joi.array().items(
      Joi.number()
        .integer()
        .min(1)
        .required()
    ),
  });

  const { dto } = validationHandler(req.body, schema);

  req.dto = dto;
  next();
};

export const updateProfileDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    name: Joi.string()
      .min(2)
      .max(100),
    password: Joi.string()
      .min(5)
      .max(50)
      .allow(null),
    email: Joi.string().email(),
    phone: Joi.string().regex(/^[0-9]{9,10}$/),
  });

  const { dto } = validationHandler(req.body, schema);

  req.params.id = req.user.id;
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

  const { dto } = validationHandler(req.body, schema);

  req.dto = dto;
  next();
};

export const respondUserDTO = user => {
  const { id, username, name, email, phone, isAdmin, roles } = user;
  return {
    id,
    username,
    name,
    email,
    phone,
    isAdmin,
    roles,
  };
};
