/**
 * Sample model.
 */
import mongoose as 'mongoose';

var sampleModel = new mongoose.Schema({
  title: {
    type: String,
    required: true
  }
});

export default mongoose.model('sample', userModel);
