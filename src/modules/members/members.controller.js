import * as service from './members.service';
import { NotFoundExceptions } from '../../common/helpers/exceptions';
import { respondMemberDTO } from './members.dto';
import paginate from '../../common/helpers/res-with-paginate';
import config from '../../common/config';

export const createMember = async (req, res) => {
  const { dto } = req;

  const member = await service.createMember(dto);

  res.json(respondMemberDTO(member));
};

export const listMember = async (req, res) => {
  const { limit, offset, page } = req.query;
  const { dto } = req;

  console.log(dto);

  const { datas, counts } = await service.findAllMember(dto, { offset, limit });

  const results = paginate(datas, counts, limit, offset, page);
  res.json(results);
};

export const getMember = async (req, res) => {
  const { id } = req.params;
  const member = await service.findMemberById(id);

  if (!member) throw new NotFoundExceptions('The member with the given ID was not found.');

  res.send(member);
};

export const removeMember = async (req, res) => {
  const obj = {
    active: false,
    updateByc: req.user.id,
  };
  const member = await service.updateMember(req.params.id, obj);

  if (!member) throw new NotFoundExceptions('The member with the given ID was not found.');

  res.status(204).end();
};

export const updateMember = async (req, res) => {
  const { dto } = req;

  const member = await service.updateMember(req.params.id, dto);
  if (!member) throw new NotFoundExceptions('The member with the given ID was not found.');

  res.json(respondMemberDTO(member));
};

export const createMemberAvatar = async (req, res) => {
  const userId = req.params.id || req.user.id;

  const { uploadDTO } = req;

  const user = await service.findMemberById(userId);

  if (!user) throw new NotFoundExceptions('The user with the given ID was not found.');

  await service.updateMemberAvatar(user, uploadDTO.id);

  res.json(uploadDTO);
};

export const getMemberAvatar = async (req, res) => {
  const userId = req.params.id || req.user.id;

  const user = await service.findMemberById(userId);

  if (!user) throw new NotFoundExceptions('The user with the given ID was not found.');

  if (user.avatarId === null) {
    return res.sendFile(config.DEFAULT_AVATAR);
  }

  const qs = Object.keys(req.query).reduce((acc, cur) => `${acc}&${cur}=${req.query[cur]}`, '?');

  res.redirect(`/api/upload/file/${user.avatarId}${qs}`);
};

export const deleteMemberAvatar = async (req, res) => {
  const userId = req.params.id || req.user.id;

  const user = await service.findMemberById(userId);

  if (!user) throw new NotFoundExceptions('The user with the given ID was not found.');

  await service.updateMemberAvatar(user, null);

  res.status(204).end();
};
