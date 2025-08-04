const express = require('express');
const router = express.Router();
const { loginAdmin} = require('../services/adminServices');
const { updateOrderStatus } = require('../services/orderServices');
const { protectRoute } = require('../middleware/AuthMiddleware');
const { checkAdmin } = require('../middleware/checkRole');


router.post('/login', loginAdmin);

router.put('/order/:id/status', protectRoute, checkAdmin, updateOrderStatus);


module.exports = router;
