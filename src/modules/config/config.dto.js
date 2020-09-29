import Joi from 'joi';
import validationHandler from '../../common/helpers/validation-handler';

export const createConfigDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    code: Joi.string().required(),
    label: Joi.string().required(),
    active: Joi.boolean().default(true),
  });

  const { dto } = validationHandler(req.body, schema);

  req.dto = { ...dto, userUpdateId: req.user.id };
  next();
};

export const updateConfigDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    code: Joi.string(),
    label: Joi.string(),
    active: Joi.boolean(),
  });

  const { dto } = validationHandler(req.body, schema);

  req.dto = { ...dto, userUpdateId: req.user.id };
  next();
};
