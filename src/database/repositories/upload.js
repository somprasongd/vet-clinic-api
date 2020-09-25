import Repository from '../helpers/repository';

export default class UploadRepository extends Repository {
  constructor(db, pgp) {
    super(db, pgp, 't_upload', {});
  }

  remove(id) {
    return this.db.any(`DELETE FROM ${this.tableName} WHERE id = $1 RETURNING *`, id);
  }
}
