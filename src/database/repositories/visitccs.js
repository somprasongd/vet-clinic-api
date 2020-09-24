import Repository from '../helpers/repository';

export default class PetsRepository extends Repository {
  constructor(db, pgp) {
    super(db, pgp, 'pets_visitcc', {
      visitId: 'visit_id',
      userUpdateId: 'user_update_id',
      updateDatetime: 'update_datetime',
    });
  }

  findById(id) {
    return this.db.oneOrNone(
      `SELECT
      pets_visitcc.id
      , pets_visitcc.description
      , pets_visitcc.active
      , pets_visitcc.visit_id
      , pets_visitcc.record_datetime
      FROM pets_visitcc 
      WHERE pets_visitcc.id = $1`,
      +id
    );
  }
}
