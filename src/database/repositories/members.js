import Repository from '../helpers/repository';

export default class MembersRepository extends Repository {
  constructor(db, pgp) {
    super(db, pgp, 'pets_owner', {
      firstName: 'first_name',
      lastName: 'last_name',
      houseNo: 'house_no',
      oldHn: 'old_hn',
      imageId: 'image_id',
      prefixId: 'prefix_id',
      userUpdateId: 'user_update_id',
      updateDatetime: 'update_datetime',
    });
  }

  findById(id, mediaUrl) {
    return this.db.oneOrNone(
      `SELECT
      pets_owner.id
      , pets_owner.code
      , pets_owner.first_name
      , pets_owner.last_name
      , trim(both ' ' from (pets_prefix.label || pets_owner.first_name || ' ' || pets_owner.last_name)) as full_name
      , pets_owner.house_no
      , pets_owner.address
      , pets_owner.tels
      , pets_owner.email
      , pets_owner.old_hn
      , pets_owner.remark
      , case when pets_imageprofile.id is null then null
          else json_build_object(
            'id', pets_imageprofile.id,
            'image', '${mediaUrl}' || pets_imageprofile.image,
            'thumbnail', '${mediaUrl}' || pets_imageprofile.thumbnail
          )
        end as image
      , json_build_object(
            'id', pets_prefix.id,
            'label', pets_prefix.label
        ) as prefix
      FROM pets_owner
      LEFT JOIN pets_prefix on pets_prefix.id = pets_owner.prefix_id
      LEFT JOIN pets_imageprofile on pets_imageprofile.id = pets_owner.image_id
      WHERE pets_owner.id = $1 and pets_owner.active = true`,
      +id
    );
  }

  // find(wheres, options)
  find({ code, firstName, lastName, houseNo }, { offset = 0, limit = 10, mediaUrl }) {
    return this.db.task(async t => {
      let conditions = '';
      if (code) {
        conditions += ` AND code = $<code>`;
      }
      if (firstName) {
        conditions += ` AND first_name ilike '%$<firstName:value>%'`;
      }
      if (lastName) {
        conditions += ` AND last_name ilike '%$<lastName:value>%'`;
      }
      if (houseNo) {
        conditions += ` AND house_no ilike '%$<houseNo:value>%'`;
      }

      const p1 = t.manyOrNone(
        `SELECT
        pets_owner.id
        , pets_owner.code
        , pets_owner.first_name
        , pets_owner.last_name
        , trim(both ' ' from (pets_prefix.label || pets_owner.first_name || ' ' || pets_owner.last_name)) as full_name
        , pets_owner.house_no
        , pets_owner.address
        , pets_owner.tels
        , pets_owner.email
        , pets_owner.old_hn
        , pets_owner.remark
        , case when pets_imageprofile.id is null then null
            else json_build_object(
              'id', pets_imageprofile.id,
              'image', '${mediaUrl}' || pets_imageprofile.image,
              'thumbnail', '${mediaUrl}' || pets_imageprofile.thumbnail
            )
          end as image
        , json_build_object(
              'id', pets_prefix.id,
              'label', pets_prefix.label
          ) as prefix
        FROM pets_owner
        LEFT JOIN pets_prefix on pets_prefix.id = pets_owner.prefix_id
        LEFT JOIN pets_imageprofile on pets_imageprofile.id = pets_owner.image_id
        WHERE pets_owner.active = true ${conditions || ''}
        order by pets_owner.first_name, pets_owner.last_name
        offset $<offset> limit $<limit>`,
        {
          code,
          firstName,
          lastName,
          houseNo,
          offset,
          limit,
        }
      );
      const p2 = t.one(
        `SELECT count(*)
        FROM pets_owner
        WHERE pets_owner.active = true ${conditions || ''}`,
        {
          code,
          firstName,
          lastName,
          houseNo,
        },
        a => +a.count
      );
      const [datas, counts] = await Promise.all([p1, p2]);
      return { datas, counts };
    });
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
