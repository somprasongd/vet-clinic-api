import express from 'express';
import bootstrap from './bootstrap';
import logger from './common/helpers/logger';

async function main() {
  // Create express instance
  const app = express();

  await bootstrap(app);

  // Start standalone server if directly running
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    logger.log(`API server listening on port ${port}`);
  });

  return app;
}

main();
