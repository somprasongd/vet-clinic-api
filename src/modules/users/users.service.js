import connection from '../../database';
import { deleteById as deleteAvatar } from '../upload/upload.service';

const { db } = connection;

export const findUserById = id => db.users.findById(id);

export const findUserByUsername = username => db.users.findByUsername(username);

export const findAllUser = (name, username, roleId, limit, offset) =>
  db.task(async t => {
    const p1 = t.users.findAll(name, username, roleId, limit, offset);
    const p2 = t.users.findAllCount(name, username, roleId);

    const [datas, counts] = await Promise.all([p1, p2]);
    return { datas, counts };
  });

export const createUser = async (newUser, roles) => {
  const user = await db.tx(async t => {
    const user = await t.users.create(newUser);

    roles.forEach(async roleId => {
      await t.base.create('c_user_roles', {
        user_id: user.id,
        role_id: roleId,
      });
    });

    return user;
  });
  return user;
};

export const updateUser = async (id, user, roles) => {
  const updatedUser = await db.tx(async t => {
    const result = await t.users.update(id, user);

    if (roles.length > 0) {
      await t.base.removeFrom('c_user_roles', { userId: id });

      roles.forEach(async roleId => {
        await t.base.create('c_user_roles', {
          user_id: id,
          role_id: roleId,
        });
      });
    }

    return result;
  });
  return updatedUser;
};

export const updateUserActive = (id, isActive) => db.users.updateActive(id, isActive);

export const updateUserAvatar = async (user, avatarId) => {
  const oldAvatarId = user.avatarId;

  await db.users.updateAvatar(user.id, avatarId);
  if (oldAvatarId) {
    deleteAvatar(user.avatarId);
  }
};

export const updateUserPassword = (id, password) => db.users.updatePassword(id, password);

export const deleteUser = id => db.users.remove(id);
