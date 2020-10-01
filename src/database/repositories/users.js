import Repository from '../helpers/repository';

export default class UsersRepository extends Repository {
  constructor(db, pgp) {
    super(db, pgp, 'c_user', {});
  }

  findById(id) {
    return this.db.oneOrNone(
      `SELECT c_user.*
        , array_agg(json_build_object( 'id', m_user_role.id, 'label', m_user_role.label ) order by m_user_role.id) as roles
      FROM c_user
        LEFT JOIN c_user_roles on c_user_roles.user_id = c_user.id 
        LEFT JOIN m_user_role on m_user_role.id = c_user_roles.role_id
      WHERE c_user.id = $1
      GROUP BY c_user.id`,
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

  // find(wheres, options)
  find(wheres, { offset = 0, limit = 'all' }) {
    const { name, username, roleId } = wheres;
    return this.db.task(async t => {
      const p1 = t.manyOrNone(
        `SELECT 
        c_user.id
        , c_user.username
        , c_user.is_admin
        , c_user.name
        , array_agg(json_build_object( 'id', m_user_role.id, 'label', m_user_role.label )) as roles
      FROM c_user
        LEFT JOIN c_user_roles on c_user_roles.user_id = c_user.id 
        LEFT JOIN m_user_role on m_user_role.id = c_user_roles.role_id
      WHERE c_user.active = true ${createSearchCondition(wheres)}
      GROUP BY
        c_user.id
      ORDER BY c_user.username
      OFFSET $<offset> LIMIT ${limit}`,
        {
          name,
          username,
          roleId,
          offset,
        }
      );
      const p2 = t.one(
        `SELECT count(distinct(c_user.id))
      FROM c_user
        LEFT JOIN c_user_roles on c_user_roles.user_id = c_user.id
        LEFT JOIN m_user_role on m_user_role.id = c_user_roles.role_id
      WHERE c_user.active = true ${createSearchCondition(wheres)}`,
        {
          name,
          username,
          roleId,
        },
        a => +a.count
      );
      const [datas, counts] = await Promise.all([p1, p2]);
      return { datas, counts };
    });
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

function createSearchCondition(wheres) {
  const { name, username, roleId } = wheres;
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
