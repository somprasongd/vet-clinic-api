import Joi from 'joi';
import validationHandler from '../../../common/helpers/validation-handler';

export const createVisitImageDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    typeId: Joi.number()
      .min(1)
      .default(1),
    description: Joi.string().allow('', null),
  });

  const { dto } = validationHandler(req.body, schema);

  req.dto = {
    ...dto,
    visitId: req.visit.id,
    mediaType: req.uploadDTO.type,
    mediaId: req.uploadDTO.id,
    updateBy: req.user.id,
  };
  next();
};

export const searchVisitImageDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    typeId: Joi.number().min(1),
  });

  const { dto } = validationHandler(req.query, schema);

  req.dto = { ...dto, visitId: req.visit.id, mediaType: 'image' };
  next();
};

export const updateVisitImageDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    typeId: Joi.number()
      .min(1)
      .default(1),
    description: Joi.string().allow('', null),
  });

  const { dto } = validationHandler(req.body, schema);

  req.dto = { ...dto, updateBy: req.user.id };
  next();
};

export const respondVisitImageDTO = (visitImage, upload) => {
  const { id, typeId, visitId, description = '', media = null } = visitImage;

  const res = {
    id,
    typeId,
    visitId,
    description,
    image: media,
  };

  if (upload) {
    res.image = { ...upload };
  }

  return res;
};
