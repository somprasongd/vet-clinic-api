import config from '../../common/config';
import Repository from '../helpers/repository';

const { ENABLE_SEARCH_OLD_HN } = config;

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
      , trim(both ' ' from (m_prefix.label || t_member.first_name || ' ' || t_member.last_name)) as full_name
      , t_member.house_no
      , t_member.address
      , t_member.tels
      , t_member.email
      , t_member.old_hn
      , t_member.remark
      , t_member.avatar_id
      , json_build_object(
            'id', m_prefix.id,
            'label', m_prefix.label
        ) as prefix
      FROM t_member
      LEFT JOIN m_prefix on m_prefix.id = t_member.prefix_id
      WHERE t_member.id = $1 and t_member.active = true`,
      +id
    );
  }

  // find(wheres, options)
  find(wheres, { offset = 0, limit = 'all' }) {
    const { code, firstName, lastName, houseNo, tel } = wheres;
    return this.db.task(async t => {
      const p1 = t.manyOrNone(
        `SELECT
        t_member.id
        , t_member.code
        , t_member.first_name
        , t_member.last_name
        , trim(both ' ' from (m_prefix.label || t_member.first_name || ' ' || t_member.last_name)) as full_name
        , t_member.house_no
        , t_member.address
        , t_member.tels
        , t_member.email
        , t_member.old_hn
        , t_member.remark
        , json_build_object(
              'id', m_prefix.id,
              'label', m_prefix.label
          ) as prefix
        FROM t_member
        LEFT JOIN m_prefix on m_prefix.id = t_member.prefix_id
        WHERE t_member.active = true ${createSearchCondition(wheres)}
        order by t_member.first_name, t_member.last_name
        offset $<offset> limit ${limit}`,
        {
          code,
          firstName,
          lastName,
          houseNo,
          tel,
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
          tel,
        },
        a => +a.count
      );
      const [datas, counts] = await Promise.all([p1, p2]);
      return { datas, counts };
    });
  }

  // find(wheres, options)
  findWithPet(wheres, { offset = 0, limit = 'all' }) {
    const { firstName, lastName, houseNo, petName, tel, code, microchipNo } = wheres;
    const { conditions, orderby } = createSearchWithPetCondition(wheres);
    return this.db.task(async t => {
      const p1 = t.manyOrNone(
        `SELECT
        t_member.id
        , t_member.code ${
          ENABLE_SEARCH_OLD_HN ? `|| case when t_member.old_hn is null then '' else ' | ' ||  t_member.old_hn  end` : ''
        } as code
        , trim(both ' ' from (m_prefix.label || t_member.first_name || ' ' || t_member.last_name)) as full_name
        , trim(both ' ' from (t_member.house_no || ' ' || t_member.address)) as full_address
        , t_member.tels
        , case when count(t_pet.id) = 0 
          then '{}'
          else array_agg(json_build_object(
              'id', t_pet.id,
              'code', t_pet.code,
              'name', t_pet.name,
              'type', json_build_object(
                        'id', m_pet_type.id,
                        'label', m_pet_type.label
                      ),
              'gender',  json_build_object(
                        'id', m_pet_gender.id,
                        'label', m_pet_gender.label
                      ),
              'color', t_pet.color,
              'microchip', t_pet.microchip_no
          )) 
          end as pets
        FROM t_member
        LEFT JOIN m_prefix on m_prefix.id = t_member.prefix_id
        LEFT JOIN t_pet on t_pet.owner_id = t_member.id and t_pet.active = true
        LEFT JOIN m_pet_gender on m_pet_gender.id = t_pet.gender_id
        LEFT JOIN m_pet_type on m_pet_type.id = t_pet.type_id
        WHERE t_member.active = true ${conditions}
        GROUP BY t_member.id, m_prefix.label
        order by ${orderby}
        offset $<offset> limit ${limit}`,
        {
          firstName,
          lastName,
          houseNo,
          petName,
          tel,
          code,
          microchipNo,
          offset,
        }
      );
      const p2 = t.one(
        `SELECT count(distinct(t_member.id))
      FROM t_member
      LEFT JOIN t_pet on t_pet.owner_id = t_member.id and t_pet.active = true
      WHERE t_member.active = true ${conditions}`,
        {
          firstName,
          lastName,
          houseNo,
          petName,
          tel,
          code,
          microchipNo,
        },
        a => +a.count
      );
      const [datas, counts] = await Promise.all([p1, p2]);
      return { datas, counts };
    });
  }
}

function createSearchCondition(wheres) {
  const { code, firstName, lastName, houseNo, tel } = wheres;
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
  if (tel) {
    conditions += ` AND $<tel> = ANY(t_member.tels)`;
  }
  return conditions || '';
}

function createSearchWithPetCondition(wheres) {
  const { firstName, lastName, houseNo, petName, tel, code, microchipNo } = wheres;
  let conditions = '';
  let orderby = 't_member.house_no, t_member.first_name, t_member.last_name';
  if (houseNo) {
    conditions += ` AND t_member.house_no ilike '$<houseNo:value>%'`;
  }
  if (code) {
    conditions += ` AND (t_member.code ilike '$<code:value>%' ${
      ENABLE_SEARCH_OLD_HN ? `or t_member.old_hn ilike '$<code:value>%'` : ''
    })`;
  }
  if (tel) {
    conditions += ` AND $<tel> = ANY(t_member.tels)`;
    orderby = 't_member.tels, t_member.house_no, t_member.first_name, t_member.last_name';
  }
  if (firstName) {
    conditions += ` AND t_member.first_name ilike '%$<firstName:value>%'`;
    orderby = 't_member.first_name, t_member.last_name, t_member.house_no';
  }
  if (lastName) {
    conditions += ` AND t_member.last_name ilike '%$<lastName:value>%'`;
    orderby = 't_member.last_name, t_member.first_name, t_member.house_no';
  }
  if (petName) {
    conditions += ` AND t_pet.name ilike '%$<petName:value>%'`;
  }
  if (microchipNo) {
    conditions += ` AND t_pet.microchip_no ilike '$<microchipNo:value>%'`;
  }

  return { conditions: conditions || '', orderby };
}
