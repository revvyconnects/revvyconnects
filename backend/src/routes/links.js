const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Link = require('../models/Link');

// Create a new link
router.post('/', auth, async (req, res) => {
  try {
    const { originalUrl, campaignId } = req.body;
    
    if (!originalUrl) {
      return res.status(400).json({ message: 'Original URL is required' });
    }

    const link = new Link({
      originalUrl,
      campaignId,
      creatorId: req.user.id,
      shortCode: Math.random().toString(36).substring(2, 8)
    });

    await link.save();
    res.status(201).json(link);
  } catch (error) {
    console.error('Error creating link:', error);
    res.status(500).json({ message: 'Error creating link' });
  }
});

// Get all links for a user
router.get('/', auth, async (req, res) => {
  try {
    const links = await Link.find({ creatorId: req.user.id });
    res.json(links);
  } catch (error) {
    console.error('Error fetching links:', error);
    res.status(500).json({ message: 'Error fetching links' });
  }
});

// Get a specific link
router.get('/:shortCode', async (req, res) => {
  try {
    const link = await Link.findOne({ shortCode: req.params.shortCode });
    if (!link) {
      return res.status(404).json({ message: 'Link not found' });
    }
    res.json(link);
  } catch (error) {
    console.error('Error fetching link:', error);
    res.status(500).json({ message: 'Error fetching link' });
  }
});

// Redirect from short URL to original URL
router.get('/l/:shortCode', async (req, res) => {
  try {
    const link = await Link.findOne({ shortCode: req.params.shortCode });
    if (!link) {
      return res.status(404).json({ message: 'Link not found' });
    }
    res.redirect(link.originalUrl);
  } catch (error) {
    console.error('Error redirecting:', error);
    res.status(500).json({ message: 'Error redirecting' });
  }
});

module.exports = router; 