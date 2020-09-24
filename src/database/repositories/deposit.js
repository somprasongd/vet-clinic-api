import Repository from '../helpers/repository';

export default class PetsRepository extends Repository {
  constructor(db, pgp) {
    super(db, pgp, 'pets_deposit', {
      depositNumber: 'deposit_number',
      amount: 'amount',
      depositDatetime: 'deposit_datetime',
      active: 'active',
      note: 'note',
      userRecordId: 'user_record_id',
      userUpdateId: 'user_update_id',
      updateDatetime: 'update_datetime',
      payment: 'payment',
      visitId: 'visit_id',
    });
  }

  countByVisitId(visitId) {
    return this.db.one(
      `select count(*) from pets_deposit where visit_id = $<visitId>`,
      {
        visitId,
      },
      a => +a.count
    );
  }

  listByVisitId(visitId) {
    return this.db.manyOrNone(
      `select * from pets_deposit where visit_id = $<visitId> and active = true order by deposit_datetime`,
      {
        visitId,
      }
    );
  }

  getAmountByVisitId(visitId) {
    return this.db.one(
      `select 
        1 as payment_type_id -- 1 = Deposit
        ,array_agg(pets_deposit.id) as deposit_ids
        ,sum(amount) as amount
      from pets_deposit 
      where pets_deposit.active = true 
        and pets_deposit.visit_id =  $<visitId>`,
      {
        visitId,
      }
    );
  }

  paid({ depositIds }) {
    return this.db.result(
      `update pets_deposit set payment = true where pets_deposit.id = ANY($<depositIds>)`,
      {
        depositIds,
      },
      r => r.rowCount
    );
  }
}
