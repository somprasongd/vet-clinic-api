import { init as initLogger } from '../common/helpers/logger';
import { createConnection as initDatebase } from '../database';
import middlewares from './middlewares';
import routes from './routes';

export default app => {
  initLogger(app); // setup winston log
  initDatebase();
  middlewares(app); // handle middlewares
  routes(app); // handle routes
};
