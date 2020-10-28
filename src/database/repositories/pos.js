import Repository from '../helpers/repository';

export default class POSRepository extends Repository {
  constructor(db, pgp) {
    super(db, pgp, 't_pos', {});
  }

  findById(id) {
    return this.db.oneOrNone(
      `SELECT
      t_pos.*
      , t_receipt.receipt_number
      , case when t_visit.id is null then null else 
      json_build_object(
        'visitAt', t_visit.visit_at,
        'pet', t_pet.name || ' ('|| m_pet_type.label ||')',
        'owner', trim(both ' ' from (m_prefix.label || t_member.first_name || ' ' || t_member.last_name)),
        'tels', t_member.tels
      ) end as visit
      FROM t_pos 
      LEFT JOIN t_receipt on t_receipt.pos_id = t_pos.id
      LEFT JOIN t_visit on t_visit.id = t_pos.visit_id 
      LEFT JOIN t_pet on t_pet.id = t_visit.pet_id
      LEFT JOIN m_pet_type on m_pet_type.id = t_pet.type_id
      LEFT JOIN t_member on t_member.id = t_pet.owner_id
      LEFT JOIN m_prefix on m_prefix.id = t_member.prefix_id
      LEFT JOIN c_user on c_user.id = t_visit.doctor_id
      WHERE t_pos.id = $1`,
      +id
    );
  }

  // find(wheres, options)
  find(wheres, { offset = 0, limit = 'all' } = {}) {
    const { posNumber, receiptNumber, state, states, date, dateRange0, dateRange1 } = wheres;
    return this.db.task(async t => {
      const p1 = t.manyOrNone(
        `SELECT
      t_pos.*
      , t_receipt.receipt_number
      , case when t_visit.id is null then null else 
      json_build_object(
        'visitAt', t_visit.visit_at,
        'pet', t_pet.name || ' ('|| m_pet_type.label ||')',
        'owner', trim(both ' ' from (m_prefix.label || t_member.first_name || ' ' || t_member.last_name)),
        'tels', t_member.tels
      ) end as visit
      FROM t_pos 
      LEFT JOIN t_receipt on t_receipt.pos_id = t_pos.id
      LEFT JOIN t_visit on t_visit.id = t_pos.visit_id 
      LEFT JOIN t_pet on t_pet.id = t_visit.pet_id
      LEFT JOIN m_pet_type on m_pet_type.id = t_pet.type_id
      LEFT JOIN t_member on t_member.id = t_pet.owner_id
      LEFT JOIN m_prefix on m_prefix.id = t_member.prefix_id
      LEFT JOIN c_user on c_user.id = t_visit.doctor_id
      WHERE 1=1 ${createSearchCondition(wheres)}
      order by t_pos.create_at asc
      offset $<offset> limit ${limit}`,
        {
          posNumber,
          receiptNumber,
          state,
          states,
          date,
          dateRange0,
          dateRange1,
          offset,
        }
      );
      const p2 = t.one(
        `SELECT count(*)
        FROM t_pos
        WHERE 1=1 ${createSearchCondition(wheres)}`,
        {
          posNumber,
          receiptNumber,
          state,
          states,
          date,
          dateRange0,
          dateRange1,
        },
        a => +a.count
      );
      const [datas, counts] = await Promise.all([p1, p2]);
      return { datas, counts };
    });
  }
}

function createSearchCondition(wheres) {
  const { posNumber, receiptNumber, state, states, date, dateRange0, dateRange1 } = wheres;
  let conditions = '';
  if (posNumber) {
    conditions += ` AND t_pos.pos_number = $<posNumber>`;
  }
  if (receiptNumber) {
    conditions += ` AND t_receipt.receipt_number = $<receiptNumber>`;
  }
  if (state) {
    conditions += ` AND t_pos.state = $<state>`;
  }
  if (states) {
    conditions += ` AND t_pos.state = ANY($<states>)`;
  }
  if (date) {
    conditions += ` AND t_pos.create_at::date = $<date>::date`;
  }
  if (dateRange0 || dateRange1) {
    if (dateRange0 && !dateRange1) {
      conditions += ` AND t_pos.create_at::date >= $<dateRange0>::date`;
    } else if (dateRange1 && !dateRange0) {
      conditions += ` AND t_pos.create_at::date <= $<dateRange1>::date`;
    } else {
      conditions += ` AND t_pos.create_at::date >= $<dateRange0>::date AND t_pos.create_at::date <= $<dateRange1>::date`;
    }
  }
  return conditions || '';
}
