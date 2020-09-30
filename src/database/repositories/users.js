import Repository from '../helpers/repository';

export default class UsersRepository extends Repository {
  constructor(db, pgp) {
    super(db, pgp, 'c_user', {});
  }

  findById(id, url) {
    return this.db.oneOrNone(
      `SELECT c_user.*
        , array_agg(json_build_object( 'id', m_user_role.id, 'label', m_user_role.label ) order by m_user_role.id) as roles
        , json_build_object( 'id', t_upload.id,
                             'url', '${url}'||t_upload.filename,
                             'url_thumbnail', '${url}'||t_upload.filename_thumbnail,
                             'url_thumbnail_sm', '${url}'||t_upload.filename_thumbnail_small ) as avatar
      FROM c_user
        LEFT JOIN c_user_roles on c_user_roles.user_id = c_user.id 
        LEFT JOIN m_user_role on m_user_role.id = c_user_roles.role_id
        LEFT JOIN t_upload on t_upload.id = c_user.avatar_id
      WHERE c_user.id = $1
      GROUP BY c_user.id,
      t_upload.id`,
      +id
    );
  }

  findByUsername(username) {
    return this.db.oneOrNone(
      `SELECT c_user.*
      FROM c_user
      WHERE c_user.username = $1`,
      username
    );
  }

  findAll(name, username, roleId, url, limit, offset) {
    return this.db.manyOrNone(
      `SELECT 
        c_user.id
        , c_user.username
        , c_user.is_admin
        , c_user.name
        , array_agg(json_build_object( 'id', m_user_role.id, 'label', m_user_role.label )) as roles
        , json_build_object( 'id', t_upload.id,
                             'url', '${url}'||t_upload.filename,
                             'url_thumbnail', '${url}'||t_upload.filename_thumbnail,
                             'url_thumbnail_sm', '${url}'||t_upload.filename_thumbnail_small ) as avatar
      FROM c_user
        LEFT JOIN c_user_roles on c_user_roles.user_id = c_user.id 
        LEFT JOIN m_user_role on m_user_role.id = c_user_roles.role_id
        LEFT JOIN t_upload on t_upload.id = c_user.avatar_id
      WHERE c_user.active = true ${createSearchCondition({ name, username, roleId })}
      GROUP BY
        c_user.id,
        t_upload.id
      ORDER BY c_user.username
      OFFSET $<offset> LIMIT ${limit}`,
      {
        name,
        username,
        roleId,
        offset,
      }
    );
  }

  findAllCount(name, username, roleId) {
    return this.db.one(
      `SELECT count(distinct(c_user.id))
      FROM c_user
        LEFT JOIN c_user_roles on c_user_roles.user_id = c_user.id
        LEFT JOIN m_user_role on m_user_role.id = c_user_roles.role_id
      WHERE c_user.active = true ${createSearchCondition({ name, username, roleId })}`,
      {
        name,
        username,
        roleId,
      },
      a => +a.count
    );
  }

  updateActive(id, isActive) {
    return this.db.oneOrNone(`UPDATE c_user set active=$1 WHERE id = $2 RETURNING *`, [isActive, id]);
  }

  updateAvatar(id, avatarId) {
    return this.db.oneOrNone(`UPDATE c_user set avatar_id=$1 WHERE id = $2 RETURNING *`, [avatarId, id]);
  }

  updatePassword(id, password) {
    return this.db.oneOrNone(`UPDATE c_user set password=$1 WHERE id = $2 RETURNING *`, [password, id]);
  }
}

function createSearchCondition(params) {
  const { name, username, roleId } = params;
  let conditions = '';
  if (name) {
    conditions += ` AND c_user.name ilike '%$<name:value>%'`;
  }
  if (username) {
    conditions += ` AND c_user.username ilike '%$<username:value>%'`;
  }
  if (roleId) {
    conditions += ` AND m_user_role.id = $<roleId>`;
  }
  return conditions || '';
}
