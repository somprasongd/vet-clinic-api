import * as service from './images.service';
import { NotFoundExceptions } from '../../../common/helpers/exceptions';

export const createVisitImage = async (req, res) => {
  const { visit } = req;

  const { uploadDTO } = req;

  await service.updateVisitAvatar(visit, uploadDTO.id);

  res.json(uploadDTO);
};

export const getVisitAvatar = async (req, res) => {
  const visitId = req.params.id;

  const visit = await service.findVisitById(visitId);

  if (!visit || visit.avatarId === null) {
    return res.sendFile(config.DEFAULT_AVATAR_PET);
  }

  const qs = Object.keys(req.query).reduce((acc, cur) => `${acc}&${cur}=${req.query[cur]}`, '?');

  req.url = `/api/upload/file/${visit.avatarId}${qs}`;
  req.app.handle(req, res);
};

export const deleteVisitAvatar = async (req, res) => {
  const visitId = req.params.id;

  const visit = await service.findVisitById(visitId);

  if (!visit) throw new NotFoundExceptions('The visit with the given ID was not found.');

  await service.updateVisitAvatar(visit, null);

  res.status(204).end();
};
