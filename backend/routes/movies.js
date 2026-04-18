const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// GET all movies (unswiped)
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find({ liked: null });
    res.json({ success: true, data: movies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET all liked movies (matches)
router.get('/matches', async (req, res) => {
  try {
    const matches = await Movie.find({ liked: true });
    res.json({ success: true, data: matches });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET all movies (for browsing purposes)
router.get('/all', async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.json({ success: true, data: movies });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST like a movie
router.post('/:id/like', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      { liked: true },
      { new: true }
    );
    if (!movie) {
      return res.status(404).json({ success: false, message: 'Movie not found' });
    }
    res.json({ success: true, data: movie, message: "It's a Match!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST dislike a movie
router.post('/:id/dislike', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      { liked: false },
      { new: true }
    );
    if (!movie) {
      return res.status(404).json({ success: false, message: 'Movie not found' });
    }
    res.json({ success: true, data: movie });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST reset all movies (for demo/testing)
router.post('/reset', async (req, res) => {
  try {
    await Movie.updateMany({}, { liked: null });
    res.json({ success: true, message: 'All movies reset successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET a single movie
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ success: false, message: 'Movie not found' });
    }
    res.json({ success: true, data: movie });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
