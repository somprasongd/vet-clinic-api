import Repository from '../helpers/repository';

export default class MembersRepository extends Repository {
  constructor(db, pgp) {
    super(db, pgp, 't_member', {});
  }

  findById(id) {
    return this.db.oneOrNone(
      `SELECT
      t_member.id
      , t_member.code
      , t_member.first_name
      , t_member.last_name
      , trim(both ' ' from (pets_prefix.label || t_member.first_name || ' ' || t_member.last_name)) as full_name
      , t_member.house_no
      , t_member.address
      , t_member.tels
      , t_member.email
      , t_member.old_hn
      , t_member.remark
      , json_build_object(
            'id', pets_prefix.id,
            'label', pets_prefix.label
        ) as prefix
      FROM t_member
      LEFT JOIN pets_prefix on pets_prefix.id = t_member.prefix_id
      WHERE t_member.id = $1 and t_member.active = true`,
      +id
    );
  }

  // find(wheres, options)
  find(wheres, { offset = 0, limit = 'all' }) {
    const { code, firstName, lastName, houseNo } = wheres;
    return this.db.task(async t => {
      const p1 = t.manyOrNone(
        `SELECT
        t_member.id
        , t_member.code
        , t_member.first_name
        , t_member.last_name
        , trim(both ' ' from (pets_prefix.label || t_member.first_name || ' ' || t_member.last_name)) as full_name
        , t_member.house_no
        , t_member.address
        , t_member.tels
        , t_member.email
        , t_member.old_hn
        , t_member.remark
        , json_build_object(
              'id', pets_prefix.id,
              'label', pets_prefix.label
          ) as prefix
        FROM t_member
        LEFT JOIN pets_prefix on pets_prefix.id = t_member.prefix_id
        WHERE t_member.active = true ${createSearchCondition(wheres)}
        order by t_member.first_name, t_member.last_name
        offset $<offset> limit ${limit}`,
        {
          code,
          firstName,
          lastName,
          houseNo,
          offset,
        }
      );
      const p2 = t.one(
        `SELECT count(*)
        FROM t_member
        WHERE t_member.active = true ${createSearchCondition(wheres)}`,
        {
          code,
          firstName,
          lastName,
          houseNo,
        },
        a => +a.count
      );
      const [datas, counts] = await Promise.all([p1, p2]);
      return { datas, counts };
    });
  }
}

function createSearchCondition(wheres) {
  const { code, firstName, lastName, houseNo } = wheres;
  let conditions = '';
  if (code) {
    conditions += ` AND code = $<code>`;
  }
  if (firstName) {
    conditions += ` AND first_name ilike '%$<firstName:value>%'`;
  }
  if (lastName) {
    conditions += ` AND last_name ilike '%$<lastName:value>%'`;
  }
  if (houseNo) {
    conditions += ` AND house_no ilike '%$<houseNo:value>%'`;
  }
  return conditions || '';
}
