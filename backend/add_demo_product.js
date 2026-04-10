const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config({ path: require('path').join(__dirname, '.env') });

const addPremiumProduct = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('🟢 Connected to MongoDB');

        const premiumProduct = {
            id: 'prod-premium-watch-' + Date.now(),
            name: "Elite Noir — Premium Designer Leather Watch",
            description: "A masterpiece of horology. Featuring a genuine Italian leather strap, scratch-resistant sapphire crystal, and an ultra-thin stainless steel casing. Precision-engineered for the modern executive. Water resistant up to 50 meters.",
            price: 249.00,
            originalPrice: 350.00,
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
            category: "Fashion",
            countInStock: 5,
            discount: 29,
            rating: 5.0,
            reviews: 12,
            storeName: "Vogue Elite Official",
            warranty: "24 Months International Warranty",
            weight: "0.15kg",
            color: "Midnight Black",
            inTheBox: "Elite Noir Watch, Luxury Leather Case, Warranty Card, Microfiber Cleaning Cloth",
            images: [
                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
                "https://images.unsplash.com/photo-1508685096489-7aac29bca5b4?w=800"
            ]
        };

        const existing = await Product.findOne({ name: premiumProduct.name });
        if (existing) {
            console.log('🟡 Product already exists. Skipping...');
        } else {
            await Product.create(premiumProduct);
            console.log('✅ Premium Product added successfully!');
        }

        mongoose.connection.close();
    } catch (error) {
        console.error('🔴 Error:', error);
    }
};

addPremiumProduct();
