const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Generate a random slug
function generateSlug(length = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Create a new link
router.post('/', async (req, res) => {
  try {
    const { targetUrl, creatorId, name } = req.body;

    if (!targetUrl || !creatorId) {
      return res.status(400).json({ message: 'Target URL and creator ID are required' });
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

// Get all links for a creator
router.get('/', async (req, res) => {
  try {
    const { creatorId } = req.query;

    if (!creatorId) {
      return res.status(400).json({ message: 'Creator ID is required' });
    }

    const links = await prisma.link.findMany({
      where: { creatorId },
      orderBy: { createdAt: 'desc' }
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

// Redirect route (this will be mounted at /l/:slug)
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