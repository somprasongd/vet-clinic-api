import { NotFoundExceptions } from '../../common/helpers/exceptions';
import connection from '../../database';

const { db } = connection;

export const findOrderById = id => db.orders.findById(id);

export const findAllOrder = (conditions, { limit, offset }) => db.orders.find(conditions, { limit, offset });

export const createOrder = newOrder => {
  const { visitId, posId, itemId, qty, cost = 0, price = 0, updateBy } = newOrder;

  return db.tx(async t => {
    const item = await t.items.findById(itemId);
    if (!item) {
      throw new NotFoundExceptions('The item with the given Item ID was not found.');
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
      updateBy,
    };

    order = await t.orders.create(order);
    // order drug
    if (itemGroup.id === 1) {
      await createOrderDrug(t, order);
    }
    // xray result
    if (itemGroup.id === 4) {
      await createResultXray(t, order);
    }
    // lab result
    if (itemGroup.id === 3) {
      if (!item.isSet) {
        await createResultLab(t, order, item);
      } else {
        const items = await t.itemSets.findSubsetByItemId(item.id);
        if (!items) {
          throw new NotFoundExceptions('The item sub set with the given Item ID was not found.');
        }
        for (let index = 0; index < items.length; index++) {
          await createResultLab(t, order, items[index], item.id);
        }
      }
    }
    return order;
  });
};

async function createOrderDrug(db, order) {
  const itemDrugs = await db.base.find('c_item_drug', { itemId: order.itemId });
  if (!itemDrugs) {
    throw new NotFoundExceptions('The item drug with the given Item ID was not found.');
  }
  const { unit, dose, caution, frequency, instruction, remark } = itemDrugs[0];
  const newOrderDrug = {
    orderId: order.id,
    unit,
    dose,
    caution,
    frequency,
    instruction,
    remark,
    updateBy: order.updateBy,
  };
  order.orderDrug = await db.base.create('t_order_drug', newOrderDrug);
}

async function createResultXray(db, order) {
  const code = await db.counters.getCode('XN');
  const newResultXray = {
    orderId: order.id,
    xn: code,
    label: order.itemLabel,
    updateBy: order.updateBy,
  };
  await db.base.create('t_result_xray', newResultXray);
}

async function createResultLab(db, order, item, itemSetId = null) {
  const itemLabs = await db.base.find('c_item_lab', { itemId: order.itemId });
  if (!itemLabs) {
    throw new NotFoundExceptions('The item lab with the given Item ID was not found.');
  }

  const { resultType, normalStr, normalMax, normalMin, unit } = itemLabs[0];
  const newOrderDrug = {
    orderId: order.id,
    itemId: item.id,
    itemSetId,
    label: (itemSetId !== null ? `${order.itemLabel} - ` : '') + item.label,
    resultType,
    normalStr,
    normalMax,
    normalMin,
    unit,
    updateBy: order.updateBy,
  };
  order.orderDrug = await db.base.create('t_order_drug', newOrderDrug);
}

export const updateOrder = async (id, obj) => db.orders.update(id, obj);

export const findOrderOrderDrugByOrderId = orderId => db.orderDrugs.findByOrderId(orderId);

export const updateOrderDrugByOrderId = async (orderId, obj) => db.orderDrugs.updateByOrderId(orderId, obj);
