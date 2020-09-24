import moment from 'moment';
import Repository from '../helpers/repository';

export default class CountersRepository extends Repository {
  constructor(db, pgp) {
    super(db, pgp, 'pets_counter', {});
  }

  getCode(prefix) {
    return this.db.task(async t => {
      let counter = await t.oneOrNone(`SELECT * FROM pets_counter WHERE prefix = $1`, prefix);
      if (!counter) {
        counter = await this.create({ prefix, seq: 2 }); // next no is 2
        return `${prefix}${moment(counter.date).format('YYMMDD')}-0001`;
      }

      const today = moment().format('YYMMDD');
      if (moment(counter.date).format('YYMMDD') !== today) {
        counter.seq = 1;
        counter.date = moment();
      }
      counter = await this.update(counter.id, {
        date: counter.date,
        seq: counter.seq + 1,
      });
      return `${prefix}${moment(counter.date).format('YYMMDD')}-${`000${counter.seq - 1}`.slice(-4)}`;
    });
  }
}
