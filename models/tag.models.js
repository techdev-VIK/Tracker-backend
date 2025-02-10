const mongoose = require('mongoose');

// Tag Schema
const trackerTagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tag name is required'],
    unique: true,  
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const TrackerTag = mongoose.model('TrackerTag', trackerTagSchema);

module.exports = TrackerTag;
