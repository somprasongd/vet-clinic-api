import Repository from '../helpers/repository';

export default class UsersRepository extends Repository {
  constructor(db, pgp) {
    super(db, pgp, 'c_item', {});
  }

  // find(wheres, options)
  find(wheres, { offset = 0, limit = 'all' }) {
    const { code, label, groupId, groupIds, groupLabel, isSet } = wheres;
    return this.db.task(async t => {
      const p1 = t.manyOrNone(
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
      WHERE c_item.active = true ${createSearchCondition(wheres)}
      order by m_item_group.label, c_item.code
      offset $<offset> limit ${limit}`,
        {
          code,
          label,
          groupId,
          groupIds,
          groupLabel,
          isSet,
          offset,
        }
      );
      const p2 = t.one(
        `SELECT count(*)
      FROM c_item
      INNER JOIN m_item_group on c_item.item_group_id = m_item_group.id
      WHERE c_item.active = true ${createSearchCondition(wheres)}`,
        {
          code,
          label,
          groupId,
          groupIds,
          groupLabel,
          isSet,
        },
        a => +a.count
      );
      const [datas, counts] = await Promise.all([p1, p2]);
      return { datas, counts };
    });
  }
}

function createSearchCondition(params) {
  const { code, label, groupId, groupIds, groupLabel, isSet } = params;
  let conditions = '';
  if (code) {
    conditions += ` AND c_item.code = $<code>`;
  }
  if (label) {
    conditions += ` AND c_item.label ilike '%$<label:value>%'`;
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
  if (isSet) {
    conditions += ` AND c_item.is_set = $<isSet>`;
  }
  return conditions || '';
}
