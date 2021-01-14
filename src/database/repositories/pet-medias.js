import Repository, { removeUndefinedColumn } from '../helpers/repository';

export default class PetImageRepository extends Repository {
  constructor(db, pgp) {
    super(db, pgp, 't_pet_media', {});
  }

  findById(id, petId, mediaType = 6, url) {
    return this.db.oneOrNone(
      `SELECT
      t_pet_media.id
      --, t_pet_media.media_type
      , t_pet_media.type_id
      , t_pet_media.description
      , t_pet_media.pet_id
      , json_build_object(
          'id', t_upload.id,
          'url', '${url}'||t_upload.filename,
          'url_thumbnail', '${url}'||t_upload.filename_thumbnail,
          'url_thumbnail_sm', '${url}'||t_upload.filename_thumbnail_small
      ) as media
      FROM t_pet_media
      INNER JOIN t_upload on t_upload.id = t_pet_media.media_id
      WHERE t_pet_media.id = $<id> and pet_id = $<petId> and media_type = $<mediaType>`,
      { id: +id, petId, mediaType }
    );
  }

  find(wheres, url) {
    const obj = removeUndefinedColumn(wheres);
    return this.db.manyOrNone(
      `SELECT
      t_pet_media.id
      --, t_pet_media.media_type
      , t_pet_media.type_id
      , t_pet_media.description
      , t_pet_media.pet_id
      , json_build_object(
          'id', t_upload.id,
          'url', '${url}'||t_upload.filename,
          'url_thumbnail', '${url}'||t_upload.filename_thumbnail,
          'url_thumbnail_sm', '${url}'||t_upload.filename_thumbnail_small
      ) as media
      FROM t_pet_media
      INNER JOIN t_upload on t_upload.id = t_pet_media.media_id
      $1:raw
      order by t_pet_media.update_at`,
      this.where(obj)
    );
  }

  removeFrom(obj) {
    return this.db.oneOrNone(`DELETE FROM t_pet_media $1:raw  RETURNING *`, this.where(obj));
  }
}
