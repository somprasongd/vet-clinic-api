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

export const getPOS = async (req, res) => {
  const { id } = req.params;
  const pos = await service.findPOSById(id);

  if (!pos) throw new NotFoundExceptions('The pos with the given ID was not found.');

  res.json(respondPOSDTO(pos));
};

export const removePOS = async (req, res) => {
  const obj = {
    state: 'cancel',
    updateBy: req.user.id,
  };
  const pos = await service.updatePOS(req.params.id, obj);

  if (!pos) throw new NotFoundExceptions('The pos with the given ID was not found.');

  res.status(204).end();
};

export const updatePOS = async (req, res) => {
  const { dto } = req;

  const pos = await service.updatePOS(req.params.id, dto);
  if (!pos) throw new NotFoundExceptions('The pos with the given ID was not found.');

  res.json(respondPOSDTO(pos));
};

export const createReceipt = async (req, res) => {
  const { dto } = req;
  const { id } = req.params;
  const pos = await service.findPOSById(id);

  if (!pos) throw new NotFoundExceptions('The pos with the given ID was not found.');
  if (pos.state !== 'active') throw new InvalidExceptions('The pos with the given ID state can not make receipt.');

  const receipt = await service.createReceipt(id, dto);

  if (!receipt) throw new Error('The pos with the given ID can not create receipt.');

  // print
  res.json(receipt);
};

export const cancelReceipt = async (req, res) => {
  const { dto } = req;
  const obj = {
    ...dto,
    receiptNumber: null,
    qty: 0,
    price: 0,
    discount: 0,
    finalPrice: 0,
    state: 'active',
  };
  const pos = await service.updatePOS(req.params.id, obj);

  if (!pos) throw new NotFoundExceptions('The pos with the given ID was not found.');

  res.status(204).end();
};
