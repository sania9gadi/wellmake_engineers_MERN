// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     await mongoose.connect('mongodb://localhost:27017/qms');  // ⬅️ options removed
//     console.log('MongoDB connected successfully');
//   } catch (err) {
//     console.error('MongoDB connection failed:', err.message);
//     throw err;
//   }
// };
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://sania:sAnia%402385@cluster0.cpectwn.mongodb.net/qms', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    throw err;
  }
};

module.exports = connectDB;

// mongodb+srv://sania:<db_password>@cluster0.cpectwn.mongodb.net/
