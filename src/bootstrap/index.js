import { init as initLogger } from '../common/helpers/logger';
import { createConnection as initDatebase } from '../database';
import middlewares from './middlewares';
import routes from './routes';

export default async app => {
  initLogger(app); // setup winston log
  await initDatebase();
  middlewares(app); // handle middlewares
  routes(app); // handle routes
};
