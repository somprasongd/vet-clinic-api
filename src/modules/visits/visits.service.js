import { NotFoundExceptions } from '../../common/helpers/exceptions';
import connection from '../../database';

const { db } = connection;

export const findVisitById = id => db.visits.findById(id);

export const findAllVisit = (conditions, { limit, offset }) => db.visits.find(conditions, { limit, offset });

export const createVisit = newVisit =>
  db.tx(async t => {
    const code = await t.counters.getCode('V');
    newVisit.vn = code;
    const { weight, temp, appointId } = newVisit;
    delete newVisit.weight;
    delete newVisit.temp;
    delete newVisit.appointId;

    const visit = await t.visits.create(newVisit);

    if (weight || temp) {
      await t.base.create('t_visit_vitalsign', { visitId: visit.id, weight, temp, updateBy: visit.updateBy });
    }

    if (appointId) {
      await t.base.update('t_appoint', appointId, { comeVisitId: visit.id });
    }
    return visit;
  });

export const updateVisit = async (id, obj) => db.visits.update(id, obj);

export const dischargeDoctor = id => db.visits.dischargeDoctor(id);
export const dischargeFinance = (id, userId) =>
  db.tx(async t => {
    const visit = await t.visits.dischargeFinance(id, userId);

    if (!visit) throw new NotFoundExceptions('The visit with the given ID was not found.');

    const code = await t.counters.getCode('P');
    const pos = await t.pos.create({
      posNumber: code,
      visitId: visit.id,
      createBy: userId,
      updateBy: userId,
    });

    await t.orders.updateByVisitId(visit.id, { posId: pos.id });
    return pos;
  });

export const isVisitedByPetId = petId => db.visits.isVisited(petId);
export const isDaycaredByPetId = petId => db.visits.isDaycared(petId);
