const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
  employer: { type: mongoose.Schema.Types.ObjectId, ref: 'Employer', required: true },
  title: { type: String, required: true },
  companyName: { type: String, required: true }, // Cached from employer or custom
  type: { type: String, enum: ['Full-time', 'Part-time', 'Internship'], required: true },
  skills: [{ type: String }],
  description: { type: String, required: true },
  locationType: { type: String, enum: ['Remote', 'Hybrid', 'On-site'], required: true },
  location: { type: String }, // Required if Hybrid or On-site
}, { timestamps: true });

module.exports = mongoose.model('Internship', internshipSchema);
