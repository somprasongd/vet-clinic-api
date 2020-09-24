import Repository from '../helpers/repository';

export default class PetsRepository extends Repository {
  constructor(db, pgp) {
    super(db, pgp, 'pets_xrayresult', {
      orderId: 'order_id',
      orderSetId: 'order_set_id',
      orderStatusId: 'order_status_id',
      userUpdateId: 'user_update_id',
      updateDatetime: 'update_datetime',
    });
  }

  findById(id) {
    return this.db.oneOrNone(
      `SELECT
      pets_xrayresult.id
      , pets_xrayresult.xn
      , pets_xrayresult.result
      , pets_xrayresult.update_datetime
      , json_build_object(
          'id', pets_order.id,
          'label', pets_order.label
        ) as order
      , case when pets_orderset.id is null then null else json_build_object(
          'id', pets_orderset.id,
          'label', pets_orderset.label
        ) end as orderset      
      , json_build_object(
          'id', pets_orderstatus.id,
          'label', pets_orderstatus.label
        ) as order_status
      FROM pets_xrayresult
      INNER JOIN pets_order on pets_order.id = pets_xrayresult.order_id
      LEFT JOIN pets_orderset on pets_orderset.id = pets_xrayresult.order_set_id
      INNER JOIN pets_orderstatus on pets_orderstatus.id = pets_xrayresult.order_status_id
      WHERE pets_xrayresult.id = $1`,
      +id
    );
  }

  proceed(xn, userId, visitId) {
    return this.db.result(
      `UPDATE pets_xrayresult
      SET order_status_id = 2
        , user_update_id = $<userId>
        , update_datetime = now()
        , xn=$<xn>
      FROM pets_order
      WHERE pets_order.id = pets_xrayresult.order_id
      AND pets_order.order_status_id = 1
      AND pets_order.visit_id = $<visitId>`,
      {
        xn,
        userId,
        visitId,
      },
      r => r.rowCount
    );
  }

  cancel(userId, orderId) {
    return this.db.result(
      `UPDATE pets_xrayresult
      SET order_status_id = 3
        , user_update_id = $<userId>
        , update_datetime = now()
     WHERE order_id = $<orderId>`,
      {
        userId,
        orderId,
      },
      r => r.rowCount
    );
  }
}
