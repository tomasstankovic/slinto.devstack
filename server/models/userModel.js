/**
 * Mongoose model sample.
 */

var mongoose = require('mongoose');

var userModel = new mongoose.Schema({
  nick: { type: String, required: true, unique: true},
  pass: { type: String, required: true}
});

module.exports = mongoose.model('user', userModel);
