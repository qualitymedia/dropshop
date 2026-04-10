const express = require('express');
const multer  = require('multer');
const path    = require('path');

const router = express.Router();

// ── 1. Hold Files in Memory to encode them ──────────────────────────────────
const storage = multer.memoryStorage();

// ── 2. Filter & Setup ────────────────────────────────────────────────────────
const fileFilter = (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp/;
    const ok = allowed.test(path.extname(file.originalname).toLowerCase()) &&
               allowed.test(file.mimetype);
    ok ? cb(null, true) : cb(new Error('Only image files are allowed.'));
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 4 * 1024 * 1024 } }); // 4 MB limit to protect MongoDB limit

// ── 3. Routes (Convert to Base64 and send back) ──────────────────────────────

// @route   POST /api/upload
// @access  Public
router.post('/', upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'No image provided.' });
    
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;
    
    // Return Base64 String instead of URL!
    res.json({ imageUrl: dataURI });
});

// @route   POST /api/upload/multiple
// @access  Public
router.post('/multiple', upload.array('images', 5), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'No images provided.' });
    }
    
    const imageUrls = req.files.map(file => {
        const b64 = Buffer.from(file.buffer).toString('base64');
        return `data:${file.mimetype};base64,${b64}`;
    });
    
    res.json({ imageUrls });
});

module.exports = router;
