const express = require('express');
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// @desc    Get all products from database
// @route   GET /api/products
// @access  Public
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (e) {
        res.status(500).json({ error: 'Failed to load products' });
    }
});

// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
    try {
        const product = new Product({
            id: 'prod-' + Date.now().toString(),
            name: req.body.name || 'Sample Product',
            description: req.body.description || '',
            price: req.body.price || 0,
            originalPrice: req.body.originalPrice || 0,
            image: req.body.image || 'https://via.placeholder.com/400',
            category: req.body.category || 'Gadgets',
            countInStock: req.body.countInStock || 10,
            discount: req.body.discount || 0,
            rating: req.body.rating || 5.0,
            reviews: req.body.reviews || 0,
            storeName: req.body.storeName || 'ScienceTech Official',
            warranty: req.body.warranty || '12 Months Manufacturer Warranty',
            weight: req.body.weight || '0.5kg',
            color: req.body.color || 'Cosmic Black',
            inTheBox: req.body.inTheBox || 'Product, User Manual, Warranty Card',
            images: req.body.images || []
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create product', error: error.message });
    }
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
    try {
        const product = await Product.findOne({ id: req.params.id });

        if (product) {
            product.name = req.body.name || product.name;
            product.description = req.body.description !== undefined ? req.body.description : product.description;
            product.price = req.body.price || product.price;
            product.originalPrice = req.body.originalPrice || product.originalPrice;
            product.image = req.body.image || product.image;
            product.category = req.body.category || product.category;
            product.countInStock = req.body.countInStock !== undefined ? req.body.countInStock : product.countInStock;
            product.discount = req.body.discount !== undefined ? req.body.discount : product.discount;
            product.rating   = req.body.rating   !== undefined ? req.body.rating   : product.rating;
            product.reviews  = req.body.reviews  !== undefined ? req.body.reviews  : product.reviews;
            product.storeName = req.body.storeName !== undefined ? req.body.storeName : product.storeName;
            product.warranty  = req.body.warranty  !== undefined ? req.body.warranty  : product.warranty;
            product.weight    = req.body.weight    !== undefined ? req.body.weight    : product.weight;
            product.color     = req.body.color     !== undefined ? req.body.color     : product.color;
            product.inTheBox  = req.body.inTheBox  !== undefined ? req.body.inTheBox  : product.inTheBox;
            product.images    = req.body.images    !== undefined ? req.body.images    : product.images;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to update product', error: error.message });
    }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const product = await Product.findOne({ id: req.params.id });

        if (product) {
            await Product.deleteOne({ id: req.params.id });
            res.json({ message: 'Product successfully removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete product', error: error.message });
    }
});

module.exports = router;
