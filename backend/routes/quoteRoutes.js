const express = require('express');
const router = express.Router();

const Quote = require('../models/quote'); // ✅ ADD THIS LINE

const {
  requestQuote,
  getAllQuotes,
  getQuoteById,
  deleteQuote,
  updateQuoteStatus
} = require('../services/quoteServices');

const { protectRoute } = require('../middleware/AuthMiddleware');
const { checkAdmin } = require('../middleware/checkRole');

// ✅ Get current user's quotes
router.get('/my', protectRoute, async (req, res) => {
  try {
    const userEmail = req.user.email;
    const myQuotes = await Quote.find({ email: userEmail }).sort({ createdAt: -1 });
    res.json(myQuotes);
  } catch (err) {
    console.error('Error fetching user quotations:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Submit a new quote
router.post('/request', async (req, res) => {
  try {
    const quote = await requestQuote(req.body);
    res.status(201).json(quote);
  } catch (err) {
    console.error("Error saving quote:", err);
    res.status(500).json({ message: 'Failed to submit quotation', error: err.message });
  }
});

// ✅ Admin: get all quotes
router.get('/', async (req, res) => {
  try {
    const quotes = await getAllQuotes();
    res.status(200).json(quotes);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch quotations', error: err.message });
  }
});

// ✅ Get quote by ID
router.get('/:id', async (req, res) => {
  try {
    const quote = await getQuoteById(req.params.id);
    if (!quote) return res.status(404).json({ message: 'Quote not found' });
    res.status(200).json(quote);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving quote', error: err.message });
  }
});

// ✅ Delete quote
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await deleteQuote(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Quote not found' });
    res.status(200).json({ message: 'Quote deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting quote', error: err.message });
  }
});

// ✅ Update quote status
router.patch('/:id/status', async (req, res) => {
  const { status } = req.body;
  try {
    const updated = await updateQuoteStatus(req.params.id, status);
    if (!updated) return res.status(404).json({ message: 'Quote not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating status', error: err.message });
  }
});

module.exports = router;
