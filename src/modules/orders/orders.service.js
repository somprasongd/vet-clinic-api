import { NotFoundExceptions } from '../../common/helpers/exceptions';
import connection from '../../database';

const { db } = connection;

export const findOrderById = id => db.orders.findById(id);

export const findAllOrder = (conditions, { limit, offset }) => db.orders.find(conditions, { limit, offset });

export const createOrder = newOrder => {
  const { visitId, posId, itemId, qty, cost = 0, price = 0 } = newOrder;

  return db.tx(async t => {
    const item = await t.base.find('c_item', { id: itemId, active: true });
    if (!item) {
      throw new NotFoundExceptions('The item with the given ID was not found.');
    }

    const itemGroup = await t.base.findById('m_item_group', item.itemGroupId);

    let order = {
      visitId,
      posId,
      itemId,
      itemLabel: item.label,
      typeId: itemGroup.id,
      typeLabel: itemGroup.label,
      qty,
      cost: cost === 0 ? item.cost : cost,
      price: price === 0 ? item.price : price,
    };

    order = await t.orders.create(order);
    // order drug
    // xray result
    // lab result
    return order;
  });
};

export const updateOrder = async (id, obj) => db.orders.update(id, obj);
