import * as service from './orders.service';
import { NotFoundExceptions } from '../../common/helpers/exceptions';
import { respondOrderDrugDTO, respondOrderDTO } from './orders.dto';
import paginate from '../../common/helpers/res-with-paginate';

export const createOrder = async (req, res) => {
  const { dto } = req;

  const order = await service.createOrder(dto);

  res.json(respondOrderDTO(order));
};

export const listOrder = async (req, res) => {
  const { limit, offset, page } = req.query;
  const { dto } = req;

  const { datas, counts } = await service.findAllOrder(dto, { offset, limit });

  const results = paginate(datas, counts, limit, offset, page);
  res.json(results);
};

export const getOrder = async (req, res) => {
  const { id } = req.params;
  const order = await service.findOrderById(id);

  if (!order) throw new NotFoundExceptions('The order with the given ID was not found.');

  res.json(respondOrderDTO(order));
};

export const removeOrder = async (req, res) => {
  const obj = {
    active: false,
    updateBy: req.user.id,
  };
  const order = await service.updateOrder(req.params.id, obj);

  if (!order) throw new NotFoundExceptions('The order with the given ID was not found.');

  res.status(204).end();
};

export const updateOrder = async (req, res) => {
  const { dto } = req;

  const order = await service.updateOrder(req.params.id, dto);
  if (!order) throw new NotFoundExceptions('The order with the given ID was not found.');

  res.json(respondOrderDTO(order));
};

export const getOrderDrug = async (req, res) => {
  const { id: orderId } = req.params;
  const orderDrug = await service.findOrderDrugByOrderId(orderId);

  if (!orderDrug) throw new NotFoundExceptions('The order drug with the given Order ID was not found.');

  res.json(respondOrderDTO(orderDrug));
};

export const updateOrderDrug = async (req, res) => {
  const { dto } = req;

  const { id: orderId } = req.params;
  const orderDrug = await service.updateOrderDrugByOrderId(orderId, dto);
  if (!orderDrug) throw new NotFoundExceptions('The order drug with the given Order ID was not found.');

  res.json(respondOrderDrugDTO(orderDrug));
};
