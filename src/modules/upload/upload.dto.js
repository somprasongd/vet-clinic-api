import Joi from 'joi';
import validationHandler from '../../common/helpers/validation-handler';

export const createUploadImageDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    filename: Joi.string().required(),
    filenameThumbnail: Joi.string().required(),
    filenameThumbnailSmall: Joi.string().required(),
  });

  const { dto } = validationHandler(req.file, schema);

  req.dto = { ...dto, uploadType: 'image' };
  next();
};

export const createUploadFileDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    destination: Joi.string().required(),
    filename: Joi.string().required(),
  });

  const { dto } = validationHandler(req.file, schema);

  req.dto = { filename: `${dto.destination}/${dto.filename}`, uploadType: 'file' };
  next();
};

export const respondUploadDTO = (model, url) => {
  const dto = {
    id: model.id,
    type: model.uploadType,
    url: `${url}${model.filename}`,
  };
  if (model.filenameThumbnail) {
    dto.url_thumbnail = `${url}${model.filenameThumbnail}`;
  }
  if (model.filenameThumbnailSmall) {
    dto.url_thumbnail_sm = `${url}${model.filenameThumbnailSmall}`;
  }
  return dto;
};
