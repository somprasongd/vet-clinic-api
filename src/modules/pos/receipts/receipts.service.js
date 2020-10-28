import connection from '../../../database';

const { db } = connection;

export const createReceipt = async obj => {
  const receipt = await db.tx(async t => {
    const code = await t.counters.getCode('R');
    obj.receiptNumber = code;

    const summary = await t.receipts.getDetailsByPOSId(obj.posId);
    obj.details = summary === null ? { groups: [] } : { groups: summary.details };

    let receipt = await t.receipts.create(obj);
    await t.pos.update(receipt.posId, { state: 'success' });

    receipt = await t.receipts.findByKey({ receiptId: receipt.id });

    return receipt;
  });
  return receipt;
};

export const getReceipt = ({ receiptId, posId, receiptNumber }) =>
  db.receipts.findByKey({ receiptId, posId, receiptNumber });
