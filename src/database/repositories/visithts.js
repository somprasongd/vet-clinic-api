import Repository from '../helpers/repository';

export default class PetsRepository extends Repository {
  constructor(db, pgp) {
    super(db, pgp, 'pets_visitht', {
      visitId: 'visit_id',
      userUpdateId: 'user_update_id',
      updateDatetime: 'update_datetime',
    });
  }

  findById(id) {
    return this.db.oneOrNone(
      `SELECT
      pets_visitht.id
      , pets_visitht.description
      , pets_visitht.active
      , pets_visitht.visit_id
      , pets_visitht.record_datetime
      FROM pets_visitht 
      WHERE pets_visitht.id = $1`,
      +id
    );
  }
}
