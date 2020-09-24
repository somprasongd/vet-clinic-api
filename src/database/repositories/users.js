import Repository from '../helpers/repository';

export default class UsersRepository extends Repository {
  constructor(db, pgp) {
    super(db, pgp, 't_user', {});
  }

  findById(id) {
    return this.db.oneOrNone(
      `SELECT t_user.*
        , array_agg(json_build_object( 'id', m_role.id, 'name', m_role.name ) order by m_role.id) as roles
      FROM t_user
        LEFT JOIN t_user_roles on t_user_roles.user_id = t_user.id 
        LEFT JOIN m_role on m_role.id = t_user_roles.role_id
      WHERE t_user.id = $1
      GROUP BY t_user.id`,
      +id
    );
  }

  findByUsername(username) {
    return this.db.oneOrNone(
      `SELECT t_user.*
        , array_agg(json_build_object( 'id', m_role.id, 'name', m_role.name ) order by m_role.id) as roles
      FROM t_user
        LEFT JOIN t_user_roles on t_user_roles.user_id = t_user.id 
        LEFT JOIN m_role on m_role.id = t_user_roles.role_id
      WHERE t_user.username = $1
      GROUP BY t_user.id`,
      username
    );
  }

  findAll(name, username, roleId, limit, offset) {
    let conditions = '';
    if (name) {
      conditions += ` AND t_user.name ilike '%$<name:value>%'`;
    }
    if (username) {
      conditions += ` AND t_user.username ilike '%$<username:value>%'`;
    }
    if (roleId) {
      conditions += ` AND m_role.id = $<roleId>`;
    }

    return this.db.manyOrNone(
      `SELECT 
        t_user.id
        , t_user.username
        , t_user.is_admin
        , t_user.name
        , array_agg(json_build_object( 'id', m_role.id, 'name', m_role.name )) as roles
      FROM t_user
        LEFT JOIN t_user_roles on t_user_roles.user_id = t_user.id 
        LEFT JOIN m_role on m_role.id = t_user_roles.role_id
      WHERE t_user.is_active = true ${conditions || ''}
      GROUP BY
        t_user.id
      ORDER BY t_user.username
      OFFSET $<offset> LIMIT $<limit>`,
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
      conditions += ` AND m_role.id = $<roleId>`;
    }

    return this.db.one(
      `SELECT count(distinct(t_user.id))
      FROM t_user
        LEFT JOIN t_user_roles on t_user_roles.user_id = t_user.id
        LEFT JOIN m_role on m_role.id = t_user_roles.role_id
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
