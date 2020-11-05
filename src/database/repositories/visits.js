import Repository from '../helpers/repository';

export default class PetsRepository extends Repository {
  constructor(db, pgp) {
    super(db, pgp, 't_visit', {});
  }

  findById(id) {
    return this.db.oneOrNone(
      `SELECT
      t_visit.id
      , t_visit.vn
      , t_visit.visit_at
      , json_build_object(
        'id', m_visit_type.id,
        'label', m_visit_type.label
      ) as visit_type
      , json_build_object(
        'id', m_visit_status.id,
        'label', m_visit_status.label
      ) as visit_status
      , json_build_object(
        'id', m_visit_priority.id,
        'label', m_visit_priority.label
      ) as visit_priority
      , t_visit.visit_cause
      , t_visit.note
      , t_visit.cc
      , t_visit.dx
      , t_visit.ht
      , t_visit.pe
      , t_visit.discharge_at
      , t_visit.doctor_discharge_at
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
      , case when c_user.id is null then null else json_build_object(
          'id', c_user.id,
          'name', c_user.name
        ) end as doctor
      FROM t_visit      
      LEFT JOIN m_visit_priority on m_visit_priority.id = t_visit.visit_priority_id
      LEFT JOIN m_visit_status on m_visit_status.id = t_visit.visit_status_id
      LEFT JOIN m_visit_type on m_visit_type.id = t_visit.visit_type_id
      INNER JOIN t_pet on t_pet.id = t_visit.pet_id
      LEFT JOIN m_pet_type on m_pet_type.id = t_pet.type_id
      INNER JOIN t_member on t_member.id = t_pet.owner_id
      LEFT JOIN m_prefix on m_prefix.id = t_member.prefix_id
      LEFT JOIN c_user on c_user.id = t_visit.doctor_id
      WHERE t_visit.id = $1`,
      +id
    );
  }

  isVisited(petId) {
    return this.db.oneOrNone(
      `SELECT count(*) FROM t_visit WHERE pet_id = $1 and visit_status_id not in (7, 8, 9)`,
      +petId,
      a => +a.count > 0
    );
  }

  isDaycared(petId) {
    return this.db.oneOrNone(
      `SELECT count(*) FROM t_visit WHERE pet_id = $1 and visit_status_id = 9`,
      +petId,
      a => +a.count > 0
    );
  }

  dischargeDoctor(id) {
    return this.db.oneOrNone(
      `UPDATE t_visit set 
      doctor_discharge_at=current_timestamp
      , visit_status_id = 6
      WHERE id = $1 RETURNING *`,
      [+id]
    );
  }

  dischargeFinance(id, userId) {
    return this.db.oneOrNone(
      `UPDATE t_visit set 
      discharge_at=current_timestamp 
      , discharge_by= $1 
      , visit_status_id = 7
      WHERE id = $2 RETURNING *`,
      [+userId, +id]
    );
  }

  findCurrentVisitByPetId(petId) {
    return this.db.oneOrNone(`SELECT * FROM t_visit WHERE pet_id = $1 and visit_status_id not in (7, 8, 9)`, +petId);
  }

  // find(wheres, options)
  find(wheres, { offset = 0, limit = 'all' }) {
    const { date, dateRange0, dateRange1, vn, petId, visitPriorityId, visitStatusId, visitTypeId, doctorId } = wheres;
    return this.db.task(async t => {
      const p1 = t.manyOrNone(
        `SELECT
      t_visit.id
      , t_visit.vn
      , t_visit.visit_at
      , json_build_object(
        'id', m_visit_type.id,
        'label', m_visit_type.label
      ) as visit_type
      , json_build_object(
        'id', m_visit_status.id,
        'label', m_visit_status.label
      ) as visit_status
      , json_build_object(
        'id', m_visit_priority.id,
        'label', m_visit_priority.label
      ) as visit_priority
      , t_visit.visit_cause
      , t_visit.note
      , t_visit.cc
      , t_visit.dx
      , t_visit.ht
      , t_visit.pe
      , t_visit.discharge_at
      , t_visit.doctor_discharge_at
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
      , case when c_user.id is null then null else json_build_object(
          'id', c_user.id,
          'name', c_user.name
        ) end as doctor
      FROM t_visit      
      LEFT JOIN m_visit_priority on m_visit_priority.id = t_visit.visit_priority_id
      LEFT JOIN m_visit_status on m_visit_status.id = t_visit.visit_status_id
      LEFT JOIN m_visit_type on m_visit_type.id = t_visit.visit_type_id
      INNER JOIN t_pet on t_pet.id = t_visit.pet_id
      LEFT JOIN m_pet_type on m_pet_type.id = t_pet.type_id
      INNER JOIN t_member on t_member.id = t_pet.owner_id
      LEFT JOIN m_prefix on m_prefix.id = t_member.prefix_id
      LEFT JOIN c_user on c_user.id = t_visit.doctor_id
      WHERE t_visit.visit_status_id not in (7, 8)  ${createSearchCondition(wheres)}
      order by t_visit.visit_at
      offset $<offset> limit ${limit}`,
        {
          date,
          dateRange0,
          dateRange1,
          vn,
          petId,
          visitPriorityId,
          visitStatusId,
          visitTypeId,
          doctorId,
          offset,
        }
      );
      const p2 = t.one(
        `SELECT count(*)
        FROM t_visit
        INNER JOIN t_pet on t_pet.id = t_visit.pet_id
        INNER JOIN t_member on t_member.id = t_pet.owner_id
        WHERE t_visit.visit_status_id not in (7, 8) ${createSearchCondition(wheres)}`,
        {
          date,
          dateRange0,
          dateRange1,
          vn,
          petId,
          visitPriorityId,
          visitStatusId,
          visitTypeId,
          doctorId,
        },
        a => +a.count
      );
      const [datas, counts] = await Promise.all([p1, p2]);
      return { datas, counts };
    });
  }
}

function createSearchCondition(wheres) {
  const { date, dateRange0, dateRange1, vn, petId, visitPriorityId, visitStatusId, visitTypeId, doctorId } = wheres;
  let conditions = '';
  if (date) {
    conditions += ` AND t_visit.visit_at = $<date>`;
  }
  if (dateRange0 || dateRange1) {
    if (dateRange0 && !dateRange1) {
      conditions += ` AND t_visit.visit_at >= $<dateRange0>`;
    } else if (dateRange1 && !dateRange0) {
      conditions += ` AND t_visit.visit_at <= $<dateRange1>`;
    } else {
      conditions += ` AND t_visit.visit_at >= $<dateRange0> AND t_visit.visit_at <= $<dateRange1>`;
    }
  }
  if (vn) {
    conditions += ` AND t_visit.vn = $<vn>`;
  }
  if (petId) {
    conditions += ` AND t_visit.pet_id = $<petId>`;
  }
  if (visitPriorityId) {
    conditions += ` AND t_visit.visit_priority_id = $<visitPriorityId>`;
  }
  if (visitStatusId) {
    conditions += ` AND t_visit.visit_status_id = $<visitStatusId>`;
  }
  if (visitTypeId) {
    conditions += ` AND t_visit.visit_type_id = $<visitTypeId>`;
  }
  if (doctorId) {
    conditions += ` AND t_visit.doctor_id = $<doctorId>`;
  }
  return conditions || '';
}
