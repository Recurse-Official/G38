const express = require('express');
const FoodListing = require('../models/FoodListing');
const router = express.Router();

// Add Food
router.post('/add', async (req, res) => {
  const { name, type, expiry, location, donorId } = req.body;

  try {
    const food = new FoodListing({ name, type, expiry, location, donorId });
    await food.save();
    res.status(201).json({ message: 'Food added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding food', error });
  }
});

// Get Listings (Seeker)
router.get('/listings', async (req, res) => {
  try {
    const listings = await FoodListing.find();
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching listings', error });
  }
});

module.exports = router;
