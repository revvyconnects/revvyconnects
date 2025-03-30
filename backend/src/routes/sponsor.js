const express = require('express');
const router = express.Router();

// Get sponsor profile
router.get('/profile', async (req, res) => {
  try {
    res.status(200).json({ message: 'Sponsor profile endpoint' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update sponsor profile
router.put('/profile', async (req, res) => {
  try {
    res.status(200).json({ message: 'Update sponsor profile endpoint' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 