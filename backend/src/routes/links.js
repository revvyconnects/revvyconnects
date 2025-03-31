const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const auth = require('../middleware/auth');

// Generate a random slug
function generateSlug(length = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Create a new link (protected)
router.post('/', auth, async (req, res) => {
  try {
    const { targetUrl, name } = req.body;
    const creatorId = req.user.id; // Get creator ID from authenticated user

    if (!targetUrl) {
      return res.status(400).json({ message: 'Target URL is required' });
    }

    // Generate a unique slug
    let slug = generateSlug();
    let existingLink = await prisma.link.findUnique({ where: { slug } });
    while (existingLink) {
      slug = generateSlug();
      existingLink = await prisma.link.findUnique({ where: { slug } });
    }

    const link = await prisma.link.create({
      data: {
        slug,
        targetUrl,
        creatorId,
        name: name || null
      }
    });

    res.status(201).json({
      ...link,
      shortUrl: `${process.env.NODE_ENV === 'production' ? 'https://revvy-api.onrender.com' : 'http://localhost:5000'}/l/${link.slug}`
    });
  } catch (error) {
    console.error('Error creating link:', error);
    res.status(500).json({ message: 'Error creating link' });
  }
});

// Get all links for authenticated creator
router.get('/', auth, async (req, res) => {
  try {
    const creatorId = req.user.id; // Get creator ID from authenticated user

    const links = await prisma.link.findMany({
      where: { creatorId },
      orderBy: { createdAt: 'desc' },
      include: { creator: true } // Include creator details if needed
    });

    const linksWithShortUrl = links.map(link => ({
      ...link,
      shortUrl: `${process.env.NODE_ENV === 'production' ? 'https://revvy-api.onrender.com' : 'http://localhost:5000'}/l/${link.slug}`
    }));

    res.json(linksWithShortUrl);
  } catch (error) {
    console.error('Error fetching links:', error);
    res.status(500).json({ message: 'Error fetching links' });
  }
});

// Redirect route (public)
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    
    const link = await prisma.link.update({
      where: { slug },
      data: { clicks: { increment: 1 } }
    });

    if (!link) {
      return res.status(404).json({ message: 'Link not found' });
    }

    res.redirect(link.targetUrl);
  } catch (error) {
    console.error('Error redirecting:', error);
    res.status(500).json({ message: 'Error redirecting to target URL' });
  }
});

module.exports = router; 