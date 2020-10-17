import connection from '../../../database';

const { db } = connection;

export const findResultLabById = id => db.resultLabs.findById(id);

export const findAllResultLabByVisitId = ({ visitId }) => db.resultLabs.find({ visitId });

export const updateResultLab = async (id, obj) => db.resultLabs.update(id, obj);

export const findResultXrayById = id => db.resultXrays.findById(id);

export const findAllResultXrayByVisitId = ({ visitId }) => db.resultXrays.find({ visitId });

export const updateResultXray = async (id, obj) => db.resultXrays.update(id, obj);
