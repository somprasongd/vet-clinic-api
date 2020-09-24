import Repository from '../helpers/repository';

export default class PetsRepository extends Repository {
  constructor(db, pgp) {
    super(db, pgp, 'pets_order', {
      visitId: 'visit_id',
      posId: 'pos_id',
      itemId: 'item_id',
      userRecordId: 'user_record_id',
      userUpdateId: 'user_update_id',
      orderStatusId: 'order_status_id',
      updateDatetime: 'update_datetime',
    });
  }

  findById(id) {
    return this.db.oneOrNone(
      `SELECT
      pets_order.id
      , pets_order.dn
      , pets_order.label
      , pets_order.cost
      , pets_order.record_datetime
      , pets_order.visit_id
      , pets_order.pos_id
      , pets_order.order_status_id
      , pets_order.qty
      , json_build_object(
        'id', pets_item.id,
        'code', pets_item.code,
        'label', pets_item.label,
        'itemGroup',  json_build_object(
                        'id', pets_itemgroup.id,
                        'label', pets_itemgroup.label
                      )
        ) as item
      , json_build_object(
          'id', pets_orderstatus.id,
          'label', pets_orderstatus.label
        ) as order_status
      FROM pets_order
      INNER JOIN pets_item on pets_item.id = pets_order.item_id
      INNER JOIN pets_itemgroup on pets_itemgroup.id = pets_item.item_group_id
      INNER JOIN pets_orderstatus on pets_orderstatus.id = pets_order.order_status_id
      WHERE pets_order.id = $1`,
      +id
    );
  }

  listByIds(ids) {
    return this.db.oneOrNone(
      `SELECT
      pets_order.id
      , pets_order.dn
      , pets_order.label
      , pets_order.cost
      , pets_order.record_datetime
      , pets_order.visit_id
      , pets_order.pos_id
      , pets_order.order_status_id
      , pets_order.qty
      , json_build_object(
        'id', pets_item.id,
        'code', pets_item.code,
        'label', pets_item.label,
        'itemGroup',  json_build_object(
                        'id', pets_itemgroup.id,
                        'label', pets_itemgroup.label
                      )
        ) as item
      , json_build_object(
          'id', pets_orderstatus.id,
          'label', pets_orderstatus.label
        ) as order_status
      FROM pets_order
      INNER JOIN pets_item on pets_item.id = pets_order.item_id
      INNER JOIN pets_itemgroup on pets_itemgroup.id = pets_item.item_group_id
      INNER JOIN pets_orderstatus on pets_orderstatus.id = pets_order.order_status_id
      WHERE pets_order.id = ANY($<ids>)`,
      { ids }
    );
  }

  countUnproceed(visitId) {
    return this.db.one(
      `SELECT count(*)
      FROM pets_order
      WHERE pets_order.order_status_id = 1
      AND pets_order.visit_id = $1`,
      visitId,
      a => +a.count
    );
  }

  proceed(dn, userId, visitId) {
    return this.db.result(
      `UPDATE pets_order
      SET order_status_id = 2
        , user_update_id = $<userId>
        , update_datetime = now()
        , dn=$<dn>
      WHERE order_status_id = 1
      AND visit_id = $<visitId>`,
      {
        dn,
        userId,
        visitId,
      },
      r => r.rowCount
    );
  }

  billed({ orderIds }) {
    return this.db.result(
      `update pets_order set billing = true where id = ANY($<orderIds>)`,
      {
        orderIds,
      },
      r => r.rowCount
    );
  }
}
