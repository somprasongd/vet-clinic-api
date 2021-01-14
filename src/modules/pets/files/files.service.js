import connection from '../../../database';
import { deleteById as deleteImage } from '../../upload/upload.service';

const { db } = connection;

export const findPetFileById = (id, petId, url) => db.petMedias.findById(id, petId, 'file', url);

export const findAllPetFileByPetId = ({ petId, typeId }, url) =>
  db.petMedias.find({ petId, typeId, mediaType: 'file' }, url);

export const createPetFile = obj => db.petMedias.create(obj);

export const updatePetFile = async (id, obj) => db.petMedias.update(id, obj);

export const deletePetFile = async (id, petId) => {
  const petImage = await db.petMedias.removeFrom({ id: +id, petId, mediaType: 'file' });

  if (petImage) {
    deleteImage(petImage.mediaId);
  }

  return petImage;
};
