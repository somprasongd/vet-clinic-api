import Repository from '../helpers/repository';

export default class UsersRepository extends Repository {
  constructor(db, pgp) {
    super(db, pgp, 't_user', {});
  }

  findById(id, url) {
    return this.db.oneOrNone(
      `SELECT t_user.*
        , array_agg(json_build_object( 'id', m_user_role.id, 'label', m_user_role.label ) order by m_user_role.id) as roles
        , json_build_object( 'id', t_upload.id,
                             'url', '${url}'||t_upload.filename,
                             'url_thumbnail', '${url}'||t_upload.filename_thumbnail,
                             'url_thumbnail_sm', '${url}'||t_upload.filename_thumbnail_small ) as avatar
      FROM t_user
        LEFT JOIN t_user_roles on t_user_roles.user_id = t_user.id 
        LEFT JOIN m_user_role on m_user_role.id = t_user_roles.role_id
        LEFT JOIN t_upload on t_upload.id = t_user.avatar_id
      WHERE t_user.id = $1
      GROUP BY t_user.id,
      t_upload.id`,
      +id
    );
  }

  findByUsername(username) {
    return this.db.oneOrNone(
      `SELECT t_user.*
      FROM t_user
      WHERE t_user.username = $1`,
      username
    );
  }

  findAll(name, username, roleId, url, limit, offset) {
    let conditions = '';
    if (name) {
      conditions += ` AND t_user.name ilike '%$<name:value>%'`;
    }
    if (username) {
      conditions += ` AND t_user.username ilike '%$<username:value>%'`;
    }
    if (roleId) {
      conditions += ` AND m_user_role.id = $<roleId>`;
    }

    return this.db.manyOrNone(
      `SELECT 
        t_user.id
        , t_user.username
        , t_user.is_admin
        , t_user.name
        , array_agg(json_build_object( 'id', m_user_role.id, 'label', m_user_role.label )) as roles
        , json_build_object( 'id', t_upload.id,
                             'url', '${url}'||t_upload.filename,
                             'url_thumbnail', '${url}'||t_upload.filename_thumbnail,
                             'url_thumbnail_sm', '${url}'||t_upload.filename_thumbnail_small ) as avatar
      FROM t_user
        LEFT JOIN t_user_roles on t_user_roles.user_id = t_user.id 
        LEFT JOIN m_user_role on m_user_role.id = t_user_roles.role_id
        LEFT JOIN t_upload on t_upload.id = t_user.avatar_id
      WHERE t_user.is_active = true ${conditions || ''}
      GROUP BY
        t_user.id,
        t_upload.id
      ORDER BY t_user.username
      OFFSET $<offset> LIMIT ${limit}`,
      {
        name,
        username,
        roleId,
        offset,
        limit,
      }
    );
  }

  findAllCount(name, username, roleId) {
    let conditions = '';
    if (name) {
      conditions += ` AND t_user.name ilike '%$<name:value>%'`;
    }
    if (username) {
      conditions += ` AND t_user.username ilike '%$<username:value>%'`;
    }
    if (roleId) {
      conditions += ` AND m_user_role.id = $<roleId>`;
    }

    return this.db.one(
      `SELECT count(distinct(t_user.id))
      FROM t_user
        LEFT JOIN t_user_roles on t_user_roles.user_id = t_user.id
        LEFT JOIN m_user_role on m_user_role.id = t_user_roles.role_id
      WHERE t_user.is_active = true ${conditions || ''}`,
      {
        name,
        username,
        roleId,
      },
      a => +a.count
    );
  }
}
