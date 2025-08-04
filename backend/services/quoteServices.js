const Quote = require('../models/quote');


async function requestQuote(data) {
  const quote = new Quote(data);
  return await quote.save();
}

async function getAllQuotes() {
  return await Quote.find().sort({ createdAt: -1 });
}


async function getQuoteById(id) {
  return await Quote.findById(id);
}


async function deleteQuote(id) {
  return await Quote.findByIdAndDelete(id);
}


async function updateQuoteStatus(id, status) {
  return await Quote.findByIdAndUpdate(id, { status }, { new: true });
}

module.exports = {
  requestQuote,
  getAllQuotes,
  getQuoteById,
  deleteQuote,
  updateQuoteStatus
};
