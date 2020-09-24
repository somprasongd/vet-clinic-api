import Repository from '../helpers/repository';

export default class PetsRepository extends Repository {
  constructor(db, pgp) {
    super(db, pgp, 'pets_visitvitalsign', {
      visitId: 'visit_id',
      userUpdateId: 'user_update_id',
      updateDatetime: 'update_datetime',
      vitalSignDatetime: 'vital_sign_datetime',
      respiratoryRate: 'respiratory_rate',
      bloodPressureSystolic: 'blood_pressure_systolic',
      bloodPressureDiastolic: 'blood_pressure_diastolic',
      painScore: 'pain_score',
    });
  }

  findById(id) {
    return this.db.oneOrNone(
      `SELECT
      pets_visitvitalsign.id
      , pets_visitvitalsign.vital_sign_datetime
      , pets_visitvitalsign.temperature
      , pets_visitvitalsign.respiratory_rate
      , pets_visitvitalsign.blood_pressure_systolic
      , pets_visitvitalsign.blood_pressure_diastolic
      , pets_visitvitalsign.weight
      , pets_visitvitalsign.pain_score
      , pets_visitvitalsign.bcs
      , pets_visitvitalsign.active
      , pets_visitvitalsign.visit_id
      FROM pets_visitvitalsign 
      WHERE pets_visitvitalsign.id = $1`,
      +id
    );
  }
}
