import connection from '../../database';

const { db } = connection;

export const getUserByUsername = username => db.users.findByUsername(username);
