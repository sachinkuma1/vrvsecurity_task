// File: src/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { authMiddleware, adminOnly } = require('../middleware/auth');
const adminController = require('../controllers/adminController');
const { getAllOrders } = require('../controllers/orderController');

router.use(authMiddleware);
router.use(adminOnly);

// Product routes
router.post('/products', adminController.createProduct);
router.put('/products/:id', adminController.updateProduct);
router.delete('/products/:id', adminController.deleteProduct);
router.get('/productlist', adminController.getAllProducts);

// Seller routes
router.post('/sellers', adminController.createSeller);

// Order routes
router.get('/getallorders', getAllOrders);

module.exports = router;