const Internship = require('../models/Internship');

// @desc    Get all internships (public)
const getInternships = async (req, res) => {
  try {
    // Add sorting/filtering logic if query params exist
    let query = {};
    const internships = await Internship.find(query).sort({ createdAt: -1 }).populate('employer', 'companyName logoUrl');
    res.json(internships);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get employer's internships
const getEmployerInternships = async (req, res) => {
  try {
    const internships = await Internship.find({ employer: req.employer._id }).sort({ createdAt: -1 });
    res.json(internships);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create an internship
const createInternship = async (req, res) => {
  try {
    const { title, type, skills, description, locationType, location } = req.body;
    
    let parsedSkills = [];
    if (typeof skills === 'string') {
      parsedSkills = skills.split(',').map(s => s.trim()).filter(s => s !== '');
    } else if (Array.isArray(skills)) {
      parsedSkills = skills;
    }

    const internship = await Internship.create({
      employer: req.employer._id,
      companyName: req.employer.companyName,
      title,
      type,
      skills: parsedSkills,
      description,
      locationType,
      location
    });

    res.status(201).json(internship);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete an internship
const deleteInternship = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);

    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }

    if (internship.employer.toString() !== req.employer._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await internship.deleteOne();
    res.json({ message: 'Internship removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getInternships,
  getEmployerInternships,
  createInternship,
  deleteInternship
};
