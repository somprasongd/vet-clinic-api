import connection from '../../../database';
import { deleteById as deleteImage } from '../../upload/upload.service';

const { db } = connection;

export const findVisitFileById = (id, visitId, url) => db.visitMedias.findById(id, visitId, 'file', url);

export const findAllVisitFileByVisitId = ({ visitId, typeId }, url) =>
  db.visitMedias.find({ visitId, typeId, mediaType: 'file' }, url);

export const createVisitFile = obj => db.visitMedias.create(obj);

export const updateVisitFile = async (id, obj) => db.visitMedias.update(id, obj);

export const deleteVisitFile = async (id, visitId) => {
  const visitImage = await db.visitMedias.removeFrom({ id: +id, visitId, mediaType: 'file' });

  if (visitImage) {
    deleteImage(visitImage.mediaId);
  }

  return visitImage;
};
