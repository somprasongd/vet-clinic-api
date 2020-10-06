import bcrypt from '../../common/helpers/bcrypt';
import * as service from './users.service';
import { InvalidExceptions, NotFoundExceptions } from '../../common/helpers/exceptions';
import { respondUserDTO } from './users.dto';
import paginate from '../../common/helpers/res-with-paginate';
import config from '../../common/config';

export const create = async (req, res) => {
  const { dto } = req;

  let user = await service.findUserByUsername(dto.username);
  if (user) throw new InvalidExceptions('User already registered.');

  const hash = await bcrypt.hash(dto.password);
  user = {
    username: dto.username,
    password: hash,
    name: dto.name,
    email: dto.email,
    phone: dto.phone,
    isAdmin: dto.isAdmin,
    active: dto.active,
  };
  if (dto.avatarId) {
    user.avatarId = dto.avatarId;
  }

  user = await service.createUser(user, dto.roles);

  user = await service.findUserById(user.id);

  res.json(respondUserDTO(user));
};

export const findAll = async (req, res) => {
  const { limit, offset, page } = req.query;

  const { dto } = req;

  const { datas, counts } = await service.findAllUser(dto, { limit, offset });

  const results = paginate(datas, counts, limit, offset, page);
  res.json(results);
};

export const findById = async (req, res) => {
  const user = await service.findUserById(req.params.id);

  if (!user) throw new NotFoundExceptions('The user with the given ID was not found.');

  res.json(respondUserDTO(user));
};

export const findMe = async (req, res) => {
  const user = await service.findUserById(req.user.id);

  res.json(respondUserDTO(user));
};

export const remove = async (req, res) => {
  // const deletedRow = await service.deleteUser(req.params.id);

  // if (deletedRow === 0) throw new NotFoundExceptions('The user with the given ID was not found.');

  // res.status(204).end();

  const user = await service.updateUserActive(req.params.id, false);
  if (!user) throw new NotFoundExceptions('The user with the given ID was not found.');

  res.status(204).end();
};

export const update = async (req, res) => {
  const { dto } = req;

  let user = {
    name: dto.name,
    email: dto.email,
    phone: dto.phone,
    isAdmin: dto.isAdmin,
    active: dto.active,
  };
  if (dto.avatarId) {
    user.avatarId = dto.avatarId;
  }
  if (dto.password !== null) {
    const hash = await bcrypt.hash(dto.password);
    user.password = hash;
  }

  user = await service.updateUser(req.params.id, user, dto.roles);
  if (!user) throw new NotFoundExceptions('The user with the given ID was not found.');

  user = await service.findUserById(req.params.id);

  res.json(respondUserDTO(user));
};

export const updatePassword = async (req, res) => {
  const { dto } = req;

  const hash = await bcrypt.hash(dto.password);

  const user = await service.updateUserPassword(req.params.id, hash);
  if (!user) throw new NotFoundExceptions('The user with the given ID was not found.');

  res.status(204).end();
};

export const createUserAvatar = async (req, res) => {
  const userId = req.params.id || req.user.id;

  const { uploadDTO } = req;

  const user = await service.findUserById(userId);

  if (!user) throw new NotFoundExceptions('The user with the given ID was not found.');

  await service.updateUserAvatar(user, uploadDTO.id);

  res.json(uploadDTO);
};

export const getUserAvatar = async (req, res) => {
  const userId = req.params.id || req.user.id;

  const user = await service.findUserById(userId);

  if (!user || user.avatarId === null) {
    return res.sendFile(config.DEFAULT_AVATAR);
  }

  const qs = Object.keys(req.query).reduce((acc, cur) => `${acc}&${cur}=${req.query[cur]}`, '?');

  req.url = `/api/upload/file/${user.avatarId}${qs}`;
  req.app.handle(req, res);
};

export const deleteUserAvatar = async (req, res) => {
  const userId = req.params.id || req.user.id;

  const user = await service.findUserById(userId);

  if (!user) throw new NotFoundExceptions('The user with the given ID was not found.');

  await service.updateUserAvatar(user, null);

  res.status(204).end();
};
