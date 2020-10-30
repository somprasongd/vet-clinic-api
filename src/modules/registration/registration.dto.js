import Joi from 'joi';
import validationHandler from '../../common/helpers/validation-handler';

export const searchDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    code: Joi.string(),
    houseNo: Joi.string(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    microchipNo: Joi.string(),
    petName: Joi.string(),
    tel: Joi.string().regex(/^[0-9]{9,10}$/),
  });

  const { dto } = validationHandler(req.query, schema);

  req.dto = dto;
  next();
};
