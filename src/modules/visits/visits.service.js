import connection from '../../database';
import { deleteById as deleteAvatar } from '../upload/upload.service';

const { db } = connection;

export const findVisitById = id => db.visits.findById(id);

export const findAllVisit = (conditions, { limit, offset }) => db.visits.find(conditions, { limit, offset });

export const createVisit = newVisit =>
  db.tx(async t => {
    const code = await t.counters.getCode('V');
    newVisit.vn = code;
    const { weight, temp } = newVisit;
    delete newVisit.weight;
    delete newVisit.temp;

    const visit = await t.visits.create(newVisit);

    if (weight || temp) {
      await t.base.create('t_visit_vitalsign', { visitId: visit.id, weight, temp, updateBy: visit.updateBy });
    }
    return visit;
  });

export const updateVisit = async (id, obj) => db.visits.update(id, obj);

export const dischargeDoctor = async id => db.visits.dischargeDoctor(id);
export const dischargeFinance = async (id, userId) => db.visits.dischargeFinance(id, userId);

export const isVisitedByPetId = petId => db.visits.isVisited(petId);
export const isDaycaredByPetId = petId => db.visits.isDaycared(petId);
