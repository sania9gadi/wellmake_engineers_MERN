const express = require('express');
const router = express.Router();

const {
  placeOrder,
  getAllOrders,
  getOrderById,
  cancelOrder,
  updateOrderStatus
} = require('../services/orderServices');

const { protectRoute } = require('../middleware/AuthMiddleware');
const { checkAdmin } = require('../middleware/checkRole');

//  FIX: Import your model here
const Order = require('../models/order');

// Place order with userId and authentication
router.post('/place', protectRoute, async (req, res) => {
  try {
    console.log(" Incoming order:", req.body);
    console.log(" Logged-in user:", req.user._id);

    const order = await placeOrder(req.body, req.user._id);
    res.status(201).json(order);
  } catch (err) {
    console.error(" Error placing order:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get all orders (admin only)
router.get('/all-orders', protectRoute, checkAdmin, async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.json(orders);
  } catch (err) {
    console.error(" Error in /api/order/all-orders:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

//  Get orders for a specific user
router.get('/user/:id', protectRoute, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.id });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error.message);
    res.status(500).json({ message: "Failed to fetch user orders" });
  }
});

//  Get a specific order by ID
router.get('/:orderId', protectRoute, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  Cancel order by ID
router.delete('/:id', async (req, res) => {
  try {
    await cancelOrder(req.params.id);
    res.json({ message: 'Order cancelled' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  Update order status (admin only)
router.put('/admin/order/:id/status', protectRoute, checkAdmin, updateOrderStatus);

module.exports = router;
