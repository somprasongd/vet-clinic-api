import connection from '../../database';
import { deleteById as deleteAvatar } from '../upload/upload.service';

const { db } = connection;

export const findMemberById = id => db.members.findById(id);

export const findAllMember = (conditions, { limit, offset }) => db.members.find(conditions, { limit, offset });

export const createMember = newMember =>
  db.tx(async t => {
    const code = await t.counters.getCode('O');
    newMember.code = code;
    const member = await t.members.create(newMember);
    return member;
  });

export const updateMember = async (id, obj) => db.members.update(id, obj);

export const updateMemberAvatar = async (member, avatarId) => {
  const oldAvatarId = member.avatarId;

  await db.members.update(member.id, { avatarId });
  if (oldAvatarId) {
    deleteAvatar(oldAvatarId);
  }
};
