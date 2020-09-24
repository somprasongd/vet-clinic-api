import Repository from '../helpers/repository';

export default class ImageProfileRepository extends Repository {
  constructor(db, pgp) {
    super(db, pgp, 'pets_imageprofile', {
      filename: 'image',
      filenameThumbnail: 'thumbnail',
      filenameThumbnailSmall: 'thumbnail_small',
    });
  }
}
