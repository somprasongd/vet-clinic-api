import Repository from '../helpers/repository';

export default class ReceiptRepository extends Repository {
  constructor(db, pgp) {
    super(db, pgp, 't_receipt', {});
  }

  findByKey({ receiptId, receiptNumber, posId }) {
    return this.db.oneOrNone(
      `select
      cs.name as clinic_name ,
      cs.branch_no ,
      cs.branch_name ,
      cs.phone ,
      cs.address ,
      t_receipt.receipt_number ,
      t_receipt.qty ,
      t_receipt.sales_price ,
      t_receipt.discount ,
      t_receipt.net_price ,
      (
      select
        array_agg( json_build_object( 'name', orders.name, 'price', orders.price ))
      from
        (
        select
          type_label as name, sum(price) as price
        from
          t_order
        where
          t_order.pos_id = t_receipt.id
          and active = true
        group by
          type_id, type_label
        order by
          type_id ) as orders) as details
    from
      t_receipt
    cross join c_site cs 
    where 1=1 ${createSearchCondition({ receiptId, receiptNumber, posId })}`,
      { receiptId, receiptNumber, posId }
    );
  }

  findById(id) {
    return this.db.oneOrNone(
      `SELECT
      t_receipt.*
      , case when t_visit.id is null then null else 
      json_build_object(
        'visitAt', t_visit.visit_at,
        'pet', t_pet.name || ' ('|| m_pet_type.label ||')',
        'owner', trim(both ' ' from (m_prefix.label || t_member.first_name || ' ' || t_member.last_name)),
        'tels', t_member.tels
      ) end as visit
      FROM t_receipt 
      LEFT JOIN t_visit on t_visit.id = t_receipt.visit_id 
      LEFT JOIN t_pet on t_pet.id = t_visit.pet_id
      LEFT JOIN m_pet_type on m_pet_type.id = t_pet.type_id
      LEFT JOIN t_member on t_member.id = t_pet.owner_id
      LEFT JOIN m_prefix on m_prefix.id = t_member.prefix_id
      LEFT JOIN c_user on c_user.id = t_visit.doctor_id
      WHERE t_receipt.id = $1`,
      +id
    );
  }
}

function createSearchCondition({ receiptId, receiptNumber, posId }) {
  let conditions = '';
  if (receiptId) {
    conditions += ` AND t_receipt.id = $<posNumber>`;
  }
  if (receiptNumber) {
    conditions += ` AND t_receipt.receipt_number = $<receiptNumber>`;
  }
  if (posId) {
    conditions += ` AND t_receipt.pos_id = $<posId>`;
  }
  return conditions || '';
}
