import { NotFoundExceptions } from '../../common/helpers/exceptions';
import connection from '../../database';

const { db } = connection;

export const findPOSById = id => db.pos.findById(id);

export const findAllPOS = (conditions, { limit, offset }) => db.pos.find(conditions, { limit, offset });

export const createPOS = newPOS =>
  db.tx(async t => {
    const code = await t.counters.getCode('P');
    newPOS.posNumber = code;
    const pos = await t.pos.create(newPOS);
    return pos;
  });

export const updatePOS = (id, obj) => db.pos.update(id, obj);

export const createReceipt = async (id, obj) => {
  const receipt = await db.tx(async t => {
    const code = await t.counters.getCode('R');
    obj.receiptNumber = code;
    const pos = await t.pos.update(id, obj);

    if (!pos) throw new NotFoundExceptions('The pos with the given ID was not found.');

    const receipt = await t.pos.getReceipt(id);

    return receipt;
  });
  return receipt;
};
