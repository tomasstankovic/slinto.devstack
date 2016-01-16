/**
 * Statics router.
 */
var express = require('express'),
    router = express.Router();

/**
 * GET: Index
 */
router.get('/', function(req, res) {
  res.render('static/index');
});

module.exports = router;