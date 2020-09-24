import Repository from '../helpers/repository';

export default class LineNotifyRepository extends Repository {
  constructor(db, pgp) {
    super(db, pgp, 'pets_owner_line_notify_tokens', {
      ownerId: 'owner_id',
      lineToken: 'line_token',
    });
  }

  findAllByOwnerId(ownerId) {
    return this.db.manyOrNone(`SELECT * FROM pets_owner_line_notify_tokens WHERE owner_id = $1`, +ownerId);
  }

  deleteByOwnerId(ownerId) {
    return this.db.result(`DELETE FROM pets_owner_line_notify_tokens WHERE owner_id = $1`, +ownerId, r => r.rowCount);
  }

  deleteByToken(token) {
    return this.db.result(`DELETE FROM pets_owner_line_notify_tokens WHERE line_token = $1`, token, r => r.rowCount);
  }
}
