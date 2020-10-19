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

  const { datas, counts } = await service.findAllMember(dto, { offset, limit });

  const results = paginate(datas, counts, limit, offset, page);
  res.json(results);
};

export const getMember = async (req, res) => {
  const { id } = req.params;
  const member = await service.findMemberById(id);

  if (!member) throw new NotFoundExceptions('The member with the given ID was not found.');

  res.json(respondMemberDTO(member));
};

export const removeMember = async (req, res) => {
  const obj = {
    active: false,
    updateBy: req.user.id,
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
  const memberId = req.params.id;

  const { uploadDTO } = req;

  const member = await service.findMemberById(memberId);

  if (!member) throw new NotFoundExceptions('The member with the given ID was not found.');

  await service.updateMemberAvatar(member, uploadDTO.id);

  res.json(uploadDTO);
};

export const getMemberAvatar = async (req, res) => {
  const memberId = req.params.id;

  const member = await service.findMemberById(memberId);

  if (!member || member.avatarId === null) {
    return res.sendFile(config.DEFAULT_AVATAR);
  }

  const qs = Object.keys(req.query).reduce((acc, cur) => `${acc}&${cur}=${req.query[cur]}`, '?');

  req.url = `/api/upload/file/${member.avatarId}${qs}`;
  req.app.handle(req, res);
};

export const deleteMemberAvatar = async (req, res) => {
  const memberId = req.params.id;

  const member = await service.findMemberById(memberId);

  if (!member) throw new NotFoundExceptions('The member with the given ID was not found.');

  await service.updateMemberAvatar(member, null);

  res.status(204).end();
};

export const listPets = async (req, res) => {
  const memberId = req.params.id;

  const member = await service.findMemberById(memberId);

  if (!member) throw new NotFoundExceptions('The member with the given ID was not found.');

  req.url = `/api/pets?ownerId=${member.id}`;
  req.app.handle(req, res);
};
