const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/amaanitvam_db';

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@portal.com' });
    if (!existingAdmin) {
      await Admin.create({
        email: 'admin@portal.com',
        password: 'password123'
      });
      console.log('Admin seeded: admin@portal.com / password123');
    } else {
      console.log('Admin already exists');
    }
    
    mongoose.disconnect();
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });
