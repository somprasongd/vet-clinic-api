import { respondUploadDTO } from './upload.dto';
import * as service from './upload.service';

export const createUpload = async (req, res, next) => {
  try {
    const { dto } = req;

    const result = await service.create(dto);

    const mediaUrl = `${req.getHost()}/`;

    req.uploadDTO = respondUploadDTO(result, mediaUrl);

    next();
  } catch (err) {
    next(err);
  }
};
