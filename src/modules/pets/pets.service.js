import connection from '../../database';
import { deleteById as deleteAvatar } from '../upload/upload.service';

const { db } = connection;

export const findPetById = id => db.pets.findById(id);

export const findAllPet = (conditions, { limit, offset }) => db.pets.find(conditions, { limit, offset });

export const createPet = newPet =>
  db.tx(async t => {
    const code = await t.counters.getCode('P');
    newPet.code = code;
    const member = await t.pets.create(newPet);
    return member;
  });

export const updatePet = async (id, obj) => db.pets.update(id, obj);

export const updatePetAvatar = async (member, avatarId) => {
  const oldAvatarId = member.avatarId;

  await db.users.pets(member.id, { avatarId });
  if (oldAvatarId) {
    deleteAvatar(oldAvatarId);
  }
};
