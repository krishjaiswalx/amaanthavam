const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  getEmployerApplications,
  getUserApplications,
  createApplication,
  updateApplicationStatus,
  deleteApplication
} = require('../controllers/applicationController');
const { protectEmployer, protectUser } = require('../middleware/authMiddleware');
// const { storage } = require('../utils/cloudinary'); // Use local for now as requested

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  // fileFilter removed for testing
});

router.route('/')
  .post(protectUser, upload.single('resume'), createApplication);

router.route('/employer')
  .get(protectEmployer, getEmployerApplications);

router.route('/my')
  .get(protectUser, getUserApplications);

router.route('/:id')
  .delete(protectEmployer, deleteApplication);

router.route('/:id/status')
  .put(protectEmployer, updateApplicationStatus);

module.exports = router;
