const Order = require('../models/order');

// ✅ Create a new order
async function placeOrder(data, userId) {
  const { orders, name, email, address, note, total } = data;

  if (!userId || !orders || !total) {
    throw new Error("Missing required order fields (userId, products, total)");
  }

  const order = new Order({
    userId,
    customer: {
      name,
      email,
      address,
      note,
    },
    products: orders, // orders = [{ productId, quantity }]
    price: total,
    status: 'Pending',
  });

  return await order.save();
}

// ✅ Fetch all orders (admin only)
const getAllOrders = async () => {
  try {
    const orders = await Order.find();
    return orders;
  } catch (err) {
    console.error("🔴 getAllOrders Error:", err);
    throw err;
  }
};


// ✅ Get order by ID
// Correct format (assuming your Order model has a field `userId`)
const getOrderById = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.id });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({ message: "Failed to fetch user orders" });
  }
};


// ✅ Cancel order by ID (delete)
async function cancelOrder(id) {
  return await Order.findByIdAndDelete(id);
}

// ✅ Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    await order.save();

    return res.status(200).json({
      message: 'Order status updated successfully',
      updatedOrder: order,
    });

  } catch (error) {
    console.error('Error updating order status:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  placeOrder,
  getAllOrders,
  getOrderById,
  cancelOrder,
  updateOrderStatus,
};
