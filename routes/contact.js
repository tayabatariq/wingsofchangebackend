// backend/routes/contact.js
const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Please provide name, email and message.' });
    }
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address.' });
    }

    // Create and save
    const doc = new Contact({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      ip: req.ip,
      userAgent: req.get('User-Agent') || ''
    });

    await doc.save();
    return res.status(201).json({ message: 'Thanks! We’ll get back to you soon.' });
  } catch (err) {
    console.error('Contact POST error:', err);
    return res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

module.exports = router;
