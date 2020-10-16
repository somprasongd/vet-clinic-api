import Repository, { removeUndefinedColumn } from '../helpers/repository';

export default class OrderDrugsRepository extends Repository {
  constructor(db, pgp) {
    super(db, pgp, 't_order_drug', {});
  }

  findByOrderId(orderId) {
    return this.db.oneOrNone(`SELECT * FROM t_order_drug WHERE order_id = $1`, +orderId);
  }

  updateByOrderId(orderId, model) {
    const obj = removeUndefinedColumn(model);

    return this.db.oneOrNone(
      `UPDATE ${this.tableName} set ${
        Object.keys(obj).length > 1 ? '($2:name)=($2:csv)' : '$2:name=$2:csv'
      }, update_at=current_timestamp WHERE order_id = $1 RETURNING *`,
      [+orderId, this.columnize(obj)]
    );
  }
}
