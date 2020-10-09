import connection from '../../../database';
import { deleteById as deleteImage } from '../../upload/upload.service';

const { db } = connection;

export const findVisitImageById = (id, visitId, url) => db.visitMedias.findById(id, visitId, 'image', url);

export const findAllVisitImageByVisitId = ({ visitId, typeId }, url) =>
  db.visitMedias.find({ visitId, typeId, mediaType: 'image' }, url);

export const createVisitImage = obj => db.visitMedias.create(obj);

export const updateVisitImage = async (id, obj) => db.visitMedias.update(id, obj);

export const deleteVisitImage = async (id, visitId) => {
  const visitImage = await db.visitMedias.removeFrom({ id: +id, visitId, mediaType: 'image' });

  if (visitImage) {
    deleteImage(visitImage.mediaId);
  }

  return visitImage;
};
