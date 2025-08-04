const validateInquiryData = (req, res, next) => {
  const { name, email, phone, product } = req.body;

  if (!name?.trim() || !email?.trim() || !phone?.trim() || !product?.trim()) {
    return res.status(400).json({ message: "All fields (name, email, phone, product) are required." });
  }

  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(phone.trim())) {
    return res.status(400).json({ message: "Invalid phone number. It should be 10 digits." });
  }

  next();
};

module.exports = { validateInquiryData };
