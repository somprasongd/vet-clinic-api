import { InvalidExceptions, NotFoundExceptions } from '../../common/helpers/exceptions';
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

export const updatePOSState = async (id, obj) => {
  const pos = await db.tx(async t => {
    let pos = await t.pos.findById(id);

    if (!pos) throw new NotFoundExceptions('The pos with the given ID was not found.');

    if (pos.state === 'success')
      throw new InvalidExceptions('Can not change state the pos with the given ID was successed.');
    if (pos.state === 'cancel')
      throw new InvalidExceptions('Can not change state the pos with the given ID was canceled.');

    pos = await t.pos.update(id, obj);
    return pos;
  });
  return pos;
};

export const cancelPOS = async (id, obj) => {
  await db.tx(async t => {
    const pos = await t.pos.findById(id);

    if (!pos) throw new NotFoundExceptions('The pos with the given ID was not found.');

    if (pos.state === 'success') throw new InvalidExceptions('Can not cancel the pos with the given ID was successed.');
    if (pos.state === 'cancel') throw new InvalidExceptions('Can not cancel the pos with the given ID was canceled.');

    await t.pos.update(id, obj);
  });
};
