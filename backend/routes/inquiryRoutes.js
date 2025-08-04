/*const express = require('express');
const router = express.Router();
const Inquiry = require('../models/inquiry');

const {
  submitInquiry,
  getAllInquiries,
  getInquiriesByEmail  ,
  deleteInquiry
} = require('../services/inquiryServices');

const { protectRoute } = require('../middleware/AuthMiddleware');
const { checkAdmin } = require('../middleware/checkRole');
const { validateInquiryData } = require('../middleware/inquiryValidation');
router.post('/save', protectRoute, validateInquiryData, async (req, res) => {
  try {
    const inquiry = await submitInquiry(req.body);
    res.status(201).json(inquiry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/my', protectRoute, async (req, res) => {
  try {
    const userEmail = req.user.email;
    const myInquiries = await Inquiry.find({ email: userEmail }).sort({ createdAt: -1 });
    res.json(myInquiries);
  } catch (err) {
    console.error('Error fetching user inquiries:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/all-inquiries', protectRoute, checkAdmin, async (req, res) => {
  try {
    console.log("🟡 Request received to /all-inquiries");
    const inquiries = await getAllInquiries();  
    console.log("🟢 Inquiries fetched successfully:", inquiries.length);
    res.json(inquiries);
  } catch (err) {
    console.error(" Error in /all-inquiries route:", err);  
    res.status(500).json({ error: err.message, stack: err.stack });
  }
});

router.delete('/:id', protectRoute, checkAdmin, async (req, res) => {
  try {
    await deleteInquiry(req.params.id);
    res.json({ message: 'Inquiry deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
*/

const express = require('express');
const router = express.Router();
const Inquiry = require('../models/inquiry');

const {
  submitInquiry,
  getAllInquiries,
  getInquiriesByEmail,
  deleteInquiry
} = require('../services/inquiryServices');

const { protectRoute } = require('../middleware/AuthMiddleware');
const { checkAdmin } = require('../middleware/checkRole');
const { validateInquiryData } = require('../middleware/inquiryValidation');

// ✅ Updated /save route
router.post('/save', protectRoute, validateInquiryData, async (req, res) => {
  try {
    const inquiryData = {
      ...req.body,
      userId: req.user._id,  
    };

    const inquiry = await submitInquiry(inquiryData);
    res.status(201).json(inquiry);
  } catch (err) {
    console.log("❌ Inquiry Save Error:", err);
    console.log("📨 Inquiry Body:", req.body);

    res.status(500).json({ error: err.message });
  }
});

// ✅ My inquiries - user-specific
router.get('/my', protectRoute, async (req, res) => {
  try {
    const userEmail = req.user.email;
    const myInquiries = await Inquiry.find({ email: userEmail }).sort({ createdAt: -1 });
    res.json(myInquiries);
  } catch (err) {
    console.error('Error fetching user inquiries:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Admin - Get all inquiries
router.get('/all-inquiries', protectRoute, checkAdmin, async (req, res) => {
  try {
    console.log("🟡 Request received to /all-inquiries");
    const inquiries = await getAllInquiries();  
    console.log("🟢 Inquiries fetched successfully:", inquiries.length);
    res.json(inquiries);
  } catch (err) {
    console.error("Error in /all-inquiries route:", err);  
    res.status(500).json({ error: err.message, stack: err.stack });
  }
});

// ✅ Admin - Delete inquiry
router.delete('/:id', protectRoute, checkAdmin, async (req, res) => {
  try {
    await deleteInquiry(req.params.id);
    res.json({ message: 'Inquiry deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
