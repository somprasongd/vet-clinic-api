import Repository from '../helpers/repository';

export default class VisitImageRepository extends Repository {
  constructor(db, pgp) {
    super(db, pgp, 'pets_visitimage', {
      userUpdateId: 'user_update_id',
      visitId: 'visit_id',
      mediatypeId: 'mediatype_id',
    });
  }
}
