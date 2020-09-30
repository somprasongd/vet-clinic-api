import Repository from '../helpers/repository';

export default class UsersRepository extends Repository {
  constructor(db, pgp) {
    super(db, pgp, 'c_item', {});
  }

  findAll(params, limit, offset) {
    const { itemId, itemCode, itemLabel, groupId, groupIds, groupLabel, isItemSet } = params;
    return this.db.manyOrNone(
      `SELECT
      c_item.id
      , c_item.code
      , c_item.label
      , c_item.cost
      , c_item.price
      , c_item.is_set
      , json_build_object(
          'id', m_item_group.id,
          'label', m_item_group.label
      ) as item_group
      FROM c_item
      INNER JOIN m_item_group on c_item.item_group_id = m_item_group.id
      WHERE c_item.active = true ${createSearchCondition(params)}
      order by m_item_group.label, c_item.code
      offset $<offset> limit ${limit}`,
      {
        itemId,
        itemCode,
        itemLabel,
        groupId,
        groupIds,
        groupLabel,
        isItemSet,
        offset,
      }
    );
  }

  findAllCount(params) {
    const { itemId, itemCode, itemLabel, groupId, groupIds, groupLabel, isItemSet } = params;
    return this.db.one(
      `SELECT count(*)
      FROM c_item
      INNER JOIN m_item_group on c_item.item_group_id = m_item_group.id
      WHERE c_item.active = true ${createSearchCondition(params)}`,
      {
        itemId,
        itemCode,
        itemLabel,
        groupId,
        groupIds,
        groupLabel,
        isItemSet,
      },
      a => +a.count
    );
  }
}

function createSearchCondition(params) {
  const { itemId, itemCode, itemLabel, groupId, groupIds, groupLabel, isItemSet } = params;
  let conditions = '';
  if (itemId) {
    conditions += ` AND c_item.id = $<itemId>`;
  }
  if (itemCode) {
    conditions += ` AND c_item.code = $<itemCode>`;
  }
  if (itemLabel) {
    conditions += ` AND c_item.label ilike '%$<itemLabel:value>%'`;
  }
  if (groupId) {
    conditions += ` AND m_item_group.id = $<groupId>`;
  }
  if (groupIds) {
    conditions += ` AND m_item_group.id = ANY($<groupIds>)`;
  }
  if (groupLabel) {
    conditions += ` AND m_item_group.label ilike '%$<groupLabel:value>%'`;
  }
  if (isItemSet) {
    conditions += ` AND c_item.is_set = $<isItemSet>`;
  }
  return conditions || '';
}
