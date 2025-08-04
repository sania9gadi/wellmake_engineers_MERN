const validateProductData = (req, res, next) => {
  const { name, price, category, description, imageUrl } = req.body;

  // ✅ Name is required and must be a string
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ message: "Product name is required and must be a string" });
  }

  // ✅ Price must be a number and non-negative
  if (price === undefined || typeof price !== 'number' || price < 0) {
    return res.status(400).json({ message: "Price must be a non-negative number" });
  }

  // ✅ Category (optional, but must be string if present)
  if (category && typeof category !== 'string') {
    return res.status(400).json({ message: "Category must be a string" });
  }

  // ✅ Description (optional, must be string)
  if (description && typeof description !== 'string') {
    return res.status(400).json({ message: "Description must be a string" });
  }

  // ✅ imageUrl (optional, but must be a valid URL if present)
  const urlRegex = /^(http|https):\/\/[^ "]+$/;
  if (imageUrl && !urlRegex.test(imageUrl)) {
    return res.status(400).json({ message: "Invalid image URL format" });
  }

  next(); // All validations passed
};

module.exports = { validateProductData };
