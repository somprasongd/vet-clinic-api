import Repository from '../helpers/repository';

export default class ReceiptPaymentRepository extends Repository {
  constructor(db, pgp) {
    super(db, pgp, 'pets_receiptpayment', {
      depositIds: 'deposit_ids',
      cardInfo: 'card_info',
      paymentTypeId: 'payment_type_id',
      receiptId: 'receipt_id',
      userRecordId: 'user_record_id',
    });
  }

  listByBillingId(billingId) {
    return this.db.manyOrNone(
      `select
        pets_receiptpayment.id
        ,pets_paymenttype.id as paymenttype_id
        ,pets_paymenttype.label as paymenttype_label
        ,pets_receiptpayment.card_info
        ,pets_receiptpayment.amount
      from pets_billing inner join pets_receipt on pets_billing.id =pets_receipt.billing_id
        inner join pets_receiptpayment on pets_receipt.id = pets_receiptpayment.receipt_id
        inner join pets_paymenttype on  pets_receiptpayment.payment_type_id  = pets_paymenttype.id
      where
        pets_billing.active = true
        and pets_receipt.active = true
        and pets_billing.id =$<billingId>  
      order by
        pets_receiptpayment.record_datetime asc`,
      {
        billingId,
      }
    );
  }
}
