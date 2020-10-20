import Repository from '../helpers/repository';

export default class ItemSetRepository extends Repository {
  constructor(db, pgp) {
    super(db, pgp, 'c_item_set', {});
  }

  findById(id) {
    return this.db.manyOrNone(
      `SELECT c_item.*, c_item_set.item_id as parent_id, c_item_set.id as set_id
    FROM c_item_set 
    INNER JOIN c_item on c_item.id = c_item_set.item_subset_id and c_item.active = true
    WHERE c_item_set.id = $1`,
      +id
    );
  }

  findSubsetByItemId(id) {
    return this.db.manyOrNone(
      `SELECT c_item.*, c_item_set.item_id as parent_id, c_item_set.id as set_id
    FROM c_item_set 
    INNER JOIN c_item on c_item.id = c_item_set.item_subset_id and c_item.active = true
    WHERE c_item_set.item_id = $1`,
      +id
    );
  }
}
