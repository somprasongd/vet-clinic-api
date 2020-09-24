import Repository from '../helpers/repository';

export default class PetsRepository extends Repository {
  constructor(db, pgp) {
    super(db, pgp, 'pets_labtestresult', {
      itemId: 'item_id',
      resultStr: 'result_str',
      normalStr: 'normal_str',
      normalMax: 'normal_max',
      normalMin: 'normal_min',
      labResultId: 'lab_result_id',
      interpretLevel: 'interpret_level',
      userUpdateId: 'user_update_id',
      updateDatetime: 'update_datetime',
    });
  }

  findById(id) {
    return this.db.oneOrNone(
      `SELECT
      pets_labtestresult.id
      , pets_labtestresult.label
      , pets_labtestresult.result
      , pets_labtestresult.result_str
      , pets_labtestresult.normal_str
      , pets_labtestresult.normal_max
      , pets_labtestresult.normal_min
      , pets_labtestresult.unit
      , pets_labtestresult.item_id
      , pets_labtestresult.lab_result_id
      , pets_labtestresult.interpret
      , pets_labtestresult.interpret_level
      , pets_labtestresult.update_datetime
      FROM pets_labtestresult 
      WHERE pets_labtestresult.id = $1`,
      +id
    );
  }
}
