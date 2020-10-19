import Repository from '../helpers/repository';

export default class LineNotifyRepository extends Repository {
  constructor(db, pgp) {
    super(db, pgp, 't_line_notify_tokens', {});
  }

  findAllByMemberId(ownerId) {
    return this.db.manyOrNone(`SELECT * FROM t_line_notify_tokens WHERE member_id = $1`, +ownerId);
  }

  deleteByOwnerId(ownerId) {
    return this.db.result(`DELETE FROM t_line_notify_tokens WHERE member_id = $1`, +ownerId, r => r.rowCount);
  }

  deleteByToken(token) {
    return this.db.result(`DELETE FROM t_line_notify_tokens WHERE line_token = $1`, token, r => r.rowCount);
  }
}
