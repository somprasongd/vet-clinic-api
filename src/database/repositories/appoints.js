import Repository from '../helpers/repository';

export default class PetsRepository extends Repository {
  constructor(db, pgp) {
    super(db, pgp, 't_appoint', {});
  }

  findById(id) {
    return this.db.oneOrNone(
      `SELECT
      t_appoint.id
      , t_appoint.appoint_date      
      , t_appoint.appoint_time
      , t_appoint.cause
      , t_appoint.remark
      , json_build_object(
        'id', t_pet.id,
        'code', t_pet.code,
        'name', t_pet.name,
        'type', m_pet_type.label,
        'owner',  json_build_object(
                    'id', t_member.id,
                    'code', t_member.code,
                    'name', trim(both ' ' from (m_prefix.label || t_member.first_name || ' ' || t_member.last_name))
                  )
      ) as pet
      , case when c_user.id is null then null else 
      json_build_object(
        'id', c_user.id,
        'name', c_user.name
      ) end as doctor
      FROM t_appoint
      INNER JOIN t_pet on t_pet.id = t_appoint.pet_id
      LEFT JOIN m_pet_type on m_pet_type.id = t_pet.type_id
      INNER JOIN t_member on t_member.id = t_pet.owner_id
      LEFT JOIN m_prefix on m_prefix.id = t_member.prefix_id
      LEFT JOIN c_user on c_user.id = t_appoint.doctor_id
      WHERE t_appoint.id = $1 and t_appoint.active = true`,
      +id
    );
  }

  // find(wheres, options)
  find(wheres, { offset = 0, limit = 'all' }) {
    const { date, dateRange0, dateRange1, petId, doctorId, comeVisitId } = wheres;
    return this.db.task(async t => {
      const p1 = t.manyOrNone(
        `SELECT
        t_appoint.id
        , t_appoint.appoint_date
        , t_appoint.appoint_time
        , t_appoint.cause
        , t_appoint.remark
        , json_build_object(
          'id', t_pet.id,
          'code', t_pet.code,
          'name', t_pet.name,
          'type', m_pet_type.label,
          'owner',  json_build_object(
                      'id', t_member.id,
                      'code', t_member.code,
                      'name', trim(both ' ' from (m_prefix.label || t_member.first_name || ' ' || t_member.last_name))
                    )
        ) as pet
        , case when c_user.id is null then null else 
        json_build_object(
          'id', c_user.id,
          'name', c_user.name
        ) end as doctor
        FROM t_appoint
        INNER JOIN t_pet on t_pet.id = t_appoint.pet_id
        LEFT JOIN m_pet_type on m_pet_type.id = t_pet.type_id
        INNER JOIN t_member on t_member.id = t_pet.owner_id
        LEFT JOIN m_prefix on m_prefix.id = t_member.prefix_id
        LEFT JOIN c_user on c_user.id = t_appoint.doctor_id
        WHERE t_appoint.active=true  ${createSearchCondition(wheres)}
        order by t_appoint.appoint_date, t_appoint.appoint_time
        offset $<offset> limit ${limit}`,
        {
          date,
          dateRange0,
          dateRange1,
          petId,
          doctorId,
          comeVisitId,
          offset,
        }
      );
      const p2 = t.one(
        `SELECT count(*)
        FROM t_appoint
        WHERE t_appoint.active=true ${createSearchCondition(wheres)}`,
        {
          date,
          dateRange0,
          dateRange1,
          petId,
          doctorId,
          comeVisitId,
        },
        a => +a.count
      );
      const [datas, counts] = await Promise.all([p1, p2]);
      return { datas, counts };
    });
  }
}

function createSearchCondition(wheres) {
  const { date, dateRange0, dateRange1, petId, doctorId, comeVisitId } = wheres;
  let conditions = '';
  if (date) {
    conditions += ` AND appoint_date = $<date>`;
  }
  if (dateRange0 || dateRange1) {
    if (dateRange0 && !dateRange1) {
      conditions += ` AND appoint_date >= $<dateRange0>`;
    } else if (dateRange1 && !dateRange0) {
      conditions += ` AND appoint_date <= $<dateRange1>`;
    } else {
      conditions += ` AND appoint_date >= $<dateRange0> AND appoint_date <= $<dateRange1>`;
    }
  }
  if (petId) {
    conditions += ` AND t_appoint.pet_id = $<petId>`;
  }
  if (doctorId) {
    conditions += ` AND t_appoint.doctor_id = $<doctorId>`;
  }
  if (comeVisitId) {
    conditions += ` AND t_appoint.come_visit_id = $<comeVisitId>`;
  }

  return conditions || '';
}
