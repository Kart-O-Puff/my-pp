const express = require('express');
const User = require('../models/User');
const { PerformerDetails } = require('../models/Performer/Details');
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

// Signup route
router.post('/sign-up', async (req, res) => {  // Make the function async
  const { firstName, lastName, email, password, srCode } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Create new user
    const newUser = new User({ firstName, lastName, email, password });
    await newUser.save();

    const newDetail = new PerformerDetails({ user: newUser._id, srCode});
    await newDetail.save();

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } 
  
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch User Data by ID
router.get('/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password'); // Exclude password
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
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
