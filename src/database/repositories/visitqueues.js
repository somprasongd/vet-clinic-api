import Repository from '../helpers/repository';

export default class PetsRepository extends Repository {
  constructor(db, pgp) {
    super(db, pgp, 'pets_visitqueue', {
      visitId: 'visit_id',
      doctorId: 'doctor_id',
      userUpdateId: 'user_update_id',
      updateDatetime: 'update_datetime',
      queueDatetime: 'queue_datetime',
    });
  }

  findById(id) {
    return this.db.oneOrNone(
      `SELECT
      pets_visitqueue.id
      , pets_visitqueue.queue_datetime
      , pets_visitqueue.active
      , json_build_object(
        'id', pets_visit.id,
        'priority', pets_visitpriority.label,
        'status', pets_visitstatus.label,
        'treatment', pets_visittreatment.label,
        'type', pets_visittype.label,
        'note', pets_visit.note,
        'causes', (SELECT json_agg(t) from (SELECT pets_visitcause.id, pets_visitcause.label from pets_visit_visit_cause
                    INNER JOIN pets_visitcause on pets_visitcause.id = pets_visit_visit_cause.visitcause_id
                    WHERE visit_id = pets_visit.id) t),
        'vs', (SELECT to_json(t) from (SELECT pets_visitvitalsign.temperature, pets_visitvitalsign.weight
                FROM pets_visitvitalsign
                WHERE visit_id = pets_visit.id
                ORDER BY update_datetime ASC LIMIT 1) t),
        'pet', json_build_object(
                  'id', pets_pet.id,
                  'name', pets_pet.name,
                  'type', pets_type.label,
                  'owner', trim(both ' ' from (pets_prefix.label || pets_owner.first_name || ' ' || pets_owner.last_name))
                )
        ) as visit
      , json_build_object(
          'id', auth_user.id,
          'username', auth_user.username,
          'name', trim(both ' ' from (auth_user.first_name || ' ' || auth_user.last_name))
        ) as doctor
      FROM pets_visitqueue
      INNER JOIN pets_visit on pets_visit.id = pets_visitqueue.visit_id
      LEFT JOIN pets_visitpriority on pets_visitpriority.id = pets_visit.visit_priority_id
      LEFT JOIN pets_visitstatus on pets_visitstatus.id = pets_visit.visit_status_id
      LEFT JOIN pets_visittreatment on pets_visittreatment.id = pets_visit.visit_treatment_id
      LEFT JOIN pets_visittype on pets_visittype.id = pets_visit.visit_type_id
      INNER JOIN pets_pet on pets_pet.id = pets_visit.pet_id and pets_pet.active = true
      LEFT JOIN pets_type on pets_type.id = pets_pet.type_id
      INNER JOIN pets_owner on pets_owner.id = pets_pet.owner_id and pets_owner.active = true
      LEFT JOIN pets_prefix on pets_prefix.id = pets_owner.prefix_id
      LEFT JOIN auth_user on pets_visitqueue.doctor_id = auth_user.id
      WHERE pets_visitqueue.id = $1`,
      +id
    );
  }

  updateByVisitId(visitId, obj) {
    return this.db.oneOrNone(
      `UPDATE pets_visitqueue set ${
        Object.keys(obj).length > 1 ? '($2:name)=($2:csv)' : '$2:name=$2:csv'
      } WHERE visit_id = $1 RETURNING *`,
      [visitId, this.columnize(obj)]
    );
  }
}
