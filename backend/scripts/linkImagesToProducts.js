const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Product = require("../models/product");
const connectDB = require("../db/connect");

const IMAGE_FOLDER = path.join(__dirname, "../uploads");

function normalize(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/gi, '');
}

function getClosestMatch(target, files) {
  const targetNorm = normalize(target);
  let closest = null;
  let highestScore = 0;

  for (const file of files) {
    const fileBase = path.parse(file).name;
    const fileNorm = normalize(fileBase);

    let commonChars = 0;
    for (let i = 0; i < Math.min(targetNorm.length, fileNorm.length); i++) {
      if (targetNorm[i] === fileNorm[i]) {
        commonChars++;
      } else {
        break;
      }
    }

    if (commonChars > highestScore) {
      highestScore = commonChars;
      closest = file;
    }
  }

  return closest;
}

const updateImageUrls = async () => {
  try {
    await connectDB();
    const files = fs.readdirSync(IMAGE_FOLDER).map(f => f.trim());

    const products = await Product.find();

    for (const product of products) {
      const expectedFileName = `${product.name.trim()}.avif`;
      const match = files.find(file => file === expectedFileName);

      if (match) {
        product.imageUrl = `/uploads/${match}`;
        await product.save();
        console.log(` Matched: ${product.name} -> ${match}`);
      } else {
        const closest = getClosestMatch(product.name, files);
        console.log(` No image found for: ${product.name}`);
        if (closest) {
          console.log(`    Closest match: ${closest}`);
        }
      }
    }
  } catch (err) {
    console.error(" Error updating image URLs:", err);
  } finally {
    mongoose.disconnect();
  }
};

updateImageUrls();
