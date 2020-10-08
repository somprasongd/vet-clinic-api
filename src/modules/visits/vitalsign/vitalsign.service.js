import connection from '../../../database';

const { db } = connection;

export const findVitalsignById = id => db.vitalsigns.findById(id);

export const findAllVitalsign = ({ visitId }) => db.vitalsigns.find({ visitId });

export const createVitalsign = obj => db.vitalsigns.create(obj);

export const updateVitalsign = async (id, obj) => db.vitalsigns.update(id, obj);

export const deleteVitalsign = async id => db.vitalsigns.remove(id);
