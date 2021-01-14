import * as service from './files.service';
import { NotFoundExceptions } from '../../../common/helpers/exceptions';
import { respondPetFileDTO } from './files.dto';

export const createPetFile = async (req, res) => {
  const { dto } = req;

  const petFile = await service.createPetFile(dto);

  res.json(respondPetFileDTO(petFile, req.uploadDTO));
};

export const getPetFiles = async (req, res) => {
  const { dto } = req;

  const mediaUrl = `${req.getHost()}/`;

  const results = await service.findAllPetFileByPetId(dto, mediaUrl);

  res.json(results);
};

export const getPetFile = async (req, res) => {
  const { id } = req.params;

  const mediaUrl = `${req.getHost()}/`;

  const petFile = await service.findPetFileById(id, req.pet.id, mediaUrl);

  if (!petFile) throw new NotFoundExceptions('The pet file with the given ID was not found.');

  res.json(respondPetFileDTO(petFile));
};

export const deletePetFile = async (req, res) => {
  const { id } = req.params;

  const petFile = await service.deletePetFile(id, req.pet.id);

  if (!petFile) throw new NotFoundExceptions('The pet file with the given ID was not found.');

  res.status(204).end();
};

export const updatePetFile = async (req, res) => {
  const { dto } = req;

  let petFile = await service.updatePetFile(req.params.id, dto);
  if (!petFile) throw new NotFoundExceptions('The pet file with the given ID was not found.');

  const mediaUrl = `${req.getHost()}/`;

  petFile = await service.findPetFileById(petFile.id, petFile.petId, mediaUrl);

  res.json(respondPetFileDTO(petFile));
};
