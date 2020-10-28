import moment from 'moment';
import Repository from '../helpers/repository';

export default class CountersRepository extends Repository {
  constructor(db, pgp) {
    super(db, pgp, 'c_counter', {});
  }

  getCode(prefix) {
    return this.db.task(async t => {
      let counter = await t.oneOrNone(`SELECT * FROM c_counter WHERE prefix = $1`, prefix);
      if (!counter) {
        counter = await this.create({ prefix, seq: 2 }); // next no is 2
        return `${prefix}${moment(counter.date).format('YYMMDD')}-0001`;
      }

      const today = moment().format('YYMMDD');
      if (moment(counter.date).format('YYMMDD') !== today) {
        counter.seq = 1;
        counter.date = today;
      }
      counter = await this.update(counter.id, {
        date: counter.date,
        seq: counter.seq + 1,
      });
      return `${prefix}${moment(counter.date).format('YYMMDD')}-${`000${counter.seq - 1}`.slice(-4)}`;
    });
  }

  update(id, obj) {
    return this.db.oneOrNone(
      `UPDATE ${this.tableName} set ${
        Object.keys(obj).length > 1 ? '($2:name)=($2:csv)' : '$2:name=$2:csv'
      } WHERE id = $1 RETURNING *`,
      [+id, this.columnize(obj)]
    );
  }
}
