import connection from '../../../database';
import { deleteById as deleteImage } from '../../upload/upload.service';

const { db } = connection;

export const findPetImageById = (id, petId, url) => db.petMedias.findById(id, petId, 'image', url);

export const findAllPetImageByPetId = ({ petId, typeId }, url) =>
  db.petMedias.find({ petId, typeId, mediaType: 'image' }, url);

export const createPetImage = obj => db.petMedias.create(obj);

export const updatePetImage = async (id, obj) => db.petMedias.update(id, obj);

export const deletePetImage = async (id, petId) => {
  const petImage = await db.petMedias.removeFrom({ id: +id, petId, mediaType: 'image' });

  if (petImage) {
    deleteImage(petImage.mediaId);
  }

  return petImage;
};
