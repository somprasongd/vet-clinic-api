import Repository from '../helpers/repository';

export default class PetsRepository extends Repository {
  constructor(db, pgp) {
    super(db, pgp, 'pets_orderset', {
      itemId: 'item_id',
      orderId: 'order_id',
      userUpdateId: 'user_update_id',
      updateDatetime: 'update_datetime',
    });
  }

  findById(id) {
    return this.db.oneOrNone(
      `SELECT
      pets_orderset.id
      , pets_orderset.label
      , pets_orderset.qty
      , pets_orderset.update_datetime
      , json_build_object(
          'id', pets_order.id,
          'label', pets_order.label
        ) as order
      , json_build_object(
          'id', pets_item.id,
          'code', pets_item.code,
          'label', pets_item.label
        ) as item
      FROM pets_orderset
      INNER JOIN pets_order on pets_order.id = pets_orderset.order_id
      INNER JOIN pets_item on pets_item.id = pets_orderset.item_id
      WHERE pets_orderset.id = $1`,
      +id
    );
  }
}
