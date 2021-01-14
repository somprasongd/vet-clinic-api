import * as service from './images.service';
import { NotFoundExceptions } from '../../../common/helpers/exceptions';
import { respondPetImageDTO } from './images.dto';

export const createPetImage = async (req, res) => {
  const { dto } = req;

  const petImage = await service.createPetImage(dto);

  res.json(respondPetImageDTO(petImage, req.uploadDTO));
};

export const getPetImages = async (req, res) => {
  const { dto } = req;

  const mediaUrl = `${req.getHost()}/`;

  const results = await service.findAllPetImageByPetId(dto, mediaUrl);

  res.json(results);
};

export const getPetImage = async (req, res) => {
  const { id } = req.params;

  const mediaUrl = `${req.getHost()}/`;

  const petImage = await service.findPetImageById(id, req.pet.id, mediaUrl);

  if (!petImage) throw new NotFoundExceptions('The pet image with the given ID was not found.');

  res.json(respondPetImageDTO(petImage));
};

export const deletePetImage = async (req, res) => {
  const { id } = req.params;

  const petImage = await service.deletePetImage(id, req.pet.id);

  if (!petImage) throw new NotFoundExceptions('The pet image with the given ID was not found.');

  res.status(204).end();
};

export const updatePetImage = async (req, res) => {
  const { dto } = req;

  let petImage = await service.updatePetImage(req.params.id, dto);
  if (!petImage) throw new NotFoundExceptions('The pet image with the given ID was not found.');

  const mediaUrl = `${req.getHost()}/`;

  petImage = await service.findPetImageById(petImage.id, petImage.petId, mediaUrl);

  res.json(respondPetImageDTO(petImage));
};
