const express = require('express');
const Order = require('../models/Order');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// ─────────────────────────────────────────────
// @desc    Create a new order (guest or logged-in)
// @route   POST /api/orders
// @access  Public (guest checkout supported)
// ─────────────────────────────────────────────
router.post('/', async (req, res) => {
    const { orderItems, shippingAddress, totalPrice, userId } = req.body;

    if (!orderItems || orderItems.length === 0) {
        return res.status(400).json({ message: 'No order items provided.' });
    }

    if (!shippingAddress || !shippingAddress.address || !shippingAddress.city || !shippingAddress.phone) {
        return res.status(400).json({ message: 'Shipping address (address, city, phone) is required.' });
    }

    if (!totalPrice || totalPrice <= 0) {
        return res.status(400).json({ message: 'A valid total price is required.' });
    }

    try {
        const order = new Order({
            user: userId || undefined,   // Optional — supports guest checkout
            orderItems,
            shippingAddress,
            totalPrice,
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create order.', error: error.message });
    }
});

// ─────────────────────────────────────────────
// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
// ─────────────────────────────────────────────
router.get('/', protect, admin, async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ createdAt: -1 }).populate('user', 'name email');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch orders.', error: error.message });
    }
});

// ─────────────────────────────────────────────
// @desc    Get a single order by ID
// @route   GET /api/orders/:id
// @access  Private (owner or admin)
// ─────────────────────────────────────────────
router.get('/:id', protect, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email');

        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }

        // Allow access only to the order owner or an admin
        const isOwner = order.user && order.user._id.toString() === req.user._id.toString();
        if (!isOwner && !req.user.isAdmin) {
            return res.status(403).json({ message: 'Not authorized to view this order.' });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch order.', error: error.message });
    }
});

// ─────────────────────────────────────────────
// @desc    Mark order as paid
// @route   PUT /api/orders/:id/pay
// @access  Private/Admin
// ─────────────────────────────────────────────
router.put('/:id/pay', protect, admin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }

        order.isPaid = true;
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update payment status.', error: error.message });
    }
});

// ─────────────────────────────────────────────
// @desc    Mark order as delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
// ─────────────────────────────────────────────
router.put('/:id/deliver', protect, admin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }

        order.isDelivered = true;
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update delivery status.', error: error.message });
    }
});

module.exports = router;
