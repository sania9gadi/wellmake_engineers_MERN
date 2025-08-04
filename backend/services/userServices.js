const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // ✅ Required

// Register new user
async function registerUser(data) {
  const { name, email, password, role } = data;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists with this email");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    role: role || 'user'
  });

  return await user.save();
}

async function findUserByEmail(email) {
  return await User.findOne({ email });
}

// Signup controller
const signupUser = async (req, res) => {
  try {
    const newUser = await registerUser(req.body);
    const { password, ...userData } = newUser.toObject();

    res.status(201).json({
      message: "User registered successfully",
      user: userData
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login controller
const loginUserHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    const { password: pwd, ...userData } = user.toObject();

    res.status(200).json({
      message: "Login successful",
      token,
      user: userData
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // exclude password
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Server error while fetching users" });
  }
};

async function deleteUser(id) {
  return await User.findByIdAndDelete(id);
}


const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // req.user is populated by the protectRoute middleware
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User profile fetched successfully",
      user
    });
  } catch (err) {
    console.error("Error in getProfile middleware:", err.message);
    res.status(500).json({ message: "Server error while fetching profile" });
  }
};
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, phone } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, phone },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
      }
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
module.exports = {
  signupUser,
  loginUserHandler,
  registerUser,
  findUserByEmail,
  getAllUsers,
  deleteUser,
  getProfile,
  updateProfile
};
