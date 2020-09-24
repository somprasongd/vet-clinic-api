import Repository from '../helpers/repository';

export default class PetsRepository extends Repository {
  constructor(db, pgp) {
    super(db, pgp, 'pets_visitex', {
      visitId: 'visit_id',
      userUpdateId: 'user_update_id',
      updateDatetime: 'update_datetime',
    });
  }

  findById(id) {
    return this.db.oneOrNone(
      `SELECT
      pets_visitex.id
      , pets_visitex.description
      , pets_visitex.active
      , pets_visitex.visit_id
      , pets_visitex.record_datetime
      FROM pets_visitex 
      WHERE pets_visitex.id = $1`,
      +id
    );
  }
}
