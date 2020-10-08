import Repository from '../helpers/repository';

export default class PetsRepository extends Repository {
  constructor(db, pgp) {
    super(db, pgp, 't_visit_vitalsign', {});
  }

  // find(wheres, options)
  find(wheres) {
    return this.db.manyOrNone(
      `SELECT *  FROM t_visit_vitalsign WHERE $<this:name> = $<this:csv> order by vital_sign_at desc`,
      this.columnize(wheres)
    );
  }
}
