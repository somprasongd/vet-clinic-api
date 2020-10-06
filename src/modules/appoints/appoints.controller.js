import * as service from './appoints.service';
import { NotFoundExceptions } from '../../common/helpers/exceptions';
import { respondAppointDTO } from './appoints.dto';
import paginate from '../../common/helpers/res-with-paginate';

export const createAppoint = async (req, res) => {
  const { dto } = req;

  const appoint = await service.createAppoint(dto);

  res.json(respondAppointDTO(appoint));
};

export const listAppoint = async (req, res) => {
  const { limit, offset, page } = req.query;
  const { dto } = req;

  const { datas, counts } = await service.findAllAppoint(dto, { offset, limit });

  const results = paginate(datas, counts, limit, offset, page);
  res.json(results);
};

export const getAppoint = async (req, res) => {
  const { id } = req.params;
  const appoint = await service.findAppointById(id);

  if (!appoint) throw new NotFoundExceptions('The appoint with the given ID was not found.');

  res.json(respondAppointDTO(appoint));
};

export const removeAppoint = async (req, res) => {
  const obj = {
    active: false,
    updateBy: req.user.id,
  };
  const appoint = await service.updateAppoint(req.params.id, obj);

  if (!appoint) throw new NotFoundExceptions('The appoint with the given ID was not found.');

  res.status(204).end();
};

export const updateAppoint = async (req, res) => {
  const { dto } = req;

  const appoint = await service.updateAppoint(req.params.id, dto);
  if (!appoint) throw new NotFoundExceptions('The appoint with the given ID was not found.');

  res.json(respondAppointDTO(appoint));
};
