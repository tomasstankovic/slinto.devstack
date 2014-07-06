/**
 * Main app start point.
 */
var express = require('express'),
  app = express();

var config = require('./config'),
  router = require('./router'),
  error = require('./error_handler');

config.appSetup(app);
//config.dbConnect();
router.setup(app);
error.setup(app);

app.listen(config.port, function() {
  console.log('Listening on port %d', config.port);
});
