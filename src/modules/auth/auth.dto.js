import Joi from 'joi';
import validationHandler from '../../common/helpers/validation-handler';

export const loginDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  const { dto } = validationHandler(req.body, schema);

  req.dto = dto;
  next();
};

export const respondAuthDTO = (user, token) => {
  const { id, username, name, avatarId, isAdmin, roles } = user;
  return {
    id,
    username,
    name,
    avatarId,
    isAdmin,
    roles,
    ...token,
  };
};
