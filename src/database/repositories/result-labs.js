import Repository from '../helpers/repository';

export default class ResultLabsRepository extends Repository {
  constructor(db, pgp) {
    super(db, pgp, 't_result_lab', {});
  }

  findById(id) {
    return this.db.oneOrNone(
      `SELECT t_result_lab.*
      FROM t_result_lab
      INNER JOIN t_order on t_order.id = t_result_lab.order_id 
        and t_order.active = true and t_order.type_id = 3
      WHERE t_result_lab.id = $1`,
      +id
    );
  }

  // find(wheres, options)
  find(wheres, { offset = 0, limit = 'all' } = {}) {
    const { visitId, label } = wheres;
    return this.db.task(async t => {
      const p1 = t.manyOrNone(
        `SELECT t_result_lab.*
        FROM t_result_lab
        INNER JOIN t_order on t_order.id = t_result_lab.order_id
        WHERE t_order.active = true and t_order.type_id = 3 ${createSearchCondition(wheres)}
        order by order_id, t_result_lab.label
        offset $<offset> limit ${limit}`,
        {
          visitId,
          label,
          offset,
        }
      );
      const p2 = t.one(
        `SELECT count(*)
    FROM t_order
    WHERE t_order.active = true and t_order.type_id = 3 ${createSearchCondition(wheres)}`,
        {
          visitId,
          label,
        },
        a => +a.count
      );
      const [datas, counts] = await Promise.all([p1, p2]);
      return { datas, counts };
    });
  }
}

function createSearchCondition(wheres) {
  const { visitId, label } = wheres;
  let conditions = '';
  if (visitId) {
    conditions += ` AND t_order.visit_id = $<visitId>`;
  }
  if (label) {
    conditions += `  AND t_result_lab.label ilike '%$<label:value>%'`;
  }
  return conditions || '';
}
