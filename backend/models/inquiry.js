  const mongoose = require('mongoose');

  const inquirySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type:String, required: true},
    product: { type: String, required: true },
    message: { type: String }
  }, { timestamps: true });

  module.exports = mongoose.model('Inquiry', inquirySchema);
