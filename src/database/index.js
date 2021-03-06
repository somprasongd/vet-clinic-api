import handlePromise from 'handle-promise';
import pgPromise from 'pg-promise';
import logger from '../common/helpers/logger';
import config from '../common/config';
import repos from './repositories';

const connection = {};
// Test db connection.
const testConnection = async db => {
  const { error, result: obj } = await handlePromise(db.connect());
  if (error) throw error;
  // Can check the server version here (pg-promise v10.1.0+):
  const { serverVersion } = obj.client;
  logger.debug(`PG: Connected. V${serverVersion}`);
  obj.done();
  return true;
};

const createConnection = async () => {
  // pg-promise initialization options...
  const initOptions = {
    receive(data, result, e) {
      // convert column from xxx_yy to xxxYy
      camelizeColumns(data);
    },
    query(e) {
      // show SQL to console
      logger.debug(`QUERY: ${e.query}`);
    },
    connect(client, dc, useCount) {
      // const cp = client.connectionParameters;
      logger.debug(`Connected to database`);
    },
    disconnect(client, dc) {
      // const cp = client.connectionParameters;
      logger.debug(`Disconnecting from database`);
    },
    error(error, e) {
      if (e.cn) {
        // A connection-related error;
        logger.debug(`CN: ${e.cn}`);
        logger.debug(`EVENT: ${error.message || error}`);
      }
    },
    extend(obj, dc) {
      // Extending the database protocol with our custom repositories;
      obj.upload = new repos.UploadRepository(obj, pgp);
      obj.users = new repos.UsersRepository(obj, pgp);
      obj.base = new repos.BaseRepository(obj, pgp);
      obj.items = new repos.ItemRepository(obj, pgp);
      obj.itemDrugs = new repos.ItemDrugRepository(obj, pgp);
      obj.itemLabs = new repos.ItemLabRepository(obj, pgp);
      obj.itemSets = new repos.ItemSetRepository(obj, pgp);
      obj.appoints = new repos.AppointsRepository(obj, pgp);
      obj.counters = new repos.CountersRepository(obj, pgp);
      obj.members = new repos.MembersRepository(obj, pgp);
      obj.pets = new repos.PetsRepository(obj, pgp);
      obj.petMedias = new repos.PetMediaRepository(obj, pgp);
      obj.visits = new repos.VisitsRepository(obj, pgp);
      obj.vitalsigns = new repos.VisitVitalsignsRepository(obj, pgp);
      obj.visitMedias = new repos.VisitMediaRepository(obj, pgp);
      obj.orders = new repos.OrdersRepository(obj, pgp);
      obj.orderDrugs = new repos.OrderDrugsRepository(obj, pgp);
      obj.resultLabs = new repos.ResultLabsRepository(obj, pgp);
      obj.resultXrays = new repos.ResultXraysRepository(obj, pgp);
      obj.pos = new repos.POSRepository(obj, pgp);
      obj.receipts = new repos.ReceiptRepository(obj, pgp);
      obj.linenotify = new repos.LineNotifyRepository(obj, pgp);
    },
  };

  const camelizeColumns = data => {
    const template = data[0];
    if (!template) return;
    Object.keys(template).forEach(prop => {
      const camel = pgPromise.utils.camelize(prop);
      if (!(camel in template)) {
        for (let i = 0; i < data.length; i += 1) {
          const d = data[i];
          d[camel] = d[prop];
          delete d[prop];
        }
      }
    });
  };

  // Load and initialize pg-promise:
  const pgp = pgPromise(initOptions);

  // date 1082, timestamp 1114, timestampz 1184
  pgp.pg.types.setTypeParser(1082, s => s);

  // Create the database instance:
  const db = (config.DB_URI && pgp(config.DB_URI)) || null;

  if (db) {
    await testConnection(db);
    connection.db = db;
    connection.pgp = pgp;
  }
};

export { createConnection };
export default connection;
