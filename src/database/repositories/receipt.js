import Repository from '../helpers/repository';

export default class ReceiptRepository extends Repository {
  constructor(db, pgp) {
    super(db, pgp, 'pets_receipt', {
      receiptNumber: 'receipt_number',
      receiptDatetime: 'receipt_datetime',
      billingId: 'billing_id',
      userRecordId: 'user_record_id',
      userUpdateId: 'user_update_id',
      updateDatetime: 'update_datetime',
    });
  }

  isNotExistsByBillingId(billingId) {
    return this.db.one(
      `select NOT EXISTS(select pets_receipt.id from pets_receipt where pets_receipt.active = true and pets_receipt.billing_id = $<billingId>) as is_not_exists`,
      {
        billingId,
      },
      a => a.isNotExists
    );
  }

  listByBillingId(billingId) {
    return this.db.manyOrNone(
      `select
        pets_receipt.id
        ,pets_receipt.receipt_number 
        ,pets_receipt.amount 
        ,pets_receipt.receipt_datetime
      from pets_billing inner join pets_receipt on pets_billing.id =pets_receipt.billing_id
      where
        pets_billing.active = true
        and pets_receipt.active = true
        and pets_billing.id = $<billingId> 
      order by
        pets_receipt.receipt_datetime asc`,
      {
        billingId,
      }
    );
  }
}
