import Joi from 'joi';
import validationHandler from '../../../common/helpers/validation-handler';

export const createPetFileDTO = (req, res, next) => {
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

export const searchPetFileDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    typeId: Joi.number().min(1),
  });

  const { dto } = validationHandler(req.query, schema);

  req.dto = { ...dto, petId: req.pet.id, mediaType: 'file' };
  next();
};

export const updatePetFileDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    typeId: Joi.number().min(1),
    description: Joi.string().allow('', null),
  });

  const { dto } = validationHandler(req.body, schema);

  req.dto = { ...dto, updateBy: req.user.id };
  next();
};

export const respondPetFileDTO = (petFile, upload) => {
  const { id, typeId, petId, description = '', media = null } = petFile;

  const res = {
    id,
    typeId,
    petId,
    description,
    file: media === null ? null : { id: media.id, url: media.url },
  };

  if (upload) {
    res.file = { ...upload };
  }

  return res;
};
