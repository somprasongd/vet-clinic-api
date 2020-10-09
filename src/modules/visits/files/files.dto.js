import Joi from 'joi';
import validationHandler from '../../../common/helpers/validation-handler';

export const createVisitFileDTO = (req, res, next) => {
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

export const searchVisitFileDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    typeId: Joi.number().min(1),
  });

  const { dto } = validationHandler(req.query, schema);

  req.dto = { ...dto, visitId: req.visit.id, mediaType: 'file' };
  next();
};

export const updateVisitFileDTO = (req, res, next) => {
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

export const respondVisitFileDTO = (visitFile, upload) => {
  const { id, typeId, visitId, description = '', media = null } = visitFile;

  const res = {
    id,
    typeId,
    visitId,
    description,
    file: media === null ? null : { id: media.id, url: media.url },
  };

  if (upload) {
    res.file = { ...upload };
  }

  return res;
};
