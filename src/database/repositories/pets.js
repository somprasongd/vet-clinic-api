import Repository from '../helpers/repository';

export default class PetsRepository extends Repository {
  constructor(db, pgp) {
    super(db, pgp, 'pets_pet', {
      birthDate: 'birth_date',
      microchipNo: 'microchip_no',
      isVisitedTypeId: 'is_visited_type_id',
      imageId: 'image_id',
      ownerId: 'owner_id',
      sexId: 'sex_id',
      typeId: 'type_id',
      userUpdateId: 'user_update_id',
      updateDatetime: 'update_datetime',
    });
  }

  findById(id, mediaUrl) {
    return this.db.oneOrNone(
      `SELECT
      pets_pet.id
      , pets_pet.code
      , pets_pet.name
      , pets_pet.birth_date
      , pets_pet.breed
      , pets_pet.death
      , pets_pet.earmark
      , pets_pet.color
      , pets_pet.note
      , pets_pet.microchip_no
      , pets_pet.sterilization
      , pets_pet.is_visited_type_id
      , pets_pet.active
      , case when pets_imageprofile.id is null then null
          else json_build_object(
            'id', pets_imageprofile.id,
            'image', '${mediaUrl}' || pets_imageprofile.image,
            'thumbnail', '${mediaUrl}' || pets_imageprofile.thumbnail
          )
        end as image
      , json_build_object(
            'id', pets_owner.id,
            'code', pets_owner.code,
            'fullName', trim(both ' ' from (pets_prefix.label || pets_owner.first_name || ' ' || pets_owner.last_name)),
            'houseNo', pets_owner.house_no,
            'tels', pets_owner.tels,
            'image', case when ownerImg.id is null then null
                      else json_build_object(
                        'id', ownerImg.id,
                        'image', '${mediaUrl}' || ownerImg.image,
                        'thumbnail', '${mediaUrl}' || ownerImg.thumbnail
                      ) end
        ) as owner
      , json_build_object(
          'id', pets_sex.id,
          'label', pets_sex.label
      ) as sex
      , json_build_object(
          'id', pets_type.id,
          'label', pets_type.label
      ) as type
      FROM pets_pet      
      LEFT JOIN pets_imageprofile on pets_imageprofile.id = pets_pet.image_id      
      LEFT JOIN pets_sex on pets_sex.id = pets_pet.sex_id
      LEFT JOIN pets_type on pets_type.id = pets_pet.type_id
      INNER JOIN pets_owner on pets_owner.id = pets_pet.owner_id
      LEFT JOIN pets_prefix on pets_prefix.id = pets_owner.prefix_id
      LEFT JOIN pets_imageprofile ownerImg on ownerImg.id = pets_owner.image_id
      WHERE pets_pet.id = $1 and pets_pet.active = true`,
      +id
    );
  }

  update(id, obj) {
    return this.db.oneOrNone(
      `UPDATE ${this.tableName} set ${
        Object.keys(obj).length > 1 ? '($2:name)=($2:csv)' : '$2:name=$2:csv'
      } WHERE id = $1 and active = true RETURNING *`,
      [+id, this.columnize(obj)]
    );
  }
}
