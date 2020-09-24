import Repository from '../helpers/repository';

export default class ReceiptRepository extends Repository {
  constructor(db, pgp) {
    super(db, pgp, 'pets_pos', {
      posNumber: 'pos_number',
      posDatetime: 'pos_datetime',
      dischargeDatetime: 'discharge_datetime',
      userRecordId: 'user_record_id',
      userUpdateId: 'user_update_id',
      updateDatetime: 'update_datetime',
    });
  }
}
