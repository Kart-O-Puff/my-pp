const express = require('express');
const User = require('../models/User');
const PerformerDetails = require('../models/Performer/Details');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
const multer = require('multer');
const path = require('path');

// Setup multer storage for image files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/'); // Change the destination folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Filename will be a timestamp
  },
});

const upload = multer({ storage: storage });

// Save/Update profile (with image upload)
router.put('/profile', upload.single('image'), async (req, res) => {
  const { email, ...updatedData } = req.body;
  if (req.file) {
    updatedData.image = `/uploads/${req.file.filename}`; // Save the image path
  }

  try {
    const profile = await Profile.findOneAndUpdate(
      { email },
      { $set: updatedData },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: 'Profile updated successfully', profile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Signup route
router.post('/sign-up', async (req, res) => {  // Make the function async
  const { firstName, lastName, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Create new user
    const newUser = new User({ firstName, lastName, email, password });
    await newUser.save();

    const newDetail = new PerformerDetails({ userId: newUser._id});
    await newDetail.save();

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } 
  
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Profile model
const Profile = require('../models/Profile');

// Fetch profile data
router.get('/profile', async (req, res) => {
  try {
    const profile = await Profile.findOne({ email: req.query.email }); // Use email or userId from token
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found.' });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Save/Update profile
router.put('/profile', async (req, res) => {
  const { email, ...updatedData } = req.body;

  try {
    // Upsert the profile (insert if not exists, update if exists)
    const profile = await Profile.findOneAndUpdate(
      { email }, // Find by email (or use a unique identifier)
      { $set: updatedData }, // Update with new data
      { new: true, upsert: true } // Return the updated document, and create it if it doesn't exist
    );

    res.status(200).json({ message: 'Profile updated successfully', profile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// Login route
router.post('/sign-in', async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: 'User does not exist.' });
      }

      // Check if password matches
      const isMatch = await bcrypt.compare(password, user.password);
      
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
      

      res.status(200).json({ token, user: { _id: user._id, role: user.role }, message: 'Login successful' });
      console.log("Login successful!");
    } 
    
    catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;
