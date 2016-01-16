/**
 * Sport model.
 */
var mongoose = require('mongoose');

var sampleModel = new mongoose.Schema({
  title: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('sample', userModel);