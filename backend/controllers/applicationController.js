const Application = require('../models/Application');
const Internship = require('../models/Internship');

const getEmployerApplications = async (req, res) => {
  try {
    const applications = await Application.find({ employer: req.employer._id })
      .populate('user', 'name email')
      .populate('internship', 'title type')
      .sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getUserApplications = async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user._id })
      .populate('internship', 'title companyName type locationType location')
      .sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createApplication = async (req, res) => {
  try {
    const { internshipId, name, email, skills } = req.body;
    const resumeUrl = req.file ? req.file.path.replace(/\\/g, '/') : '';

    const internship = await Internship.findById(internshipId);
    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }

    // Convert skills to array if it is a comma separated string
    let parsedSkills = [];
    if (typeof skills === 'string') {
      parsedSkills = skills.split(',').map(s => s.trim()).filter(s => s !== '');
    } else if (Array.isArray(skills)) {
      parsedSkills = skills;
    }

    console.log(`Creating application for user ${req.user._id} on internship ${internshipId}`);

    const application = await Application.create({
      user: req.user._id,
      internship: internship._id,
      employer: internship.employer,
      name,
      email,
      skills: parsedSkills,
      resumeUrl
    });

    console.log(`Application created: ${application._id}`);
    res.status(201).json(application);
  } catch (error) {
    console.error('Create Application Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'test', 'shortlisted', 'selected', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const application = await Application.findById(id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    if (application.employer.toString() !== req.employer._id.toString()) {
       return res.status(403).json({ message: 'Not authorized' });
    }

    application.status = status;
    await application.save();

    res.json(application);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await Application.findById(id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    if (application.employer.toString() !== req.employer._id.toString()) {
       return res.status(403).json({ message: 'Not authorized' });
    }

    await application.deleteOne();

    res.json({ message: 'Application removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getEmployerApplications,
  getUserApplications,
  createApplication,
  updateApplicationStatus,
  deleteApplication
};
