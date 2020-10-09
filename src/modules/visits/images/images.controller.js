import * as service from './images.service';
import { NotFoundExceptions } from '../../../common/helpers/exceptions';
import { respondVisitImageDTO } from './images.dto';

export const createVisitImage = async (req, res) => {
  const { dto } = req;

  const visitImage = await service.createVisitImage(dto);

  res.json(respondVisitImageDTO(visitImage, req.uploadDTO));
};

export const getVisitImages = async (req, res) => {
  const { dto } = req;

  const mediaUrl = `${req.getHost()}/`;

  const results = await service.findAllVisitImageByVisitId(dto, mediaUrl);

  res.json(results);
};

export const getVisitImage = async (req, res) => {
  const { id } = req.params;

  const mediaUrl = `${req.getHost()}/`;

  const visitImage = await service.findVisitImageById(id, req.visit.id, mediaUrl);

  if (!visitImage) throw new NotFoundExceptions('The visit image with the given ID was not found.');

  res.json(respondVisitImageDTO(visitImage));
};

export const deleteVisitImage = async (req, res) => {
  const { id } = req.params;

  const visitImage = await service.deleteVisitImage(id, req.visit.id);

  if (!visitImage) throw new NotFoundExceptions('The visit image with the given ID was not found.');

  res.status(204).end();
};

export const updateVisitImage = async (req, res) => {
  const { dto } = req;

  let visitImage = await service.updateVisitImage(req.params.id, dto);
  if (!visitImage) throw new NotFoundExceptions('The visit image with the given ID was not found.');

  const mediaUrl = `${req.getHost()}/`;

  visitImage = await service.findVisitImageById(visitImage.id, visitImage.visitId, mediaUrl);

  res.json(respondVisitImageDTO(visitImage));
};
