const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const User = require('../models/User');

const protectAdmin = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      
      if (decoded.role !== 'admin') {
        return res.status(401).json({ message: 'Not authorized as admin' });
      }

      req.admin = await Admin.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const protectUser = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      
      if (decoded.role !== 'user') {
        return res.status(401).json({ message: 'Not authorized as user' });
      }

      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const protectEmployer = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      
      // Allow legacy 'admin' or new 'employer' roles
      if (decoded.role !== 'employer' && decoded.role !== 'admin') {
        return res.status(401).json({ message: 'Not authorized as employer' });
      }

      // If it's a legacy admin, maybe they don't have employer entry.
      // But we will just check Employer collection.
      const employer = await require('../models/Employer').findById(decoded.id).select('-password');
      if (!employer) {
        return res.status(401).json({ message: 'Employer not found' });
      }
      req.employer = employer;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protectAdmin, protectUser, protectEmployer };
