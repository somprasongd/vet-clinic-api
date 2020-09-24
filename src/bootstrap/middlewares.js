import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import config from '../common/config';

export default app => {
  const { CORS_OPTIONS } = config;
  // use middlewares
  app.use(cors(CORS_OPTIONS));
  if (app.get('env') === 'production') {
    app.use(helmet());
  }
  app.use(express.json()); // parse application/json
  app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded

  // Express behind proxies
  app.set('trust proxy', 'loopback');

  // ปิดการ caching ของระบบกับ browser กับ server เพื่อป้องกันในกรณี 304 if none match
  app.disable('etag');

  app.use((req, res, next) => {
    const hostUrl = `${req.protocol}://${req.get('host')}`;
    const originalUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;

    req.getHost = function() {
      return hostUrl;
    };
    req.getUrl = function() {
      return originalUrl;
    };
    next();
  });
};
