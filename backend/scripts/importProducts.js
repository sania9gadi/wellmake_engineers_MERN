// 
const mongoose = require("mongoose");
const XLSX = require("xlsx");
const path = require("path");
const Product = require("../models/product");
const connectDB = require("../db/connect");

const importProducts = async () => {
  try {
    // 1. Connect to Atlas DB
    await connectDB();

    // 2. Read Excel file (safe path)
    const filePath = path.join(__dirname, "../data/products1.xlsx");
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.SheetNames[0];
    let data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

    // 3. Format every product entry safely
    data = data.map((item) => ({
      name: item.name || "Unnamed Product",
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

    // 4. Insert into Atlas DB
    await Product.insertMany(data);
    console.log("✅ Products imported successfully to Atlas!");

    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Import Error:", err);
    mongoose.disconnect();
  }
};

importProducts();
