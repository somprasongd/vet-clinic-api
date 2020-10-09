import { changeToSnakeCase, renameWithKeymap } from '../helpers/renameObjectKey';
import { removeUndefinedColumn } from '../helpers/repository';

export default class {
  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;
    this.keyMap = {};
  }

  columnize(obj) {
    const cols = renameWithKeymap(obj, this.keyMap);
    return changeToSnakeCase(cols);
  }

  where(model) {
    const obj = this.columnize(model);
    const condition = Object.keys(obj).reduce((acc, cur) => {
      const newObj = { ...acc };
      if (model[cur] !== undefined) {
        newObj[cur] = model[cur];
      }
      return `${acc} and ${cur} = $<${cur}>`;
    }, '');
    const where = this.pgp.as.format(`WHERE 1=1 ${condition}`, { ...obj }); // pre-format WHERE condition
    return where;
  }

  create(tableName, model) {
    const obj = removeUndefinedColumn(model);

    return this.db.one(`INSERT INTO ${tableName} ($<this:name>) VALUES($<this:csv>) RETURNING *`, this.columnize(obj));
  }

  update(tableName, id, model) {
    const obj = removeUndefinedColumn(model);

    return this.db.oneOrNone(
      `UPDATE ${tableName} set ${
        Object.keys(obj).length > 1 ? '($2:name)=($2:csv)' : '$2:name=$2:csv'
      }, update_at=current_timestamp WHERE id = $1 RETURNING *`,
      [+id, this.columnize(obj)]
    );
  }

  // Tries to delete a pet by id, and returns the number of records deleted;
  remove(tableName, id) {
    return this.db.result(`DELETE FROM ${tableName} WHERE id = $1`, +id, r => r.rowCount);
  }

  removeFrom(tableName, obj) {
    return this.db.result(`DELETE FROM ${tableName} $1:raw`, this.where(obj), r => r.rowCount);
  }

  all(tableName) {
    return this.db.any(`SELECT * FROM ${tableName}`);
  }

  count(tableName, obj) {
    return this.db.one(`SELECT count(*) FROM ${tableName} $1:raw`, this.where(obj), a => +a.count);
  }

  find(tableName, obj) {
    return this.db.manyOrNone(`SELECT * FROM ${tableName} $1:raw`, this.where(obj));
  }

  findById(tableName, id) {
    return this.db.oneOrNone(`SELECT * FROM ${tableName} WHERE id = $1`, +id);
  }

  findAll(tableName, search, limit, offset) {
    const conditions = search && ` AND label ilike '%$<search:value>%'`;

    return this.db.manyOrNone(
      `SELECT * FROM ${tableName}
      WHERE active = true ${conditions || ''} order by id offset $<offset> limit ${limit}`,
      {
        search,
        offset,
        limit,
      }
    );
  }

  findAllCount(tableName, search) {
    const conditions = search && ` AND label ilike '%$<search:value>%'`;

    return this.db.one(
      `SELECT count(*) FROM ${tableName} where active = true ${conditions || ''}`,
      {
        search,
      },
      a => +a.count
    );
  }
}
