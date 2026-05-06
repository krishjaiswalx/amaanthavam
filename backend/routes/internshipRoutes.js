const express = require('express');
const router = express.Router();
const {
  getInternships,
  getEmployerInternships,
  createInternship,
  deleteInternship
} = require('../controllers/internshipController');
const { protectEmployer } = require('../middleware/authMiddleware');

router.route('/')
  .get(getInternships)
  .post(protectEmployer, createInternship);

router.route('/employer')
  .get(protectEmployer, getEmployerInternships);

router.route('/:id')
  .delete(protectEmployer, deleteInternship);

module.exports = router;
