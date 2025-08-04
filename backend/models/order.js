const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    customer: {
      name: String,
      email: String,
      address: String,
      note: String,
    },
   products: [
  {
    name: { type: String, required: true },
    productId: { type: String, required: true },
    quantity: { type: Number, required: true },
    imageUrl: { type: String }  // ✅ Add this line
  }
],

    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: 'Pending',
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true } // ✅ Correctly added as second argument here
);

module.exports = mongoose.model('Order', orderSchema);
