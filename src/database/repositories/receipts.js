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
      m_payment_type.label as payment_type ,
      m_credit_card_issuer.label as credit_card_issuer ,
      m_credit_card_fees_method.label as credit_card_fees_method ,
      t_receipt.credit_card_fees ,
      t_receipt.details 
    from t_receipt
    inner join m_payment_type on m_payment_type.id = t_receipt.payment_type_id
    left join m_credit_card_issuer on m_credit_card_issuer.id = t_receipt.credit_card_issuer_id
    left join m_credit_card_fees_method on m_credit_card_fees_method.id = t_receipt.credit_card_fees_method_id
    cross join c_site cs 
    where 1=1 ${createSearchCondition({ receiptId, receiptNumber, posId })}`,
      { receiptId, receiptNumber, posId }
    );
  }

  getDetailsByPOSId(posId) {
    return this.db.oneOrNone(
      `select
      array_agg( json_build_object( 'name', orders.name, 'price', orders.price )) as details
    from
      (
      select
        type_label as name, sum(price) as price
      from
        t_order
      where
        t_order.pos_id = $1
        and active = true
      group by
        type_id, type_label
      order by
        type_id ) as orders`,
      +posId
    );
  }
}

function createSearchCondition({ receiptId, receiptNumber, posId }) {
  let conditions = '';
  if (receiptId) {
    conditions += ` AND t_receipt.id = $<receiptId>`;
  }
  if (receiptNumber) {
    conditions += ` AND t_receipt.receipt_number = $<receiptNumber>`;
  }
  if (posId) {
    conditions += ` AND t_receipt.pos_id = $<posId>`;
  }
  return conditions || '';
}
