import * as service from './pos.service';
import { InvalidExceptions, NotFoundExceptions } from '../../common/helpers/exceptions';
import { respondPOSDTO } from './pos.dto';
import paginate from '../../common/helpers/res-with-paginate';

export const createPOS = async (req, res) => {
  const { dto } = req;

  const pos = await service.createPOS(dto);

  res.json(respondPOSDTO(pos));
};

export const listPOS = async (req, res) => {
  const { limit, offset, page } = req.query;
  const { dto } = req;

  const { datas, counts } = await service.findAllPOS(dto, { offset, limit });

  const results = paginate(datas, counts, limit, offset, page);
  res.json(results);
};
export const getPOSById = async id => {
  const pos = await service.findPOSById(id);

  if (!pos) throw new NotFoundExceptions('The pos with the given ID was not found.');

  return pos;
};

export const getPOS = async (req, res) => {
  const { id } = req.params;

  const pos = await getPOSById(id);

  res.json(respondPOSDTO(pos));
};

export const removePOS = async (req, res) => {
  const { dto } = req;
  await service.c(req.params.id, dto);

  res.status(204).end();
};

export const updatePOSState = async (req, res) => {
  const { dto } = req;

  const pos = await service.updatePOSState(req.params.id, dto);
  if (!pos) throw new NotFoundExceptions('The pos with the given ID was not found.');

  res.json(respondPOSDTO(pos));
};
