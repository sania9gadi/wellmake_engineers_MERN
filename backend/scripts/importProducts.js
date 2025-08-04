// const mongoose = require("mongoose");
// const XLSX = require("xlsx");
// const Product = require("./models/product"); // schema yahi hona chahiye

// // 📌 Step 1: Connect to DB
// mongoose.connect("mongodb://127.0.0.1:27017/coldroomDB", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // 📌 Step 2: Read Excel
// const workbook = XLSX.readFile("products.xlsx");
// const sheet = workbook.SheetNames[0];
// let data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

// // 📌 Step 3: Convert features from comma-string to array
// data = data.map((item) => ({
//   ...item,
//   features: item.features ? item.features.split(",").map(f => f.trim()) : [],
// }));

// // 📌 Step 4: Insert in DB
// Product.insertMany(data)
//   .then(() => {
//     console.log("✅ Imported successfully");
//     mongoose.disconnect();
//   })
//   .catch((err) => {
//     console.log("❌ Error importing:", err);
//     mongoose.disconnect();
//   });



const mongoose = require("mongoose");
const XLSX = require("xlsx");
const Product = require("../models/product");
const connectDB = require('../db/connect');

// 1. Connect to DB
connectDB();

// 2. Read Excel file
const workbook = XLSX.readFile('./data/products1.xlsx');

const sheet = workbook.SheetNames[0];
let data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

// 3. Format every product entry safely
data = data.map((item) => ({
  name: item.name || "Unnamed Product", // Required
  description: item.description || "",
  price: item.price || 0,
  category: item.category || "",
  subcategory: item.subcategory || "",
  imageUrl: item.imageUrl || "",
  brochureUrl: item.brochureUrl || "",
  features: item.features
    ? item.features.split(",").map((f) => f.trim())
    : [],
}));

// 4. Insert into DB
Product.insertMany(data)
  .then(() => {
    console.log("✅ Products imported successfully!");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("❌ Import Error:", err);
    mongoose.disconnect();
  });
