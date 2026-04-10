require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Product = require('./models/Product');

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/dropshop')
    .then(async () => {
        console.log("🟢 Connected to MongoDB. Seeding database...");
        
        // Read the products from products.json
        const dataPath = path.join(__dirname, 'data', 'products.json');
        const rawData = fs.readFileSync(dataPath, 'utf8');
        const productsJSON = JSON.parse(rawData);

        try {
            await Product.deleteMany({}); // Clears existing docs
            console.log("🧹 Cleared existing products from Database.");

            await Product.insertMany(productsJSON);
            console.log(`✅ Successfully imported ${productsJSON.length} products into MongoDB!`);
            process.exit();
        } catch (e) {
            console.error("❌ Seeding error:", e);
            process.exit(1);
        }
    })
    .catch(err => {
        console.error("❌ Database connection failed. Make sure your local MongoDB server is running.", err);
        process.exit(1);
    });
