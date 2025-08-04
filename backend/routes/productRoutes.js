const express = require('express');
const router = express.Router();

const {
  addProduct,
  listProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../services/productServices');

const { protectRoute } = require('../middleware/AuthMiddleware');
const { checkAdmin } = require('../middleware/checkRole');
const { validateProductData } = require('../middleware/productsValidation');


// routes/productRoutes.js
router.post("/get-multiple", async (req, res) => {
  try {
    const { ids } = req.body; // array of productId strings
    const products = await Product.find({ _id: { $in: ids } });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

// ➕ Add new product — Admin only
router.post('/add', protectRoute, checkAdmin, validateProductData, async (req, res) => {
  try {
    console.log("✅ Add Product route hit");
    const product = await addProduct(req.body);
    res.status(201).json(product);
  } catch (err) {
    console.error("❌ Error in addProduct route:", err);
    res.status(500).json({ message: "Server error while adding product" });
  }
});

// 📦 Get all products — Any logged-in user
router.get('/', async (req, res) =>
 {

  try {
    const products = await listProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

// 🔍 Get product by ID — Any logged-in user
// 🔍 Get product by ID — Public route (no auth)
router.get('/:id', async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch product" });
  }
});

// ✏️ Update product — Admin only
router.put('/:id', protectRoute, checkAdmin, validateProductData, async (req, res) => {
  try {
    const updated = await updateProduct(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update product" });
  }
});

// 🗑️ Delete product — Admin only
router.delete('/:id', protectRoute, checkAdmin, async (req, res) => {
  try {
    await deleteProduct(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete product" });
  }
});

module.exports = router;
