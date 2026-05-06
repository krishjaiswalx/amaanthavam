const Employer = require('../models/Employer');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id, role: 'employer' }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '30d',
  });
};

const registerEmployer = async (req, res) => {
  try {
    const { companyName, email, password } = req.body;
    
    const employerExists = await Employer.findOne({ email });
    if (employerExists) {
      return res.status(400).json({ message: 'Employer already exists' });
    }

    const employer = await Employer.create({ companyName, email, password });

    res.status(201).json({
      _id: employer._id,
      companyName: employer.companyName,
      email: employer.email,
      token: generateToken(employer._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const loginEmployer = async (req, res) => {
  try {
    const { email, password } = req.body;
    const employer = await Employer.findOne({ email });

    if (employer && (await employer.matchPassword(password))) {
      res.json({
        _id: employer._id,
        companyName: employer.companyName,
        email: employer.email,
        token: generateToken(employer._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { registerEmployer, loginEmployer };
