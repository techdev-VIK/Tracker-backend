const mongoose = require('mongoose');

// Lead Schema
const trackerLeadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Lead name is required'],
  },
  source: {
    type: String,
    required: [true, 'Lead source is required'],
    enum: ['Website', 'Referral', 'Cold Call', 'Advertisement', 'Email', 'Other'],  // 
  },
  salesAgent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TrackerSalesAgent',  
    required: [true, 'Sales Agent is required'],
  },
  status: {
    type: String,
    required: true,
    enum: ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Closed'],  
    default: 'New',
  },
  tags: {
    type: [String],  
  },
  timeToClose: {
    type: Number,
    required: [true, 'Time to Close is required'],
    min: [1, 'Time to Close must be a positive number'],  
  },
  priority: {
    type: String,
    required: true,
    enum: ['High', 'Medium', 'Low'], 
    default: 'Medium',
  },
  budget: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  closedAt: {
    type: Date, 
  },
});


trackerLeadSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});


const TrackerLead = mongoose.model('TrackerLead', trackerLeadSchema);

module.exports = TrackerLead;
