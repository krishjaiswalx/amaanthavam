const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  internship: { type: mongoose.Schema.Types.ObjectId, ref: 'Internship', required: true },
  employer: { type: mongoose.Schema.Types.ObjectId, ref: 'Employer', required: true }, // Store employer for easy queries
  name: { type: String, required: true },
  email: { type: String, required: true },
  skills: [{ type: String }],
  resumeUrl: { type: String },
  status: { 
    type: String, 
    enum: ['pending', 'test', 'shortlisted', 'selected', 'rejected'], 
    default: 'pending' 
  },
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
