import Repository, { removeUndefinedColumn } from '../helpers/repository';

export default class VisitImageRepository extends Repository {
  constructor(db, pgp) {
    super(db, pgp, 't_visit_media', {});
  }

  findById(id, visitId, mediaType, url) {
    return this.db.oneOrNone(
      `SELECT
      t_visit_media.id
      --, t_visit_media.media_type
      , t_visit_media.type_id
      , t_visit_media.description
      , t_visit_media.visit_id
      , json_build_object(
          'id', t_upload.id,
          'url', '${url}'||t_upload.filename,
          'url_thumbnail', '${url}'||t_upload.filename_thumbnail,
          'url_thumbnail_sm', '${url}'||t_upload.filename_thumbnail_small
      ) as media
      FROM t_visit_media
      INNER JOIN t_upload on t_upload.id = t_visit_media.media_id
      WHERE t_visit_media.id = $<id> and visit_id = $<visitId> and media_type = $<mediaType>`,
      { id: +id, visitId, mediaType }
    );
  }

  find(wheres, url) {
    const obj = removeUndefinedColumn(wheres);
    return this.db.manyOrNone(
      `SELECT
      t_visit_media.id
      --, t_visit_media.media_type
      , t_visit_media.type_id
      , t_visit_media.description
      , t_visit_media.visit_id
      , json_build_object(
          'id', t_upload.id,
          'url', '${url}'||t_upload.filename,
          'url_thumbnail', '${url}'||t_upload.filename_thumbnail,
          'url_thumbnail_sm', '${url}'||t_upload.filename_thumbnail_small
      ) as media
      FROM t_visit_media
      INNER JOIN t_upload on t_upload.id = t_visit_media.media_id
      $1:raw
      order by t_visit_media.update_at`,
      this.where(obj)
    );
  }

  removeFrom(obj) {
    return this.db.oneOrNone(`DELETE FROM t_visit_media $1:raw  RETURNING *`, this.where(obj));
  }
}
