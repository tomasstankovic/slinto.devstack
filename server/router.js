/**
 * App router.
 */
var mainController = require('./controllers/mainController');

var setup = function(app) {
  app.use('/', mainController);
};

module.exports.setup = setup;
