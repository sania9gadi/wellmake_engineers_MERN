const express = require("express");
const router = express.Router();
const { getAccessToken, createPayPalOrder } = require("../services/paypalServices");

router.post("/get-token", async (req, res) => {
  try {
    const token = await getAccessToken();
    res.json({ access_token: token });
  } catch (err) {
    console.error(" Token Error", err.message);
    res.status(500).json({ error: "Failed to get token" });
  }
});

router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;
    const orderId = await createPayPalOrder(amount);
    res.json({ id: orderId });
  } catch (err) {
    console.error(" Order Error", err.message);
    res.status(500).json({ error: "Failed to create order" });
  }
});

module.exports = router;
