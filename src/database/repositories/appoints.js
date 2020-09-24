import Repository from '../helpers/repository';

export default class PetsRepository extends Repository {
  constructor(db, pgp) {
    super(db, pgp, 'pets_appoint', {
      appointDate: 'appoint_date',
      appointStartTime: 'appoint_start_time',
      appointEndTime: 'appoint_end_time',
      appointStatusId: 'appoint_status_id',
      appointTypeId: 'appoint_type_id',
      petId: 'pet_id',
      userUpdateId: 'user_update_id',
      updateDatetime: 'update_datetime',
      visitId: 'visit_id',
    });
  }

  findById(id) {
    return this.db.oneOrNone(
      `SELECT
      pets_appoint.id
      , pets_appoint.appoint_date
      , pets_appoint.remark
      , pets_appoint.active
      , pets_appoint.pet_id
      , pets_appoint.visit_id
      , json_build_object(
          'id', pets_appointstatus.id,
          'label', pets_appointstatus.label
      ) as appoint_status
      , json_build_object(
        'id', pets_appointtype.id,
        'label', pets_appointtype.label
    ) as appoint_type
      FROM pets_appoint
      INNER JOIN pets_appointstatus on pets_appointstatus.id = pets_appoint.appoint_status_id
      INNER JOIN pets_appointtype on pets_appointtype.id = pets_appoint.appoint_type_id
      WHERE pets_appoint.id = $1 and pets_appoint.active = true`,
      +id
    );
  }
}
