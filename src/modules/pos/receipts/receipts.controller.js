import * as service from './receipts.service';
import { InvalidExceptions, NotFoundExceptions } from '../../../common/helpers/exceptions';
import { respondReceiptDTO } from './receipts.dto';

export const createReceipt = async (req, res) => {
  const { dto, pos } = req;

  if (pos.state !== 'active') throw new InvalidExceptions('The pos with the given ID state can not make receipt.');

  const receipt = await service.createReceipt(dto);

  if (!receipt) throw new Error('The pos with the given ID can not create receipt.');

  res.json(respondReceiptDTO(receipt));
};

export const getReceipt = async (req, res) => {
  const { dto } = req;
  const receipt = await service.getReceipt(dto);

  if (!receipt) throw new NotFoundExceptions('The receipt with the given key was not found.');

  res.json(respondReceiptDTO(receipt));
};
