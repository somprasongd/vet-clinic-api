import { InvalidExceptions } from '../../common/helpers/exceptions';
import connection from '../../database';
import { deleteById as deleteAvatar } from '../upload/upload.service';

const { db } = connection;

export const findPetById = id => db.pets.findById(id);

export const findAllPet = (conditions, { limit, offset }) => db.pets.find(conditions, { limit, offset });

export const createPet = newPet =>
  db.tx(async t => {
    const code = await t.counters.getCode('P');
    newPet.code = code;
    const pet = await t.pets.create(newPet);
    return pet;
  });

export const updatePet = async (id, obj) => db.pets.update(id, obj);

export const updatePetAvatar = async (pet, avatarId) => {
  const oldAvatarId = pet.avatarId;

  await db.pets.update(pet.id, { avatarId });
  if (oldAvatarId) {
    deleteAvatar(oldAvatarId);
  }
};

export const changeOwner = async (pet, newOwnerId) =>
  db.tx(async t => {
    const newMember = await t.members.findById(newOwnerId);
    if (!newMember) throw new InvalidExceptions('The owner with the given ID was not found.');
    const member = await t.members.findById(pet.ownerId);
    const note = `${pet.note ? `${pet.note} ` : ''}(Previous owner ${member.fullName})`;
    await t.pets.update(pet.id, { ownerId: newOwnerId, note });
  });
