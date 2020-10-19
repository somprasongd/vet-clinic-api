import connection from '../../database';

const { db } = connection;

export const listByMemberId = memberId => db.linenotify.findAllByMemberId(memberId);

export const create = ({ memberId, lineToken }) => db.linenotify.create({ memberId, lineToken });

export const deleteByToken = token => db.linenotify.deleteByToken(token);
