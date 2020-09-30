import Repository, { removeUndefinedColumn } from '../helpers/repository';

export default class UsersRepository extends Repository {
  constructor(db, pgp) {
    super(db, pgp, 'c_item_drug', {});
  }

  update(itemId, model) {
    const obj = removeUndefinedColumn(model);

    return this.db.oneOrNone(
      `UPDATE ${this.tableName} set ${
        Object.keys(obj).length > 1 ? '($2:name)=($2:csv)' : '$2:name=$2:csv'
      }, update_at=current_timestamp WHERE item_id = $1 RETURNING *`,
      [+itemId, this.columnize(obj)]
    );
  }
}
