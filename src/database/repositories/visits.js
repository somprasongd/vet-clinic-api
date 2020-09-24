import Repository from '../helpers/repository';

export default class PetsRepository extends Repository {
  constructor(db, pgp) {
    super(db, pgp, 'pets_visit', {
      visitDatetime: 'visit_datetime',
      doctorDischargeDatetime: 'doctor_discharge_datetime',
      dischargeDatetime: 'discharge_datetime',
      petId: 'pet_id',
      userUpdateId: 'user_update_id',
      updateDatetime: 'update_datetime',
      visitPriorityId: 'visit_priority_id',
      visitStatusId: 'visit_status_id',
      visitTreatmentId: 'visit_treatment_id',
      visitTypeId: 'visit_type_id',
    });
  }

  findById(id) {
    return this.db.oneOrNone(
      `SELECT
      pets_visit.id
      , pets_visit.vn
      , pets_visit.visit_datetime
      , pets_visit.discharge_datetime
      , pets_visit.note
      , pets_visit.doctor_discharge_datetime
      , json_build_object(
          'id',   pets_pet.id,
          'code', pets_pet.code,
          'name', pets_pet.name,
          'owner',  json_build_object(
                      'id', pets_owner.id,
                      'code', pets_owner.code,
                      'name', trim(both ' ' from (pets_prefix.label || pets_owner.first_name || ' ' || pets_owner.last_name))
                    )
        ) as pet
      , json_build_object(
          'id', pets_visitpriority.id,
          'label', pets_visitpriority.label
      ) as visit_priority
      , json_build_object(
          'id', pets_visitstatus.id,
          'label', pets_visitstatus.label
      ) as visit_status
      , json_build_object(
          'id', pets_visittreatment.id,
          'label', pets_visittreatment.label
      ) as visit_treatment
      , json_build_object(
          'id', pets_visittype.id,
          'label', pets_visittype.label
      ) as visit_type
      , ARRAY (SELECT visitcause_id from pets_visit_visit_cause
        WHERE visit_id = pets_visit.id) as visit_cause
      FROM pets_visit      
      LEFT JOIN pets_visitpriority on pets_visitpriority.id = pets_visit.visit_priority_id
      LEFT JOIN pets_visitstatus on pets_visitstatus.id = pets_visit.visit_status_id
      LEFT JOIN pets_visittreatment on pets_visittreatment.id = pets_visit.visit_treatment_id
      LEFT JOIN pets_visittype on pets_visittype.id = pets_visit.visit_type_id
      INNER JOIN pets_pet on pets_pet.id = pets_visit.pet_id and pets_pet.active = true
      LEFT JOIN pets_type on pets_type.id = pets_pet.type_id
      INNER JOIN pets_owner on pets_owner.id = pets_pet.owner_id and pets_owner.active = true
      LEFT JOIN pets_prefix on pets_prefix.id = pets_owner.prefix_id
      WHERE pets_visit.id = $1`,
      +id
    );
  }

  isVisited(petId) {
    return this.db.oneOrNone(
      `SELECT count(*) FROM pets_visit WHERE pet_id = $1 and visit_status_id not in (6, 7)`,
      +petId,
      a => +a.count > 0
    );
  }

  findCurrentVisitByPetId(petId) {
    return this.db.oneOrNone(`SELECT * FROM pets_visit WHERE pet_id = $1 and visit_status_id not in (6, 7)`, +petId);
  }
}
