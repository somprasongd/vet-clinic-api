import Repository from '../helpers/repository';

export default class BillingRepository extends Repository {
  constructor(db, pgp) {
    super(db, pgp, 'pets_billing', {
      orderIds: 'order_ids',
      orderPosids: 'order_pos_ids',
      discountPercent: 'discount_percent',
      discountBaht: 'discount_baht',
      allTotal: 'all_total',
      totalPayment: 'total_payment',
      billingTypeId: 'billing_type_id',
      posId: 'pos_id',
      userRecordId: 'user_record_id',
      userUpdateId: 'user_update_id',
      updateDatetime: 'update_datetime',
      visitId: 'visit_id',
    });
  }

  isNotExistsByPosId(posId) {
    return this.db.one(
      `select NOT EXISTS(select pets_billing.id from pets_billing 
      where pets_billing.active = true and pets_billing.pos_id = $<posId>) as is_not_exists`,
      {
        posId,
      },
      a => a.isNotExists
    );
  }

  findByPosId(posId) {
    return this.db.oneOrNone(
      `select * from pets_billing 
      where pets_billing.active = true and pets_billing.pos_id = $<posId>`,
      {
        posId,
      }
    );
  }

  isNotExistsByVisitId(visitId) {
    return this.db.one(
      `select NOT EXISTS(select pets_billing.id from pets_billing 
      where pets_billing.active = true and pets_billing.visit_id = $<visitId>) as is_not_exists`,
      {
        visitId,
      },
      a => a.isNotExists
    );
  }

  findByVisitId(visitId) {
    return this.db.oneOrNone(
      `select * from pets_billing 
      where pets_billing.active = true and pets_billing.visit_id = $<visitId>`,
      {
        visitId,
      }
    );
  }

  isRemainById(id) {
    return this.db.one(
      `select EXISTS(select remain from pets_billing where pets_billing.active = true and  pets_billing.id =$<id> and pets_billing.remain > 0) as is_not_exists`,
      {
        id,
      },
      a => a.isNotExists
    );
  }
}
