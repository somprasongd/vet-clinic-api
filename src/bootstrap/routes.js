import 'express-async-errors';
import path from 'path';
import { NotFoundExceptions } from '../common/helpers/exceptions';
import logger from '../common/helpers/logger';
import routeLoader from '../common/helpers/route-loader';

export default app => {
  // load api router
  const PATH = path.join(path.parse(__dirname).dir, 'modules');
  const apiRouter = routeLoader(PATH);
  app.use('/api', apiRouter);

  // handle 404
  app.use((req, res, next) => {
    next(new NotFoundExceptions(`Invalid route: Can not find ${req.originalUrl} on this server!`));
  });

  // handle error
  app.use((error, req, res, next) => {
    // Log the exception
    logger.error(error.message);
    if (app.get('env') === 'development') {
      console.log(error);
    }
    res.status(error.statusCode || 500);
    return res.json({
      error: {
        status: error.status,
        statusCode: error.statusCode,
        message: error.message,
      },
    });
  });
};
