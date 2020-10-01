import Repository from '../helpers/repository';

export default class PetsRepository extends Repository {
  constructor(db, pgp) {
    super(db, pgp, 't_pet', {});
  }

  findById(id) {
    return this.db.oneOrNone(
      `SELECT
      t_pet.id
      , t_pet.code
      , t_pet.name
      , t_pet.birth_date
      , t_pet.breed
      , t_pet.death
      , t_pet.earmark
      , t_pet.color
      , t_pet.note
      , t_pet.microchip_no
      , t_pet.sterilization
      , json_build_object(
          'id', m_pet_gender.id,
          'label', m_pet_gender.label
      ) as gender
      , json_build_object(
          'id', m_pet_type.id,
          'label', m_pet_type.label
      ) as type
      FROM t_pet     
      LEFT JOIN m_pet_gender on m_pet_gender.id = t_pet.gender_id
      LEFT JOIN m_pet_type on m_pet_type.id = t_pet.type_id
      WHERE t_pet.id = $1 and t_pet.active = true`,
      +id
    );
  }

  // find(wheres, options)
  find(wheres, { offset = 0, limit = 'all' }) {
    const { code, name, microchipNo, genderId, typeId } = wheres;
    return this.db.task(async t => {
      const p1 = t.manyOrNone(
        `SELECT
      t_pet.id
      , t_pet.code
      , t_pet.name
      , t_pet.birth_date
      , t_pet.breed
      , t_pet.death
      , t_pet.earmark
      , t_pet.color
      , t_pet.note
      , t_pet.microchip_no
      , t_pet.sterilization
      , json_build_object(
          'id', m_pet_gender.id,
          'label', m_pet_gender.label
      ) as gender
      , json_build_object(
          'id', m_pet_type.id,
          'label', m_pet_type.label
      ) as type
      FROM t_pet     
      LEFT JOIN m_pet_gender on m_pet_gender.id = t_pet.gender_id
      LEFT JOIN m_pet_type on m_pet_type.id = t_pet.type_id
      WHERE t_pet.active = true ${createSearchCondition(wheres)}
      order by m_pet_type.label, t_pet.name
      offset $<offset> limit ${limit}`,
        {
          code,
          name,
          microchipNo,
          genderId,
          typeId,
          offset,
        }
      );
      const p2 = t.one(
        `SELECT count(*)
      FROM t_pet
      WHERE t_pet.active = true ${createSearchCondition(wheres)}`,
        {
          code,
          name,
          microchipNo,
          genderId,
          typeId,
        },
        a => +a.count
      );
      const [datas, counts] = await Promise.all([p1, p2]);
      return { datas, counts };
    });
  }
}

function createSearchCondition(wheres) {
  const { code, name, microchipNo, genderId, typeId } = wheres;
  let conditions = '';
  if (code) {
    conditions += ` AND code = $<code>`;
  }
  if (name) {
    conditions += `  AND name = $<name>`;
  }
  if (microchipNo) {
    conditions += ` AND microchip_no = $<microchipNo>`;
  }
  if (genderId) {
    conditions += ` AND gender_id = $<genderId>`;
  }
  if (typeId) {
    conditions += ` AND type_id = $<typeId>`;
  }
  return conditions || '';
}
