/**
 * Main app start point.
 */
var express = require('express');

var app = express();

var config = require('./config');
var error = require('./lib/error_handler');

config.appSetup(app);
//config.dbConnect();
error.setup(app);

app.listen(config.port, function() {
  console.log('Listening on port %d', config.port);
});
