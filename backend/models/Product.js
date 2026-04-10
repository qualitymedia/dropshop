const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, // Keeping string ID for backward compatibility with frontend
    name: { type: String, required: true },
    description: { type: String, default: '' },
    category: { type: String, default: 'Gadgets' },
    price: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    image: { type: String, required: true },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    countInStock: { type: Number, default: 10 },
    storeName: { type: String, default: 'ScienceTech Official' },
    warranty: { type: String, default: '12 Months Manufacturer Warranty' },
    weight: { type: String, default: '0.5kg' },
    color: { type: String, default: 'Cosmic Black' },
    inTheBox: { type: String, default: 'Product, User Manual, Warranty Card' },
    images: { type: [String], default: [] }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
