import Repository from '../helpers/repository';

export default class PetsRepository extends Repository {
  constructor(db, pgp) {
    super(db, pgp, 't_order', {});
  }

  // listByIds(ids) {
  //   return this.db.oneOrNone(
  //     `SELECT
  //     t_order.id
  //     , t_order.dn
  //     , t_order.label
  //     , t_order.cost
  //     , t_order.record_datetime
  //     , t_order.visit_id
  //     , t_order.pos_id
  //     , t_order.order_status_id
  //     , t_order.qty
  //     , json_build_object(
  //       'id', pets_item.id,
  //       'code', pets_item.code,
  //       'label', pets_item.label,
  //       'itemGroup',  json_build_object(
  //                       'id', pets_itemgroup.id,
  //                       'label', pets_itemgroup.label
  //                     )
  //       ) as item
  //     , json_build_object(
  //         'id', t_orderstatus.id,
  //         'label', t_orderstatus.label
  //       ) as order_status
  //     FROM t_order
  //     INNER JOIN pets_item on pets_item.id = t_order.item_id
  //     INNER JOIN pets_itemgroup on pets_itemgroup.id = pets_item.item_group_id
  //     INNER JOIN t_orderstatus on t_orderstatus.id = t_order.order_status_id
  //     WHERE t_order.id = ANY($<ids>)`,
  //     { ids }
  //   );
  // }

  // countUnproceed(visitId) {
  //   return this.db.one(
  //     `SELECT count(*)
  //     FROM t_order
  //     WHERE t_order.order_status_id = 1
  //     AND t_order.visit_id = $1`,
  //     visitId,
  //     a => +a.count
  //   );
  // }

  // proceed(dn, userId, visitId) {
  //   return this.db.result(
  //     `UPDATE t_order
  //     SET order_status_id = 2
  //       , user_update_id = $<userId>
  //       , update_datetime = now()
  //       , dn=$<dn>
  //     WHERE order_status_id = 1
  //     AND visit_id = $<visitId>`,
  //     {
  //       dn,
  //       userId,
  //       visitId,
  //     },
  //     r => r.rowCount
  //   );
  // }

  // billed({ orderIds }) {
  //   return this.db.result(
  //     `update t_order set billing = true where id = ANY($<orderIds>)`,
  //     {
  //       orderIds,
  //     },
  //     r => r.rowCount
  //   );
  // }

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
