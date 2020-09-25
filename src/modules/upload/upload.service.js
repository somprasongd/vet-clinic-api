import fs from 'fs';
import logger from '../../common/helpers/logger';
import connection from '../../database';

const { db } = connection;

export const create = ({ filename, filenameThumbnail, filenameThumbnailSmall, uploadType }) =>
  db.upload.create({ filename, filenameThumbnail, filenameThumbnailSmall, uploadType });

export const findById = id => db.upload.findById(id);

const unlinkCB = err => {
  if (err) {
    logger.error(err);
  }
};

export const deleteById = async id => {
  const deleteds = await db.upload.remove(id);

  deleteds.forEach(obj => {
    const { filename, filenameThumbnail, filenameThumbnailSmall, uploadType } = obj;

    fs.unlink(filename, unlinkCB);

    if (uploadType === 'image') {
      fs.unlink(filenameThumbnail, unlinkCB);
      fs.unlink(filenameThumbnailSmall, unlinkCB);
    }
  });
};
