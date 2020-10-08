import Repository from '../helpers/repository';

export default class VisitImageRepository extends Repository {
  constructor(db, pgp) {
    super(db, pgp, 't_visit_image', {});
  }
}
