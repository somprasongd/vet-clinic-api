import * as service from './files.service';
import { NotFoundExceptions } from '../../../common/helpers/exceptions';
import { respondVisitFileDTO } from './files.dto';

export const createVisitFile = async (req, res) => {
  const { dto } = req;

  const visitFile = await service.createVisitFile(dto);

  res.json(respondVisitFileDTO(visitFile, req.uploadDTO));
};

export const getVisitFiles = async (req, res) => {
  const { dto } = req;

  const mediaUrl = `${req.getHost()}/`;

  const results = await service.findAllVisitFileByVisitId(dto, mediaUrl);

  res.json(results);
};

export const getVisitFile = async (req, res) => {
  const { id } = req.params;

  const mediaUrl = `${req.getHost()}/`;

  const visitFile = await service.findVisitFileById(id, req.visit.id, mediaUrl);

  if (!visitFile) throw new NotFoundExceptions('The visit file with the given ID was not found.');

  res.json(respondVisitFileDTO(visitFile));
};

export const deleteVisitFile = async (req, res) => {
  const { id } = req.params;

  const visitFile = await service.deleteVisitFile(id, req.visit.id);

  if (!visitFile) throw new NotFoundExceptions('The visit file with the given ID was not found.');

  res.status(204).end();
};

export const updateVisitFile = async (req, res) => {
  const { dto } = req;

  let visitFile = await service.updateVisitFile(req.params.id, dto);
  if (!visitFile) throw new NotFoundExceptions('The visit file with the given ID was not found.');

  const mediaUrl = `${req.getHost()}/`;

  visitFile = await service.findVisitFileById(visitFile.id, visitFile.visitId, mediaUrl);

  res.json(respondVisitFileDTO(visitFile));
};
