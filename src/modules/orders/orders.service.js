import { NotFoundExceptions } from '../../common/helpers/exceptions';
import connection from '../../database';

const { db } = connection;

export const findOrderById = id => db.orders.findById(id);

export const findAllOrder = (conditions, { limit, offset }) => db.orders.find(conditions, { limit, offset });

export const createOrder = newOrder =>
  // const { visitId, posId, itemId, qty, cost = 0, price = 0, updateBy } = newOrder;

  db.tx(async t => {
    const order = await createOrderTx(t, newOrder);
    return order;
    // const item = await t.items.findById(itemId);
    // if (!item) {
    //   throw new NotFoundExceptions('The item with the given Item ID was not found.');
    // }

    // const itemGroup = await t.base.findById('m_item_group', item.itemGroupId);

    // let order = {
    //   visitId,
    //   posId,
    //   itemId,
    //   itemLabel: item.label,
    //   unit: item.unit,
    //   typeId: itemGroup.id,
    //   typeLabel: itemGroup.label,
    //   qty: itemGroup.id === 3 || itemGroup.id === 4 ? 1 : qty, // lab & xray must be 1
    //   cost: cost === 0 ? item.cost : cost,
    //   price: price === 0 ? item.price : price,
    //   updateBy,
    // };

    // order = await t.orders.create(order);
    // // order drug
    // if (itemGroup.id === 1) {
    //   await createOrderDrug(t, order);
    // }
    // // xray result
    // if (itemGroup.id === 4) {
    //   await createResultXray(t, order);
    // }
    // // lab result
    // if (itemGroup.id === 3) {
    //   if (!item.isSet) {
    //     await createResultLab(t, order, item);
    //   } else {
    //     const items = await t.itemSets.findSubsetByItemId(item.id);
    //     if (!items) {
    //       throw new NotFoundExceptions('The item sub set with the given Item ID was not found.');
    //     }
    //     for (let index = 0; index < items.length; index++) {
    //       await createResultLab(t, order, items[index], item.id);
    //     }
    //   }
    // }
    // return order;
  });

export const createOrderTx = async (t, newOrder) => {
  const { visitId, posId, itemId, qty, cost = 0, price = 0, updateBy } = newOrder;

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
    unit: item.unit,
    typeId: itemGroup.id,
    typeLabel: itemGroup.label,
    qty: itemGroup.id === 3 || itemGroup.id === 4 ? 1 : qty, // lab & xray must be 1
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
  console.log(itemGroup.id, item.isSet);
  if (itemGroup.id === 3) {
    if (!item.isSet) {
      console.log('lab');
      await createResultLab(t, order, item);
    } else {
      const items = await t.itemSets.findSubsetByItemId(item.id);
      console.log('lab set', items);
      if (!items) {
        throw new NotFoundExceptions('The item sub set with the given Item ID was not found.');
      }
      for (let index = 0; index < items.length; index++) {
        await createResultLab(t, order, items[index], item.id);
      }
    }
  }
  return order;
};

async function createOrderDrug(db, order) {
  const itemDrugs = await db.base.find('c_item_drug', { itemId: order.itemId });
  if (!itemDrugs) {
    throw new NotFoundExceptions('The item drug with the given Item ID was not found.');
  }
  const { dose, caution, frequency, instruction, remark } = itemDrugs[0];
  const newOrderDrug = {
    orderId: order.id,
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
  await db.resultXrays.create(newResultXray);
}

async function createResultLab(db, order, item, itemParentId = null) {
  const itemLabs = await db.base.find('c_item_lab', { itemId: item.id });
  console.log(itemLabs);
  if (!itemLabs || itemLabs.length === 0) {
    throw new NotFoundExceptions('The item lab with the given Item ID was not found.');
  }

  const { resultType, normalStr, normalMax, normalMin, unit } = itemLabs[0];
  const newOrderDrug = {
    orderId: order.id,
    itemId: item.id,
    itemParentId,
    label: (itemParentId !== null ? `${order.itemLabel} - ` : '') + item.label,
    resultType,
    normalStr,
    normalMax,
    normalMin,
    unit,
    updateBy: order.updateBy,
  };
  order.orderDrug = await db.resultLabs.create(newOrderDrug);
}

export const updateOrder = async (id, obj) => db.orders.update(id, obj);

export const findOrderDrugByOrderId = orderId => db.orderDrugs.findByOrderId(orderId);

export const updateOrderDrugByOrderId = async (orderId, obj) => db.orderDrugs.updateByOrderId(orderId, obj);
