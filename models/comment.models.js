const mongoose = require('mongoose');

// Comment Schema
const trackerCommentSchema = new mongoose.Schema({
  lead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TrackerLead',  
    required: [true, 'Lead reference is required'],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TrackerSalesAgent',  
    required: [true, 'Author is required'],
  },
  commentText: {
    type: String,
    required: [true, 'Comment text is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  }
});

const TrackerComment = mongoose.model('TrackerComment', trackerCommentSchema);

module.exports = TrackerComment;
