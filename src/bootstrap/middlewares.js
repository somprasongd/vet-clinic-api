import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { v4 as uuidV4 } from 'uuid';
import config from '../common/config';

morgan.token('id', req => req.id);

export default app => {
  app.use(assignId);
  app.use(morgan(':date[iso] :id :method :url :response-time'));

  const { CORS_OPTIONS } = config;
  // use middlewares
  app.use(cors(CORS_OPTIONS));
  if (app.get('env') === 'production') {
    app.use(helmet());
  }
  app.use(express.json()); // parse application/json
  app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded

  // view engine setup
  app.set('views', path.join(path.parse(__dirname).dir, 'views'));
  // use ejs for view engine
  app.set('view engine', 'ejs');

  // Express behind proxies
  app.set('trust proxy', 'loopback');

  // // ปิดการ caching ของระบบกับ browser กับ server เพื่อป้องกันในกรณี 304 if none match
  // app.disable('etag');

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

function assignId(req, res, next) {
  req.id = uuidV4();
  next();
}
