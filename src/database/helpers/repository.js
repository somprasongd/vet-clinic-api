import { changeToSnakeCase, renameWithKeymap } from './renameObjectKey';

export default class {
  constructor(db, pgp, tableName, keyMap) {
    this.db = db;
    this.pgp = pgp;
    this.tableName = tableName;
    this.keyMap = keyMap || {};
  }

  columnize(obj) {
    const cols = renameWithKeymap(obj, this.keyMap);
    return changeToSnakeCase(cols);
  }

  create(model) {
    const obj = removeUndefinedColumn(model);

    return this.db.one(
      `INSERT INTO ${this.tableName} ($<this:name>) VALUES($<this:csv>) RETURNING *`,
      this.columnize(obj)
    );
  }

  update(id, model) {
    const obj = removeUndefinedColumn(model);

    return this.db.oneOrNone(
      `UPDATE ${this.tableName} set ${
        Object.keys(obj).length > 1 ? '($2:name)=($2:csv)' : '$2:name=$2:csv'
      }, update_at=current_timestamp WHERE id = $1 RETURNING *`,
      [+id, this.columnize(obj)]
    );
  }

  // Tries to delete a pet by id, and returns the number of records deleted;
  remove(id) {
    return this.db.result(`DELETE FROM ${this.tableName} WHERE id = $1`, id, r => r.rowCount);
  }

  removeFrom(tableName, obj) {
    return this.db.result(
      `DELETE FROM ${tableName} WHERE $<this:name> = $<this:csv>`,
      this.columnize(obj),
      r => r.rowCount
    );
  }

  all() {
    return this.db.any(`SELECT * FROM ${this.tableName}`);
  }

  count() {
    return this.db.one(`SELECT count(*) FROM ${this.tableName}`, [], a => +a.count);
  }

  find(obj) {
    return this.db.OrNone(`SELECT * FROM ${this.tableName} WHERE $<this:name> = $<this:csv>`, this.columnize(obj));
  }

  findById(id) {
    return this.db.oneOrNone(`SELECT * FROM ${this.tableName} WHERE id = $1`, +id);
  }
}

export const removeUndefinedColumn = model =>
  Object.keys(model).reduce((acc, cur) => {
    const newObj = { ...acc };
    if (model[cur] !== undefined) {
      newObj[cur] = model[cur];
    }
    return newObj;
  }, {});
