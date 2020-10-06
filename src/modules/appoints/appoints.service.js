import connection from '../../database';
import { deleteById as deleteAvatar } from '../upload/upload.service';

const { db } = connection;

export const findAppointById = id => db.appoints.findById(id);

export const findAllAppoint = (conditions, { limit, offset }) => db.appoints.find(conditions, { limit, offset });

export const createAppoint = newAppoint =>
  db.tx(async t => {
    const appoint = await t.appoints.create(newAppoint);
    return appoint;
  });

export const updateAppoint = async (id, obj) => db.appoints.update(id, obj);
