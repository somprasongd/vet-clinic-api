import Joi from 'joi';
import validationHandler from '../../../common/helpers/validation-handler';

export const createPetImageDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    typeId: Joi.number()
      .min(1)
      .default(6),
    description: Joi.string().allow('', null),
  });

  const { dto } = validationHandler(req.body, schema);

  req.dto = {
    ...dto,
    petId: req.pet.id,
    mediaType: req.uploadDTO.type,
    mediaId: req.uploadDTO.id,
    updateBy: req.user.id,
  };
  next();
};

export const searchPetImageDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    typeId: Joi.number().min(1),
  });

  const { dto } = validationHandler(req.query, schema);

  req.dto = { ...dto, petId: req.pet.id, mediaType: 'image' };
  next();
};

export const updatePetImageDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    typeId: Joi.number().min(1),
    description: Joi.string().allow('', null),
  });

  const { dto } = validationHandler(req.body, schema);

  req.dto = { ...dto, updateBy: req.user.id };
  next();
};

export const respondPetImageDTO = (petImage, upload) => {
  const { id, typeId, petId, description = '', media = null } = petImage;

  const res = {
    id,
    typeId,
    petId,
    description,
    image: media,
  };

  if (upload) {
    res.image = { ...upload };
  }

  return res;
};
