import Repository from '../helpers/repository';

export default class PetsRepository extends Repository {
  constructor(db, pgp) {
    super(db, pgp, 't_order', {});
  }

  updateByVisitId(visitId, obj) {
    return this.db.manyOrNone(
      `UPDATE ${this.tableName} set ${
        Object.keys(obj).length > 1 ? '($2:name)=($2:csv)' : '$2:name=$2:csv'
      }, update_at=current_timestamp WHERE visit_id = $1 RETURNING *`,
      [+visitId, this.columnize(obj)]
    );
  }

  // find(wheres, options)
  find(wheres, { offset = 0, limit = 'all' }) {
    const { visitId, posId } = wheres;
    return this.db.task(async t => {
      const p1 = t.manyOrNone(
        `SELECT * FROM t_order
      WHERE t_order.active = true ${createSearchCondition(wheres)}
      order by type_label, item_label
      offset $<offset> limit ${limit}`,
        {
          visitId,
          posId,
          offset,
        }
      );
      const p2 = t.one(
        `SELECT count(*)
      FROM t_order
      WHERE t_order.active = true ${createSearchCondition(wheres)}`,
        {
          visitId,
          posId,
        },
        a => +a.count
      );
      const [datas, counts] = await Promise.all([p1, p2]);
      return { datas, counts };
    });
  }
}

function createSearchCondition(wheres) {
  const { visitId, posId } = wheres;
  let conditions = '';
  if (visitId) {
    conditions += ` AND visit_id = $<visitId>`;
  }
  if (posId) {
    conditions += `  AND pos_id = $<posId>`;
  }
  return conditions || '';
}
