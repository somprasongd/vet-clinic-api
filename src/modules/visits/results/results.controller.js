import * as service from './results.service';
import { NotFoundExceptions } from '../../../common/helpers/exceptions';
import { respondResultLabDTO, respondResultXrayDTO } from './results.dto';

export const listResultLabByVisitId = async (req, res) => {
  const { id: visitId } = req.visit;

  const resultLabs = await service.findAllResultLabByVisitId({ visitId });

  res.json(resultLabs);
};

export const getResultLab = async (req, res) => {
  const { id } = req.params;
  const resultLab = await service.findResultLabById(id);

  if (!resultLab) throw new NotFoundExceptions('The result lab with the given ID was not found.');

  res.json(respondResultLabDTO(resultLab));
};

export const updateResultLab = async (req, res) => {
  const { dto } = req;

  const resultLab = await service.updateResultLab(req.params.id, dto);
  if (!resultLab) throw new NotFoundExceptions('The result lab with the given ID was not found.');

  res.json(respondResultLabDTO(resultLab));
};

export const listResultXrayByVisitId = async (req, res) => {
  const { id: visitId } = req.visit;

  const resultXrays = await service.findAllResultXrayByVisitId({ visitId });

  res.json(resultXrays);
};

export const getResultXray = async (req, res) => {
  const { id } = req.params;
  const resultXray = await service.findResultXrayById(id);

  if (!resultXray) throw new NotFoundExceptions('The result xray with the given ID was not found.');

  res.json(respondResultXrayDTO(resultXray));
};

export const updateResultXray = async (req, res) => {
  const { dto } = req;

  const resultXray = await service.updateResultXray(req.params.id, dto);
  if (!resultXray) throw new NotFoundExceptions('The result xray with the given ID was not found.');

  res.json(respondResultXrayDTO(resultXray));
};
