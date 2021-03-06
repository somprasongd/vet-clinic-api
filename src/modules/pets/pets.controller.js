import * as service from './pets.service';
import { NotFoundExceptions } from '../../common/helpers/exceptions';
import { respondPetDTO } from './pets.dto';
import paginate from '../../common/helpers/res-with-paginate';
import config from '../../common/config';

export const createPet = async (req, res) => {
  const { dto } = req;

  const pet = await service.createPet(dto);

  res.json(respondPetDTO(pet));
};

export const listPet = async (req, res) => {
  const { limit, offset, page } = req.query;
  const { dto } = req;

  const { datas, counts } = await service.findAllPet(dto, { offset, limit });

  const results = paginate(datas, counts, limit, offset, page);
  res.json(results);
};

export const getPet = async (req, res) => {
  const { id } = req.params;
  const pet = await getPetById(id);

  if (!pet) throw new NotFoundExceptions('The pet with the given ID was not found.');

  res.json(respondPetDTO(pet));
};

export const getPetById = async id => {
  const pet = await service.findPetById(id);

  return pet;
};

export const removePet = async (req, res) => {
  const obj = {
    active: false,
    updateBy: req.user.id,
  };
  const pet = await service.updatePet(req.params.id, obj);

  if (!pet) throw new NotFoundExceptions('The pet with the given ID was not found.');

  res.status(204).end();
};

export const updatePet = async (req, res) => {
  const { dto } = req;

  const pet = await service.updatePet(req.params.id, dto);
  if (!pet) throw new NotFoundExceptions('The pet with the given ID was not found.');

  res.json(respondPetDTO(pet));
};

export const createPetAvatar = async (req, res) => {
  const petId = req.params.id;

  const { uploadDTO } = req;

  const pet = await service.findPetById(petId);

  if (!pet) throw new NotFoundExceptions('The pet with the given ID was not found.');

  await service.updatePetAvatar(pet, uploadDTO.id);

  res.json(uploadDTO);
};

export const getPetAvatar = async (req, res) => {
  const petId = req.params.id;

  const pet = await service.findPetById(petId);

  if (!pet || pet.avatarId === null) {
    return res.sendFile(config.DEFAULT_AVATAR_PET);
  }

  const qs = Object.keys(req.query).reduce((acc, cur) => `${acc}&${cur}=${req.query[cur]}`, '?');

  req.url = `/api/upload/file/${pet.avatarId}${qs}`;
  req.app.handle(req, res);
};

export const deletePetAvatar = async (req, res) => {
  const petId = req.params.id;

  const pet = await service.findPetById(petId);

  if (!pet) throw new NotFoundExceptions('The pet with the given ID was not found.');

  await service.updatePetAvatar(pet, null);

  res.status(204).end();
};

export const getPetOwner = async (req, res) => {
  const petId = req.params.id;

  const pet = await service.findPetById(petId);

  if (!pet) throw new NotFoundExceptions('The pet with the given ID was not found.');

  req.url = `/api/members/${pet.ownerId}`;
  req.app.handle(req, res);
};

export const changeOwner = async (req, res) => {
  const { id: petId, newOwnerId } = req.params;

  const pet = await service.findPetById(petId);

  if (!pet) throw new NotFoundExceptions('The pet with the given ID was not found.');

  await service.changeOwner(pet, newOwnerId);
  res.status(204).end();
};
