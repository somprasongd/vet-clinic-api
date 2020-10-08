import * as service from './visits.service';
import { NotFoundExceptions } from '../../common/helpers/exceptions';
import { respondVisitDTO } from './visits.dto';
import paginate from '../../common/helpers/res-with-paginate';
import config from '../../common/config';

export const createVisit = async (req, res) => {
  const { dto } = req;

  const visit = await service.createVisit(dto);

  res.json(respondVisitDTO(visit));
};

export const listVisit = async (req, res) => {
  const { limit, offset, page } = req.query;
  const { dto } = req;

  const { datas, counts } = await service.findAllVisit(dto, { offset, limit });

  const results = paginate(datas, counts, limit, offset, page);
  res.json(results);
};

export const getVisitById = async id => {
  const visit = await service.findVisitById(id);

  if (!visit) throw new NotFoundExceptions('The visit with the given ID was not found.');

  return visit;
};

export const getVisit = async (req, res) => {
  const { id } = req.params;

  res.json(respondVisitDTO(getVisitById(id)));
};

export const cancelVisit = async (req, res) => {
  const obj = {
    visitStatusId: 8,
    updateBy: req.user.id,
  };
  const visit = await service.updateVisit(req.params.id, obj);

  if (!visit) throw new NotFoundExceptions('The visit with the given ID was not found.');

  res.status(204).end();
};

export const setStatusTreatment = async (req, res) => {
  const obj = {
    visitStatusId: 2,
    updateBy: req.user.id,
  };
  const visit = await service.updateVisit(req.params.id, obj);

  if (!visit) throw new NotFoundExceptions('The visit with the given ID was not found.');

  res.status(204).end();
};

export const setStatusWaitResult = async (req, res) => {
  const obj = {
    visitStatusId: 3,
    updateBy: req.user.id,
  };
  const visit = await service.updateVisit(req.params.id, obj);

  if (!visit) throw new NotFoundExceptions('The visit with the given ID was not found.');

  res.status(204).end();
};

export const setStatusReported = async (req, res) => {
  const obj = {
    visitStatusId: 4,
    updateBy: req.user.id,
  };
  const visit = await service.updateVisit(req.params.id, obj);

  if (!visit) throw new NotFoundExceptions('The visit with the given ID was not found.');

  res.status(204).end();
};

export const dischargeDoctor = async (req, res) => {
  const visit = await service.dischargeDoctor(req.params.id);

  if (!visit) throw new NotFoundExceptions('The visit with the given ID was not found.');

  res.status(204).end();
};

export const dischargeFinance = async (req, res) => {
  const visit = await service.dischargeFinance(req.params.id, req.user.id);

  if (!visit) throw new NotFoundExceptions('The visit with the given ID was not found.');

  res.status(204).end();
};

export const updateVisit = async (req, res) => {
  const { dto } = req;

  const visit = await service.updateVisit(req.params.id, dto);
  if (!visit) throw new NotFoundExceptions('The visit with the given ID was not found.');

  res.json(respondVisitDTO(visit));
};

export const checkIsVisit = async (req, res) => {
  const { petId } = req.params;

  const isTrue = await service.isVisitedByPetId(petId);

  res.json({
    status: isTrue,
  });
};

export const checkIsDaycare = async (req, res) => {
  const { petId } = req.params;

  const isTrue = await service.isDaycaredByPetId(petId);

  res.json({
    status: isTrue,
  });
};
