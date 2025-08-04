
const validateSignup = (req, res, next) => {
  const { name, email, password, role } = req.body;

  // Check if all required fields are present
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required" });
  }

  // Validate email format
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // Validate password length
  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long" });
  }

  // Optional: validate role
  const allowedRoles = ['user', 'admin'];
  if (role && !allowedRoles.includes(role)) {
    return res.status(400).json({ message: "Role must be either 'user' or 'admin'" });
  }

  next(); // All good, move to signupUser controller
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  // Check if both fields are present
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  next();
};

module.exports = { validateSignup, validateLogin };
