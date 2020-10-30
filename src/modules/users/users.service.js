import { InvalidExceptions } from '../../common/helpers/exceptions';
import connection from '../../database';
import { deleteById as deleteAvatar } from '../upload/upload.service';

const { db } = connection;

export const findUserById = id => db.users.findById(id);

export const findUserByUsername = username => db.users.findByUsername(username);

export const findAllUser = ({ name, username, roleId }, { limit, offset }) =>
  db.users.find({ name, username, roleId }, { limit, offset });

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
    deleteAvatar(oldAvatarId);
  }
};

export const updateUserPassword = (id, password) => db.users.updatePassword(id, password);

export const deleteUser = id => {
  if (id === '1') {
    throw new InvalidExceptions('Can not delete master data');
  }
  return db.users.remove(id);
};
