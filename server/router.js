/**
 * App router.
 */
var setup = function(app) {
  var staticController = require('./controllers/staticController');

  app.use('/', staticController);
};

module.exports.setup = setup;