const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  address: String,
  message: String,
  quantity: { type: Number, required: true },
  productName: { type: String, required: true },
  email: { type: String, required: true },
}, { timestamps: true });

const Quote = mongoose.model('Quote', quoteSchema);
module.exports = Quote;
