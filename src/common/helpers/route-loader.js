import fs from 'fs';
import path from 'path';
import express from 'express';

export default dir => {
  const apiRouter = express.Router();

  fs.readdirSync(dir)
    .filter(file => file.indexOf('.') !== 0 && file !== 'index.js')
    .forEach(feature => {
      // load from /api/modules/[feature]/[feature].route.js
      const { router } = require(path.join(dir, `${feature}`, `${feature}.route`));
      apiRouter.use(`/${feature}`, router);
    });

  return apiRouter;
};
