import Repository from '../helpers/repository';

export default class PetsRepository extends Repository {
  constructor(db, pgp) {
    super(db, pgp, 'pets_visitpe', {
      visitId: 'visit_id',
      userUpdateId: 'user_update_id',
      updateDatetime: 'update_datetime',
    });
  }

  findById(id) {
    return this.db.oneOrNone(
      `SELECT
      pets_visitpe.id
      , pets_visitpe.description
      , pets_visitpe.active
      , pets_visitpe.visit_id
      , pets_visitpe.record_datetime
      FROM pets_visitpe 
      WHERE pets_visitpe.id = $1`,
      +id
    );
  }
}
