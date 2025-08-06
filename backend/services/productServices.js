const Product = require('../models/product');

// Add new product
async function addProduct(data) {
  const product = new Product(data);
  return await product.save();
}

//  Get all products
async function listProducts() {
  return await Product.find();
}

//  Get product by ID
async function getProductById(id) {
  return await Product.findById(id);
}

// Update product by ID
async function updateProduct(id, data) {
  return await Product.findByIdAndUpdate(id, data, { new: true });
}

//  Delete product by ID
async function deleteProduct(id) {
  return await Product.findByIdAndDelete(id);
}

module.exports = {
  addProduct,
  listProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
