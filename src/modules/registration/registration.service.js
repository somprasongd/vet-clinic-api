import connection from '../../database';

const { db } = connection;

export const searchRegistration = (conditions, { limit, offset }) =>
  db.members.findWithPet(conditions, { limit, offset });
