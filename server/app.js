/**
 * Main app start point.
 */
import express from 'express';
const app = express();

import * as config from './config';
import * as error from './lib/error_handler';

config.appSetup(app);
//config.dbConnect();
error.setup(app);

app.listen(config.port, () => {
  console.log('Listening on port %d', config.port);
});
