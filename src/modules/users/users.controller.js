import paginate from '../../common/helpers/paginate';
import bcrypt from '../../common/helpers/bcrypt';
import * as service from './users.service';
import { InvalidExceptions, NotFoundExceptions } from '../../common/helpers/exceptions';
import { respondUserDTO } from './users.dto';

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
    isActive: dto.isActive,
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

  const {
    dto: { name, username, roleId },
  } = req;

  const { datas, counts } = await service.findAllUser(name, username, roleId, limit, offset);

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
  const deletedRow = await service.deleteUser(req.params.id);

  if (deletedRow === 0) throw new NotFoundExceptions('The user with the given ID was not found.');

  res.status(204).end();
};

export const update = async (req, res) => {
  const { dto } = req;

  const hash = await bcrypt.hash(dto.password);
  let user = {
    password: hash,
    name: dto.name,
    email: dto.email,
    phone: dto.phone,
    isAdmin: dto.isAdmin,
    isActive: dto.isActive,
  };
  if (dto.avatarId) {
    user.avatarId = dto.avatarId;
  }

  user = await service.updateUser(req.params.id, user);
  if (!user) throw new NotFoundExceptions('The user with the given ID was not found.');

  user = await service.findUserById(req.params.id);

  res.json(respondUserDTO(user));
};

export const updatePassword = async (req, res) => {
  const { dto } = req;

  const hash = await bcrypt.hash(dto.password);
  let user = {
    password: hash,
  };

  user = await service.updateUser(req.params.id, user);
  if (!user) throw new NotFoundExceptions('The user with the given ID was not found.');

  res.status(201).end();
};

export const updateAvatar = async (req, res) => {
  const { dto } = req;

  let user = {
    avatarId: dto.avatarId,
  };

  user = await service.updateUser(req.params.id, user);
  if (!user) throw new NotFoundExceptions('The user with the given ID was not found.');

  res.status(201).end();
};
