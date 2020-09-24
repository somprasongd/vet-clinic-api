import Repository from '../helpers/repository';

export default class VisitMediaRepository extends Repository {
  constructor(db, pgp) {
    super(db, pgp, 'pets_visitmedia', {
      mediatypeId: 'mediatype_id',
      userUpdateId: 'user_update_id',
      visitId: 'visit_id',
    });
  }
}
