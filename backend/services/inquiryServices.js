const Inquiry = require('../models/inquiry');

const submitInquiry = async (data) => {
  const inquiry = new Inquiry(data);
  return await inquiry.save();
};

const getAllInquiries = async () => {
  try {
    console.log("📦 getAllInquiries called");
    const inquiries = await Inquiry.find();
    return inquiries;
  } catch (error) {
    console.error("🔴 Error in getAllInquiries:", error);
    throw new Error("Failed to fetch inquiries");
  }
};

const getInquiriesByEmail = async (email) => {
  return await Inquiry.find({ email }).sort({ createdAt: -1 });
};



const deleteInquiry = async (id) => {
  return await Inquiry.findByIdAndDelete(id);
};

module.exports = {
  submitInquiry,
  getAllInquiries,
  getInquiriesByEmail, // ✅ add this
  deleteInquiry
};
