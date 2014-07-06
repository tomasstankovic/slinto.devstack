/**
 * Index router.
 */
var express = require('express'),
  router = express.Router();

router.get('/', function(req, res) {
  res.render('index', {
    url: 'index'
  });
});

module.exports = router;
